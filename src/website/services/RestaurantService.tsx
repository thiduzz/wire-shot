import {
  ETableStatus,
  IMenuItem,
  Restaurant,
  Table,
} from "@local-types/restaurant";
import { ABIS } from "const";
import { ethers } from "ethers";
import { OrderService } from "./OrderService";
import { SmartContractService } from "./SmartContractService";
import { TableService } from "./TableService";

export class RestaurantService extends SmartContractService {
  tableService: TableService;
  restaurant: Restaurant;
  orderService?: OrderService;

  constructor(address: string) {
    super(ABIS.restaurant);
    this.restaurant = {
      menu: [],
      tables: [],
      name: "",
      address,
    };
    this.tableService = new TableService();
  }

  async init(callback: () => void) {
    this.restaurant = await this.getRestaurant(
      this.getContract(this.restaurant.address)
    );
    callback.bind(this)();
  }

  private getRestaurant = async (
    restaurantContract: ethers.Contract
  ): Promise<Restaurant> => {
    const restaurantName = await restaurantContract.name();
    return {
      ...this.restaurant,
      name: restaurantName,
      tables: await this.tableService.retrieveTables(restaurantContract),
      contract: restaurantContract,
      menu: await this.retrieveMenu(restaurantContract),
    };
  };

  /* TABLE */
  createTable = async (name: string): Promise<boolean> => {
    try {
      if (this.restaurant && this.restaurant.contract)
        await this.restaurant.contract.addTable(name);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  /* ORDER */
  getExistingOrders = async (customerAddress: string): Promise<string[]> => {
    if (this.restaurant?.tables) {
      const matchingOrders = [];
      const busyTables = this.restaurant.tables.filter(
        (table) => table.status === ETableStatus.Busy
      );
      if (busyTables.length > 0) {
        return await this.getMatchingOrders(busyTables, customerAddress);
      }
    }
    return [];
  };

  /* MENU */
  retrieveMenu = async (contract: ethers.Contract): Promise<IMenuItem[]> => {
    console.log("Contract", contract);
    const numberOfItems = await contract!.MENU_ITEM_IDS();
    const menuItemFromContract: IMenuItem[] = [];
    if (numberOfItems.toNumber() > 0) {
      for (let i = 1; i < numberOfItems.toNumber(); i++) {
        const singleItem = await contract!.getMenuItem(i);
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
    }
    return [];
  };

  createMenuItem = async (item: IMenuItem): Promise<boolean> => {
    try {
      if (this.restaurant?.contract)
        await this.restaurant.contract.addMenuItem(item.name, item.price);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  getMatchingOrders = async (
    tableAddresses: Table[],
    customerAddress: string
  ): Promise<string[]> => {
    const matchingOrders: string[] = [];
    return Promise.all(
      tableAddresses.map(async (table) => {
        const tableContract = this.tableService.getContract(table.address);
        return tableContract.getOpenOrderAddress(customerAddress);
      })
    )
      .then((data: any) => {
        data.map((item: string) => {
          if (item) matchingOrders.push(item);
        });
        return matchingOrders;
      })
      .catch((err: any) => {
        console.log("Error while getting matching orders for customer", err);
        return matchingOrders;
      });
  };
}
