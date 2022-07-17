import Head from "@components/Head";
import Layout from "@components/Layout";
import { MenuList } from "@components/Restaurant/MenuManagement";
import { TableList } from "@components/Restaurant/TableManagement";
import { useProfile } from "@context/profile";
import { useRestaurant } from "@context/restaurant";
import { userService } from "@hooks/useService";
import { Table } from "@local-types/restaurant";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { formatMenuByCategory } from "utils/menu";

const Restaurant: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { restaurant, setRestaurant, resetRestaurant } = useRestaurant();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { RestaurantService, TableService } = userService("evm");
  const { profile } = useProfile();

  useEffect(() => {
    if (typeof address === "string") initializeRestaurant(address);
    else {
      console.log("else triggered");
      setIsLoading(false);
    }
    return () => {
      resetRestaurant();
    };
  }, []);

  useEffect(() => {
    if (restaurant?.name) checkIfUserRunningOrder();
  }, [restaurant]);

  const initializeRestaurant = async (address: string) => {
    setRestaurant(await RestaurantService.getRestaurant(address));
  };

  const checkIfUserRunningOrder = async () => {
    if (restaurant?.tables && profile && RestaurantService) {
      const openOrders = await RestaurantService.getCustomerOrders(
        profile.address,
        restaurant.tables
      );
      if (openOrders.length > 0) {
        router.push("/customer/order/" + openOrders[0]);
      } else setIsLoading(false);
    }
  };

  const checkInTable = async (table: Table) => {
    if (TableService) {
      TableService.checkIn(table.address);
    }
  };

  return (
    <Layout isLoading={isLoading}>
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
                  <MenuList menu={formatMenuByCategory(restaurant.menu)} />
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
