import {
  ETableStatus,
  IMenuItem,
  Restaurant,
  Table,
} from "@local-types/restaurant";
import { ABIS } from "const";
import { ethers } from "ethers";
import { RestaurantServiceAbstract } from "services/providers/abstracts";
import { SmartContractService } from "../../SmartContractService";
import { RestaurantServiceAbstractEVM } from "./abstracts";
import { TableService } from "./TableService";

export const getRestaurants = async (
  address: string,
  profileAddress: string,
  provider: ethers.providers.Web3Provider
): Promise<{ address: string; name: string }[] | undefined> => {
  const spawnerContract = new ethers.Contract(
    address,
    ABIS.spawner.abi,
    provider.getSigner()
  );

  const result = await spawnerContract.getRestaurants(profileAddress);
  if (result) {
    const restaurantArray: Array<any> = [];
    for (const index in result) {
      const restaurantContract = new ethers.Contract(
        result[index],
        ABIS.restaurant.abi,
        provider.getSigner()
      );
      const restaurantName = await restaurantContract.name();
      restaurantArray.push({ address: result[index], name: restaurantName });
    }
    return restaurantArray;
  }
};

export const getRestaurant = async (address: string): Promise<Restaurant> => {
  const restaurantContract = SmartContractService.getContract(
    address,
    ABIS.restaurant.abi
  );
  const restaurantName = await restaurantContract.name();
  return {
    address: address,
    name: restaurantName,
    tables: await TableService.getTables(restaurantContract),
    contract: restaurantContract,
    menu: await getMenu(restaurantContract),
  };
};

const addRestaurant = async (
  address: string,
  name: string,
  provider: ethers.providers.Web3Provider
): Promise<boolean> => {
  try {
    const spawnerContract = new ethers.Contract(
      address,
      ABIS.spawner.abi,
      provider.getSigner()
    );
    await spawnerContract.addRestaurant(name);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

/* TABLE */
const addTables = async (
  names: string[],
  contract: ethers.Contract
): Promise<boolean> => {
  console.log("Looping with names", names);
  return Promise.all(
    names.map(async (name) => {
      return contract.addTable(name);
    })
  )
    .then((data: any) => {
      console.log("All tables created", data);
      return data;
    })
    .catch((err: any) => {
      console.log("Error while getting matching orders for customer", err);
      throw Error();
    });
};

/* ORDER */
const getCustomerOrders = async (
  customerAddress: string,
  tables: Table[]
): Promise<string[]> => {
  const busyTables = tables.filter(
    (table) => table.status === ETableStatus.Busy
  );
  if (busyTables.length > 0) {
    return await getMatchingOrders(busyTables, customerAddress);
  }
  return [];
};

/* MENU */
const getMenu = async (contract: ethers.Contract): Promise<IMenuItem[]> => {
  const numberOfItems = await contract!.MENU_ITEM_IDS();
  const menuItemFromContract: IMenuItem[] = [];
  if (numberOfItems.toNumber() > 0) {
    for (let i = 1; i < numberOfItems.toNumber(); i++) {
      const singleItem = await contract!.getMenuItem(i);
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
  }
  return [];
};

const addMenuItems = async (
  items: IMenuItem[],
  contract: ethers.Contract
): Promise<boolean> => {
  return Promise.all(
    items.map(async (item) => {
      return contract.addMenuItem(item.name, item.category, item.price);
    })
  )
    .then((data: any) => {
      return data;
    })
    .catch((err: any) => {
      console.log("Error while getting matching orders for customer", err);
      throw Error();
    });
};

const getMatchingOrders = async (
  tableAddresses: Table[],
  customerAddress: string
): Promise<string[]> => {
  const matchingOrders: string[] = [];
  return Promise.all(
    tableAddresses.map(async (table) => {
      const tableContract = SmartContractService.getContract(
        table.address,
        ABIS.table.abi
      );
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

export const RestaurantService: RestaurantServiceAbstract<RestaurantServiceAbstractEVM> =
  {
    getRestaurants,
    getRestaurant,
    addRestaurant,
    getMenu,
    getCustomerOrders,
    addMenuItems,
    addTables,
  };
