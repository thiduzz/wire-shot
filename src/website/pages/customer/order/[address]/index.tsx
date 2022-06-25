import Head from "@components/Head";
import Layout from "@components/Layout";
import { MenuList } from "@components/Restaurant/MenuManagement";
import { TableList } from "@components/Restaurant/TableManagement";
import { useEthers } from "@hooks/useEthers";
import { Restaurant, Table } from "@local-types/restaurant";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { OrderService, RestaurantService } from "services";

const Order: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const order = true;

  return (
    <Layout>
      <Head
        title="Wireshot - Restaurant"
        description="Your Restaurant Payment solution"
      />
      {order && (
        <div className="page-content justify-center">
          <div className="hero flex flex-col items-center justify-center">
            <div className="flex flex-col gap-8">
              <h1>Welcome to {order}</h1>
              <div className="flex flex-col gap-20">
                <div>
                  <h2>Select a table</h2>
                </div>
                <div>
                  <h2>Menu</h2>
                  {/* <MenuList menu={restaurant.menu} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Order;
