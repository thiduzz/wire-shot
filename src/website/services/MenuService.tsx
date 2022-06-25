import { IMenuItem } from "@local-types/restaurant";
import { ethers } from "ethers";

export const MenuService = {
  retrieveMenu: async (contract: ethers.Contract): Promise<IMenuItem[]> => {
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
  },
  createMenuItem: async (
    contract: ethers.Contract,
    item: IMenuItem
  ): Promise<boolean> => {
    try {
      await contract.addMenuItem(item.name, item.price);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};
