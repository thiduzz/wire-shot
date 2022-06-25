import Head from "@components/Head";
import Layout from "@components/Layout";
import { MenuList } from "@components/Restaurant/MenuManagement";
import { TableList } from "@components/Restaurant/TableManagement";
import { useProfile } from "@context/profile";
import { useEthers } from "@hooks/useEthers";
import { Restaurant, Table } from "@local-types/restaurant";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { RestaurantService, TableService } from "services";

const Restaurant: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [restaurantService, setRestaurantService] =
    useState<RestaurantService>();
  const [tableService, setTableService] = useState<TableService>();
  const { getProvider } = useEthers();
  const { profile } = useProfile();

  useEffect(() => {
    const provider = getProvider();
    if (provider) {
      const restaurant = new RestaurantService(provider);
      setRestaurantService(restaurant);
      setTableService(restaurant.tableService);
    }
  }, []);

  useEffect(() => {
    if (restaurantService) retrieveRestaurantDetails();
  }, [restaurantService]);

  useEffect(() => {
    if (restaurantService) checkIfUserRunningOrder();
  }, [tableService]);

  const checkIfUserRunningOrder = async () => {
    if (profile && restaurantService) {
      const openOrders = await restaurantService.getExistingOrders(
        profile.address
      );
      console.log("Here are open orders", openOrders);
    }
  };
  const retrieveRestaurantDetails = useCallback(async () => {
    if (restaurantService && typeof address === "string") {
      const contract = restaurantService.getContract(address);
      const restaurant = await restaurantService.getDetails(contract);
      setRestaurant(restaurant);
    }
  }, [restaurantService]);

  const checkInTable = async (table: Table) => {
    if (tableService) {
      const status = await tableService.checkIn(table.address);
      console.log("Check in into table", status);
    }
  };

  return (
    <Layout>
      <Head
        title="Wireshot - Restaurant"
        description="Your Restaurant Payment solution"
      />
      {restaurant && (
        <div className="page-content justify-center">
          <div className="hero flex flex-col items-center justify-center">
            <div className="flex flex-col gap-8">
              <h1>Welcome to {restaurant.name}</h1>
              <div className="flex flex-col gap-20">
                <div>
                  <h2>Select a table</h2>
                  <TableList
                    tables={restaurant.tables}
                    onClickHandler={checkInTable}
                  />
                </div>
                <div>
                  <h2>Menu</h2>
                  <MenuList menu={restaurant.menu} />
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