import { IMenuItem } from "@local-types/restaurant";
import { ethers } from "ethers";
import { OrderServiceAbstractEVM } from "services/adapters/evm/abstracts/OrderServiceAbstractEVM";
import { OrderServiceAbstract } from "services/providers/abstracts";

const placeOrder = async (
  items: number[],
  contract: ethers.Contract
): Promise<boolean> => {
  await contract.addMenuItem(items);
  return true;
};

const calculatePrice = async (contract: ethers.Contract): Promise<number> => {
  const price = await contract.calculatePrice();
  return price.toNumber();
};

const payOrder = async (contract: ethers.Contract): Promise<number> => {
  const price = await calculatePrice(contract);
  const response = await contract.payOrder({
    gasLimit: ethers.utils.hexlify(100000),
    value: ethers.utils.parseEther(price.toString()),
  });
  console.log(response);
  return response;
};

const getOrderedItems = async (
  contract: ethers.Contract
): Promise<number[]> => {
  const items = await contract.getOrderItems();
  return items.map((item) => item.toNumber());
};

/* DUPLICATE FROM RESTAURANTSERVICE */
const getMenu = async (contract: ethers.Contract): Promise<IMenuItem[]> => {
  const numberOfItems = await contract.MENU_ITEM_IDS();
  const menuItemFromContract: IMenuItem[] = [];
  if (numberOfItems.toNumber() > 0) {
    for (let i = 1; i < numberOfItems.toNumber(); i++) {
      const singleItem = await contract.getMenuItem(i);
      if (singleItem) {
        menuItemFromContract.push({
          id: singleItem[0].toNumber(),
          category: singleItem[1],
          name: singleItem[2],
          price: singleItem[3].toNumber(),
        });
      }
    }
    if (menuItemFromContract.length > 0) {
      return menuItemFromContract;
    }
    return [];
  }
  return [];
};

export const OrderService: OrderServiceAbstract<OrderServiceAbstractEVM> = {
  getMenu,
  getOrderedItems,
  payOrder,
  placeOrder,
  calculatePrice,
};
