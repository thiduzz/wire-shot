import Head from "@components/Head";
import Layout from "@components/Layout";
import { MenuList } from "@components/Restaurant/MenuManagement";
import { useOrder } from "@context/order";
import { userService } from "@hooks/useService";
import { IMenuItem } from "@local-types/restaurant";
import { ABIS } from "const";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { IoEllipseOutline } from "react-icons/io5";

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
  const {
    contract,
    setContract,
    restaurant,
    getRestaurantAndTableData,
    setMenu,
    menu,
    orderItems,
    table,
    setOrderItems,
    setTotalPrice,
    totalPrice,
  } = useOrder();
  const { OrderService, SmartContractService, RestaurantService } =
    userService("evm");

  useEffect(() => {
    if (typeof address === "string") initializeContract(address);
  }, []);

  useEffect(() => {
    initializeRestaurant();
  }, [contract]);

  useEffect(() => {
    if (restaurant.contract) getMenuAndOrderedItems();
  }, [restaurant.contract]);

  const initializeContract = async (contractAddress: string) => {
    setContract(
      SmartContractService.getContract(contractAddress, ABIS.order.abi)
    );
  };

  const initializeRestaurant = async () => {
    if (contract) {
      getRestaurantAndTableData(SmartContractService);
    }
  };

  const getMenuAndOrderedItems = async () => {
    if (restaurant.contract && contract) {
      setMenu(await RestaurantService.getMenu(restaurant.contract));
      setOrderItems(await OrderService.getOrderedItems(contract));
      getPrice();
    }
  };

  const getPrice = async (): Promise<void> => {
    if (OrderService && contract) {
      const price = await OrderService.calculatePrice(contract);
      if (price) setTotalPrice(price);
    }
  };

  /* Only adding one item a time right now */
  const onItemSelection = async (item: IMenuItem): Promise<void> => {
    if (OrderService && item.id && contract) {
      await OrderService.placeOrder([item.id], contract);
      getPrice();
    }
  };

  const payBill = async (): Promise<void> => {
    if (OrderService && contract) {
      await OrderService.payOrder(contract);
    }
  };

  return (
    <Layout isLoading={false}>
      <Head
        title="Wireshot - Restaurant"
        description="Your Restaurant Payment solution"
      />
      {menu.length > 0 && (
        <div className="page-content justify-center">
          <div className="hero flex flex-col items-center justify-center">
            <div className="flex flex-col gap-8">
              <h1>Welcome to {restaurant.name}</h1>
              <div className="flex flex-col gap-20">
                <div>
                  <h2>You are on table...</h2>
                  <div className="transition-transform bg-white h-48 w-48 shadow-lg border rounded-lg flex flex-col items-center justify-center">
                    <IoEllipseOutline size={50} className="mb-5" />
                    {table.name}
                  </div>
                </div>
                <div>
                  <h2>Please order..</h2>
                  <MenuList onSelect={onItemSelection} menu={menu} />
                </div>
                {orderItems.length > 0 && (
                  <div>
                    <h2>You ordered already...</h2>
                    <MenuList
                      menu={enrichtOrderedItemsWithInfo(menu, orderItems)}
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
