import Head from "@components/Head";
import Layout from "@components/Layout";
import { MenuManagement } from "@components/Restaurant/MenuManagement/MenuManagement";
import { TableManagement } from "@components/Restaurant/TableManagement";
import { useEthers } from "@hooks/useEthers";
import { Restaurant } from "@local-types/restaurant";
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

  const retrieveRestaurantDetails = useCallback(async () => {
    if (restaurantService && typeof address === "string") {
      const contract = restaurantService.getContract(address);
      const restaurant = await restaurantService.getDetails(contract);
      setRestaurant(restaurant);
    }
  }, [restaurantService]);

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
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Restaurant;
