import Head from "@components/Head";
import Layout from "@components/Layout";
import { MenuManagement } from "@components/Restaurant/MenuManagement/MenuManagement";
import { TableManagement } from "@components/Restaurant/TableManagement";
import { useEthers } from "@hooks/useEthers";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RestaurantService } from "services";

const Restaurant: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;

  const [restaurantService, setRestaurantService] =
    useState<RestaurantService>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof address === "string") initializeRestaurant(address);
    else setIsLoading(false);
  }, []);

  const initializeRestaurant = async (address: string) => {
    const restaurant = new RestaurantService(address);
    restaurant.init(() => {
      setRestaurantService(restaurant);
      setIsLoading(false);
    });
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
              <h1>{restaurantService.restaurant.name}</h1>
              <div className="flex flex-col gap-20">
                <div>
                  <h2>Table Management</h2>
                  <TableManagement restaurantService={restaurantService} />
                </div>
                <div>
                  <h2>Menu Management</h2>
                  <MenuManagement restaurantService={restaurantService} />
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
