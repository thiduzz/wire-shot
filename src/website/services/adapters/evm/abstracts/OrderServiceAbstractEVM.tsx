import { IMenuItem } from "@local-types/restaurant";
import { ethers } from "ethers";

export abstract class OrderServiceAbstractEVM {
  abstract placeOrder: (
    items: number[],
    contract: ethers.Contract
  ) => Promise<boolean>;
  abstract calculatePrice: (
    restaurantContract: ethers.Contract
  ) => Promise<number>;
  abstract payOrder: (contract: ethers.Contract) => Promise<number>;
  abstract getOrderedItems: (contract: ethers.Contract) => Promise<number[]>;
  abstract getMenu: (ontract: ethers.Contract) => Promise<IMenuItem[]>;
}
