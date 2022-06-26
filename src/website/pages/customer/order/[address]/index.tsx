import Head from "@components/Head";
import Layout from "@components/Layout";
import { MenuList } from "@components/Restaurant/MenuManagement";
import { IMenuItem } from "@local-types/restaurant";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoEllipseOutline } from "react-icons/io5";
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
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof address === "string") initialiazeOrderService(address);
    else setIsLoading(false);
  }, []);

  useEffect(() => {
    if (orderService) getPrice();
  }, [orderService]);

  const initialiazeOrderService = async (address: string) => {
    const orderService = new OrderService(address);
    orderService.init(() => {
      setOrderService(orderService);
      setIsLoading(false);
    });
  };

  const getPrice = async (): Promise<void> => {
    if (orderService) {
      const price = await orderService.calculatePrice();
      if (price) setTotalPrice(price);
    }
  };

  /* Only adding one item a time right now */
  const onItemSelection = async (item: IMenuItem): Promise<void> => {
    if (orderService && item.id) {
      console.log("item order now", item);
      await orderService.placeOrder([item.id]);
      getPrice();
    }
  };

  const payBill = async (): Promise<void> => {
    if (orderService) {
      const response = await orderService.payOrder();
      console.log("response", response);
    }
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
              <h1>Welcome to {orderService.restaurant.name}</h1>
              <div className="flex flex-col gap-20">
                <div>
                  <h2>You are on table...</h2>
                  <div className="transition-transform bg-white h-48 w-48 shadow-lg border rounded-lg flex flex-col items-center justify-center">
                    <IoEllipseOutline size={50} className="mb-5" />
                    {orderService.table.name}
                  </div>
                </div>
                <div>
                  <h2>Please order..</h2>
                  <MenuList
                    onSelect={onItemSelection}
                    menu={orderService.menu}
                  />
                </div>
                {orderService.orderItems.length > 0 && (
                  <div>
                    <h2>You ordered already...</h2>
                    <MenuList
                      menu={enrichtOrderedItemsWithInfo(
                        orderService.menu,
                        orderService.orderItems
                      )}
                    />
                    <div className="my-8">
                      Your total Price:{" "}
                      <span className="font-bold">{totalPrice} €</span>
                    </div>
                    <button
                      className="bg-purple-400 text-white p-5 rounded-lg"
                      onClick={payBill}
                    >
                      Pay and checkout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Order;
