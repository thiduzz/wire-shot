import { IMenuItem } from "@local-types/restaurant";
import OrderAbi from "@wireshot/hardhat/artifacts/contracts/Table.sol/Table.json";
import { ABIS } from "const";
import { ethers } from "ethers";
import { SmartContractService } from "./SmartContractService";

export class OrderService extends SmartContractService {
  contract: ethers.Contract;
  restaurantContract: ethers.Contract | null;
  menu: IMenuItem[];
  orderItems: number[];

  constructor(address: string) {
    super(ABIS.order);
    this.contract = this.getContract(address);
    this.restaurantContract = null;
    this.menu = [];
    this.orderItems = [];
  }

  async init(callback: () => void) {
    const restaurantAddress = await this.contract.restaurant();
    this.restaurantContract = this.getContract(
      restaurantAddress,
      ABIS.restaurant.abi
    );
    this.menu = await this.retrieveMenu();
    this.orderItems = await this.getOrderedItems();
    callback.bind(this)();
  }

  placeOrder = async (items: number[]): Promise<boolean> => {
    const response = await this.contract.addMenuItem(items);
    return true;
  };

  /* TODO get table name info and display */
  retrieveTableInfo = async (): Promise<void> => {};

  getOrderedItems = async (): Promise<number[]> => {
    const items = await this.contract.getOrderItems();
    return items.map((item) => item.toNumber());
  };

  /* DUPLICATE FROM RESTAURANTSERVICE */
  retrieveMenu = async (): Promise<IMenuItem[]> => {
    if (this.restaurantContract) {
      const numberOfItems = await this.restaurantContract.MENU_ITEM_IDS();
      const menuItemFromContract: IMenuItem[] = [];
      if (numberOfItems.toNumber() > 0) {
        for (let i = 1; i < numberOfItems.toNumber(); i++) {
          const singleItem = await this.restaurantContract.getMenuItem(i);
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
