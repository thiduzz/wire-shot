import Head from "@components/Head";
import Layout from "@components/Layout";
import { MenuList } from "@components/Restaurant/MenuManagement";
import { TableList } from "@components/Restaurant/TableManagement";
import { useProfile } from "@context/profile";
import { useEthers } from "@hooks/useEthers";
import { Table } from "@local-types/restaurant";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RestaurantService, TableService } from "services";

const Restaurant: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { profile } = useProfile();
  const { getProvider } = useEthers();

  const [restaurantService, setRestaurantService] =
    useState<RestaurantService>();
  const [tableService, setTableService] = useState<TableService>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const provider = getProvider();
    if (provider && typeof address === "string") {
      initializeRestaurant(provider, address);
    }
  }, []);

  useEffect(() => {
    if (restaurantService) checkIfUserRunningOrder();
  }, [restaurantService]);

  const initializeRestaurant = async (
    provider: ethers.providers.Web3Provider,
    address: string
  ) => {
    const restaurant = new RestaurantService(provider, address);
    restaurant.init(() => {
      setRestaurantService(restaurant);
      setTableService(restaurant.tableService);
    });
  };

  const checkIfUserRunningOrder = async () => {
    if (profile && restaurantService) {
      const openOrders = await restaurantService.getExistingOrders(
        profile.address
      );
      if (openOrders.length > 0)
        router.push("/customer/order/" + openOrders[0]);
      else setIsLoading(false);
    }
  };

  const checkInTable = async (table: Table) => {
    if (tableService) {
      const status = await tableService.checkIn(table.address);
    }
  };

  return (
    <Layout isLoading={isLoading}>
      <Head
        title="Wireshot - Restaurant"
        description="Your Restaurant Payment solution"
      />
      {restaurantService?.restaurant && (
        <div className="page-content justify-center">
          <div className="hero flex flex-col items-center justify-center">
            <div className="flex flex-col gap-8">
              <h1>Welcome to {restaurantService.restaurant.name}</h1>
              <div className="flex flex-col gap-20">
                <div>
                  <h2>Select a table</h2>
                  <TableList
                    tables={restaurantService.restaurant.tables}
                    onClickHandler={checkInTable}
                  />
                </div>
                <div>
                  <h2>Menu</h2>
                  <MenuList menu={restaurantService.restaurant.menu} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Restaurant;
