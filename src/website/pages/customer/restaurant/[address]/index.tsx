import Head from "@components/Head";
import Layout from "@components/Layout";
import { MenuList } from "@components/Restaurant/MenuManagement";
import { TableList } from "@components/Restaurant/TableManagement";
import { useEthers } from "@hooks/useEthers";
import { IRestaurant } from "@local-types/restaurant";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { RestaurantService } from "services";

const Restaurant: NextPage = () => {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<IRestaurant>();
  const { getProvider } = useEthers();

  const retrieveRestaurantDetails = useCallback(async () => {
    const { address } = router.query;
    const provider = getProvider();
    if (typeof address === "string" && provider) {
      const contract = RestaurantService.getContract(address, provider);
      const restaurant = await RestaurantService.getDetails(contract, provider);
      setRestaurant(restaurant);
    }
  }, []);

  useEffect(() => {
    retrieveRestaurantDetails();
  }, [retrieveRestaurantDetails]);

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
                  <TableList tables={restaurant.tables} />
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
