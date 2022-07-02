import { IMenuItem, Restaurant, Table } from "@local-types/restaurant";
import { ethers } from "ethers";

export abstract class RestaurantServiceAbstractEVM {
  abstract getRestaurants: (
    address: string,
    profileAddress: string,
    provider: ethers.providers.Web3Provider
  ) => Promise<{ address: string; name: string }[] | undefined>;
  abstract getRestaurant: (address: string) => Promise<Restaurant>;
  abstract addRestaurant: (
    address: string,
    name: string,
    provider: ethers.providers.Web3Provider
  ) => Promise<boolean>;
  abstract getMenu: (contract: ethers.Contract) => Promise<IMenuItem[]>;
  abstract getCustomerOrders: (
    customerAddress: string,
    tables: Table[]
  ) => Promise<string[]>;
  abstract addMenuItem: (
    item: IMenuItem,
    contract: ethers.Contract
  ) => Promise<boolean>;
  abstract addTable: (name: string, contract: ethers.Contract) => any;
}
