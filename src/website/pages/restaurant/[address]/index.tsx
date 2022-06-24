import Head from "@components/Head";
import Layout from "@components/Layout";
import { MenuManagement } from "@components/Restaurant/MenuManagement/MenuManagement";
import { TableManagement } from "@components/Restaurant/TableManagement";
import { useEthers } from "@hooks/useEthers";
import { IRestaurant } from "@local-types/restaurant";
import RestaurantAbi from "@wireshot/hardhat/artifacts/contracts/Restaurant.sol/Restaurant.json";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { MenuService, TableService } from "services";

const Restaurant: NextPage = () => {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<IRestaurant>();
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
        tables: await TableService.retrieveTables(restaurantContract, provider),
        contract: restaurantContract,
        menu: await MenuService.retrieveMenu(restaurantContract),
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
            <div className="flex flex-col gap-8">
              <h1>{restaurant.name}</h1>
              <div className="flex flex-col gap-20">
                <div>
                  <h2>Table Management</h2>
                  <TableManagement restaurant={restaurant} />
                </div>
                <div>
                  <h2>Menu Management</h2>
                  <MenuManagement restaurant={restaurant} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Restaurant;
