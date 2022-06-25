import {
  ETableStatus,
  IMenuItem,
  Restaurant,
  Table,
} from "@local-types/restaurant";
import RestaurantAbi from "@wireshot/hardhat/artifacts/contracts/Restaurant.sol/Restaurant.json";
import { ethers } from "ethers";
import { TableService } from "services";

export class RestaurantService {
  provider: ethers.providers.Web3Provider;
  tableService: TableService;
  tables: Table[];
  restaurant: Restaurant | null;

  constructor(provider: ethers.providers.Web3Provider, address: string) {
    this.provider = provider;
    this.tables = [];
    this.restaurant = null;
    this.tableService = new TableService(provider);
  }

  getContract = (address: string): ethers.Contract => {
    return new ethers.Contract(
      address,
      RestaurantAbi.abi,
      this.provider.getSigner()
    );
  };
  setRestaurant = async (
    restaurantContract: ethers.Contract
  ): Promise<void> => {
    const restaurantName = await restaurantContract.name();
    this.restaurant = {
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
    const matchingOrders = [];
    const busyTables = this.tables.filter(
      (table) => table.status === ETableStatus.Busy
    );
    if (busyTables.length > 0) {
      busyTables.map(async (table) => {
        const tableContract = this.tableService.getContract(table.address);
        const address = await tableContract.getOpenOrderAddress(
          customerAddress
        );
        if (address) matchingOrders.push();
      });
    }
    return matchingOrders;
  };

  /* MENU */
  retrieveMenu = async (contract: ethers.Contract): Promise<IMenuItem[]> => {
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
}
