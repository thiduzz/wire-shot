import { IMenuItem, Table } from "@local-types/restaurant";
import { ABIS } from "const";
import { ethers } from "ethers";
import { SmartContractService } from "./SmartContractService";

export class OrderService extends SmartContractService {
  contract: ethers.Contract;
  restaurant: {
    contract: ethers.Contract | null;
    name: string;
  };
  table: {
    contract: ethers.Contract | null;
    name: string;
  };
  menu: IMenuItem[];
  orderItems: number[];
  tableName: string;

  constructor(address: string) {
    super(ABIS.order);
    this.contract = this.getContract(address);
    this.restaurant = {
      contract: null,
      name: "",
    };
    this.table = {
      contract: null,
      name: "",
    };
    this.menu = [];
    this.orderItems = [];
    this.tableName = "";
  }

  async init(callback: () => void) {
    const restaurantAddress = await this.contract.restaurant();
    const tableAddress = await this.contract.table();
    const restaurantContract = this.getContract(
      restaurantAddress,
      ABIS.restaurant.abi
    );
    this.restaurant = {
      contract: restaurantContract,
      name: await restaurantContract.name(),
    };
    /* Should be done in tableService */
    const tableContract = this.getContract(tableAddress, ABIS.table.abi);
    this.table = {
      contract: tableContract,
      name: await tableContract.name(),
    };
    this.menu = await this.retrieveMenu();
    this.orderItems = await this.getOrderedItems();
    callback.bind(this)();
  }

  placeOrder = async (items: number[]): Promise<boolean> => {
    const response = await this.contract.addMenuItem(items);
    return true;
  };

  calculatePrice = async (): Promise<number> => {
    const price = await this.contract.calculatePrice();
    return price.toNumber();
  };

  payOrder = async (): Promise<number> => {
    const price = this.calculatePrice().toString();
    const response = await this.contract.payOrder({
      gasLimit: ethers.utils.hexlify(100000),
      value: ethers.utils.parseEther("0.0001"),
    });
    console.log("response", response);
    return response;
  };

  getOrderedItems = async (): Promise<number[]> => {
    const items = await this.contract.getOrderItems();
    return items.map((item) => item.toNumber());
  };

  /* DUPLICATE FROM RESTAURANTSERVICE */
  retrieveMenu = async (): Promise<IMenuItem[]> => {
    if (this.restaurant.contract) {
      const numberOfItems = await this.restaurant.contract.MENU_ITEM_IDS();
      const menuItemFromContract: IMenuItem[] = [];
      if (numberOfItems.toNumber() > 0) {
        for (let i = 1; i < numberOfItems.toNumber(); i++) {
          const singleItem = await this.restaurant.contract.getMenuItem(i);
          if (singleItem) {
            menuItemFromContract.push({
              id: singleItem[0].toNumber(),
              name: singleItem[1],
              price: singleItem[2].toNumber(),
            });
          }
        }
        if (menuItemFromContract.length > 0) {
          return menuItemFromContract;
        }
        return [];
      }
    }
    return [];
  };
}
