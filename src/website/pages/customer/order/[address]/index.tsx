import Head from "@components/Head";
import Layout from "@components/Layout";
import { MenuList } from "@components/Restaurant/MenuManagement";
import { IMenuItem } from "@local-types/restaurant";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { OrderService, RestaurantService } from "services";

const enrichtOrderedItemsWithInfo = (
  menu: IMenuItem[],
  itemIds: number[]
): IMenuItem[] => {
  const enrichtedData = itemIds.map((id: number) => {
    return menu.filter((menuItem: IMenuItem) => menuItem.id === id)[0];
  });
  return enrichtedData;
};

const Order: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const order = true;

  const [orderService, setOrderService] = useState<OrderService>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof address === "string") initialiazeOrderService(address);
    else setIsLoading(false);
  }, []);

  const initialiazeOrderService = async (address: string) => {
    const orderService = new OrderService(address);
    orderService.init(() => {
      setOrderService(orderService);
      setIsLoading(false);
    });
  };

  /* Only adding one item a time right now */
  const onItemSelection = (item: IMenuItem) => {
    if (orderService && item.id) orderService.placeOrder([item.id]);
  };

  return (
    <Layout isLoading={isLoading}>
      <Head
        title="Wireshot - Restaurant"
        description="Your Restaurant Payment solution"
      />
      {orderService && orderService.menu.length > 0 && (
        <div className="page-content justify-center">
          <div className="hero flex flex-col items-center justify-center">
            <div className="flex flex-col gap-8">
              <h1>Welcome to {order}</h1>
              <div className="flex flex-col gap-20">
                <div>
                  <h2>You are on table...</h2>
                </div>
                <div>
                  <h2>Please order..</h2>
                  <MenuList
                    onSelect={onItemSelection}
                    menu={orderService.menu}
                  />
                </div>
                <div>
                  <h2>You ordered already...</h2>
                  <MenuList
                    onSelect={onItemSelection}
                    menu={enrichtOrderedItemsWithInfo(
                      orderService.menu,
                      orderService.orderItems
                    )}
                  />
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
