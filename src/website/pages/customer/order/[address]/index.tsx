import Basket from "@components/Basket";
import Head from "@components/Head";
import Layout from "@components/Layout";
import LoadingSpinner from "@components/LoadingSpinner";
import { MenuList } from "@components/Restaurant/MenuManagement";
import { useOrder } from "@context/order";
import { userService } from "@hooks/useService";
import { IMenuItem, IMenuItemDetails } from "@local-types/restaurant";
import { ABIS } from "const";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoEllipseOutline } from "react-icons/io5";
import { formatMenuByCategory } from "utils/menu";

const enrichtOrderedItemsWithInfo = (
  menu: IMenuItemDetails[],
  itemIds: number[]
): IMenuItemDetails[] => {
  const enrichtedData = menu.filter((item: IMenuItemDetails) => {
    return item.id && itemIds.includes(item.id);
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
    resetOrder,
    basket,
    setBasket,
    resetBasket,
    calculateBasketPrice,
  } = useOrder();
  const { OrderService, SmartContractService, RestaurantService } =
    userService("evm");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orderIsPlaced, setOrderIsPlaced] = useState(false);

  useEffect(() => {
    if (typeof address === "string") initializeContract(address);
    return () => {
      resetOrder();
    };
  }, []);

  useEffect(() => {
    initializeRestaurant();
  }, [contract]);

  useEffect(() => {
    if (restaurant.contract) {
      getMenuAndOrderedItems();
    }
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
      setIsLoading(false);
    }
  };

  const getPrice = async (): Promise<void> => {
    if (OrderService && contract) {
      const price = await OrderService.calculatePrice(contract);
      if (price) setTotalPrice(price);
    }
  };

  /* Only adding one item a time right now */
  const placeOrder = async (): Promise<void> => {
    if (OrderService && basket.items.length > 0 && contract) {
      const ids = basket.items.map((item) => item.id);
      if (ids.length > 0 && ids !== undefined) {
        await OrderService.placeOrder(ids as number[], contract);
        resetBasket();
        setOrderIsPlaced(true);
      }
    }
  };

  const onRemoveFromBasket = (index: number) => {
    const itemListNew = [...basket.items];
    itemListNew.splice(index, 1);
    const price = calculateBasketPrice(itemListNew);
    setBasket({ price, items: itemListNew });
  };
  const onAddToBasket = (item: IMenuItem) => {
    const updatedItems = [...basket.items, item];
    const price = calculateBasketPrice(updatedItems);
    setBasket({ price, items: updatedItems });
  };

  const payBill = async (): Promise<void> => {
    if (OrderService && contract) {
      await OrderService.payOrder(contract);
    }
  };

  return (
    <Layout isLoading={isLoading}>
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
                  <MenuList
                    type="interactive"
                    onSelect={onAddToBasket}
                    menu={formatMenuByCategory(menu)}
                  />
                  <Basket
                    orderPlaced={orderIsPlaced}
                    basket={basket}
                    handlePlaceOrder={placeOrder}
                    handleRemoveItem={onRemoveFromBasket}
                  />
                </div>
                {orderItems.length > 0 && (
                  <div>
                    <h2>You ordered already...</h2>
                    <MenuList
                      type="fixed"
                      menu={formatMenuByCategory(
                        enrichtOrderedItemsWithInfo(menu, orderItems)
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
