import Head from "@components/Head";
import Layout from "@components/Layout";
import {
  TableCreate,
  TableList,
  TableManagement,
} from "@components/Restaurant/TableManagement";
import { useEthers } from "@hooks/useEthers";
import { IRestaurant, ITable } from "@local-types/restaurant";
import RestaurantAbi from "@wireshot/hardhat/artifacts/contracts/Restaurant.sol/Restaurant.json";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

const Restaurant: NextPage = () => {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<IRestaurant>();
  const [ethersProvider, setEthersProvider] =
    useState<ethers.providers.Web3Provider>();

  const { getProvider } = useEthers();

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
          getRestaurantInfos(restaurantContract);
        }
      }
    }
  }, []);

  const getRestaurantInfos = async (
    restaurantContract: ethers.Contract
  ): Promise<void> => {
    const provider = getProvider();
    if (restaurantContract && provider) {
      const restaurantName = await restaurantContract.name();
      setRestaurant({
        name: restaurantName,
        tables: [],
        contract: restaurantContract,
      });
    }
  };

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
              <h2>Table Management</h2>
              <TableManagement
                restaurant={restaurant}
                setRestaurantTables={(tables: ITable[]) =>
                  setRestaurant({ ...restaurant, tables })
                }
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Restaurant;
