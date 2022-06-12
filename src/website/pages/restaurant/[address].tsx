import type { NextPage } from "next";
import Layout from "@components/Layout";
import React, { useCallback, useEffect, useState } from "react";
import Head from "@components/Head";
import { useEthers } from "@hooks/useEthers";
import { BaseContract, ethers } from "ethers";
import RestaurantAbi from "@wireshot/hardhat/artifacts/contracts/Restaurant.sol/Restaurant.json";
import TableAbi from "@wireshot/hardhat/artifacts/contracts/Table.sol/Table.json";
import { IoEllipseOutline } from "react-icons/io5";
import { useRouter } from "next/router";

enum TableStatus {
  Busy,
  Free,
  Closed,
}

interface ITable {
  name: string;
  address: string;
  status: TableStatus;
}

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
    if (restaurantContract) {
      const restaurantName = await restaurantContract.name();
      const tables = await getTables();
      setRestaurant({ name: restaurantName, tables: [] });
    }
  };

  const getTables = async (): Promise<void> => {
    const provider = getProvider();
    if (provider) {
      const tableAddresses = await restaurantContract!.getAllTableAddresses();
      console.log("tables", tableAddresses);
      if (tableAddresses.length > 0) {
        tableAddresses.map(async (item: string) => {
          const tableContract = new ethers.Contract(
            item,
            TableAbi.abi,
            provider.getSigner()
          );
          const details = await tableContract.getDetails();
          console.log("Detail", details);
        });
      }
    }
  };

  const handleCreateTable = useCallback(async () => {
    if (restaurantContract) {
      try {
        const result = await restaurantContract.addTable(tableName);
        /* Listen to event and onces created refresh page */
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
              <h1>Restaurant: {restaurant.name}</h1>
              {restaurant.tables.length > 0 && (
                <div className="flex flex-row flex-wrap justify-start">
                  {restaurant.tables.map((table) => (
                    <div className="cursor-pointer hover:scale-125 transition-transform bg-white h-48 w-48 shadow-lg border-purple-400 border rounded-lg flex flex-col items-center justify-center">
                      {table.status == TableStatus.Free && (
                        <IoEllipseOutline
                          size={50}
                          className="text-purple-400 mb-5"
                        />
                      )}
                      {table.status == TableStatus.Busy && (
                        <IoEllipseOutline
                          size={50}
                          className="text-red-400 mb-5"
                        />
                      )}
                      {table.status == TableStatus.Closed && (
                        <IoEllipseOutline
                          size={50}
                          className="text-green-400 mb-5"
                        />
                      )}
                      {table.name}
                    </div>
                  ))}
                </div>
              )}
              {restaurant.tables.length <= 0 && (
                <span>No tables defined...</span>
              )}
            </div>
          )}
        </div>
        <div className="mt-10 flex flex-row items-center gap-x-3.5">
          <input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            className="w-64 border border-gray-300 rounded-lg focus:active:border-purple-400 px-3 py-3 active:border-purple-400"
          />
          <button
            className="bg-purple-400 text-white p-5 rounded-lg"
            onClick={handleCreateTable}
          >
            Create Table
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Restaurant;
