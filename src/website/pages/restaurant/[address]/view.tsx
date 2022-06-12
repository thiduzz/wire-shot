import Head from "@components/Head";
import Layout from "@components/Layout";
import { TableCreate, TableList } from "@components/Restaurant";
import { useEthers } from "@hooks/useEthers";
import { ITable } from "@local-types/table";
import RestaurantAbi from "@wireshot/hardhat/artifacts/contracts/Restaurant.sol/Restaurant.json";
import TableAbi from "@wireshot/hardhat/artifacts/contracts/Table.sol/Table.json";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

interface IRestaurant {
  name: string;
  tables: Array<ITable>;
}

const Restaurant: NextPage = () => {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [tableName, setTableName] = useState<string>("");
  const [restaurantContract, setRestaurantContract] =
    useState<ethers.Contract>();

  const { getProvider } = useEthers();

  useEffect(() => {
    if (restaurantContract) {
      getRestaurantInfos();
    }
  }, [restaurantContract]);

  const loadAndSetContract = useCallback(async () => {
    const provider = getProvider();
    if (provider) {
      const { address } = router.query;
      if (address) {
        if (typeof address === "string") {
          const restaurantContract = new ethers.Contract(
            address,
            RestaurantAbi.abi,
            provider.getSigner()
          );
          setRestaurantContract(restaurantContract);
        }
      }
    }
  }, []);

  const getRestaurantInfos = async (): Promise<void> => {
    const provider = getProvider();
    if (restaurantContract && provider) {
      const restaurantName = await restaurantContract.name();
      const tableAddresses = await restaurantContract!.getAllTableAddresses();
      let tables: ITable[] = [];
      if (tableAddresses.length > 0) {
        tables = await getTableDetails(provider, tableAddresses);
      }
      setRestaurant({ name: restaurantName, tables });
    }
  };

  const getTableDetails = async (
    provider: ethers.providers.Web3Provider,
    tableAddresses: string[]
  ): Promise<ITable[]> => {
    const tableCollection: ITable[] = [];
    return Promise.all(
      tableAddresses.map((item: string): Promise<ITable> => {
        return retrieveTableInfo(provider, item);
      })
    )
      .then((data: any) => {
        data.map((item: ITable) => {
          tableCollection.push(item);
        });
        return tableCollection;
      })
      .catch((err: any) => {
        console.log("Error while getting table details", err);
        return tableCollection;
      });
  };

  const retrieveTableInfo = async (
    provider: ethers.providers.Web3Provider,
    address: string
  ): Promise<ITable> => {
    const tableContract = new ethers.Contract(
      address,
      TableAbi.abi,
      provider.getSigner()
    );
    const tableDetails = await tableContract.getDetails();
    return {
      id: tableDetails[0].toNumber(),
      name: tableDetails[1],
      address: address,
      status: tableDetails[2],
    };
  };

  const handleCreateTable = useCallback(async () => {
    if (restaurantContract) {
      try {
        restaurantContract.addTable(tableName);
      } catch (e) {
        console.log(e);
      }
    }
  }, [tableName]);

  useEffect(() => {
    loadAndSetContract();
  }, [loadAndSetContract]);

  return (
    <Layout>
      <Head
        title="Wireshot - Restaurant"
        description="Your Restaurant Payment solution"
      />
      <div className="page-content justify-center">
        <div className="hero flex flex-col items-center justify-center">
          {!restaurant && <span>Loading...</span>}
          {restaurant && (
            <div>
              <div>
                <h1>Restaurant Detail: {restaurant.name}</h1>
                {restaurant.tables.length > 0 && (
                  <TableList tables={restaurant.tables} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Restaurant;
