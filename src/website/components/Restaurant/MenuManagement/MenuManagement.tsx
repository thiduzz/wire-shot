import { useEthers } from "@hooks/useEthers";
import { IMenuItem, IRestaurant, ITable } from "@local-types/restaurant";
import TableAbi from "@wireshot/hardhat/artifacts/contracts/Table.sol/Table.json";
import { ethers } from "ethers";
import React, { useCallback, useEffect, useState } from "react";
import { MenuCreate, MenuList } from ".";

export const MenuManagement = ({
  restaurant,
  setMenu,
}: {
  restaurant: IRestaurant;
  setMenu: (menu: IMenuItem[]) => void;
}) => {
  const defaultItemState = {
    name: "",
    price: 0,
  };
  const [menuItem, setMenuItem] = useState<IMenuItem>(defaultItemState);

  useEffect(() => {
    retrieveMenu();
  }, []);

  const retrieveMenu = async () => {
    const numberOfItems = await restaurant.contract!.MENU_ITEM_IDS();
    const menuItemFromContract: IMenuItem[] = [];
    if (numberOfItems.toNumber() > 0) {
      for (let i = 1; i < numberOfItems.toNumber(); i++) {
        const singleItem = await restaurant.contract!.getMenuItem(i);
        if (singleItem) {
          menuItemFromContract.push({
            id: singleItem[0].toNumber(),
            name: singleItem[1],
            price: singleItem[2].toNumber(),
          });
        }
      }
      if (menuItemFromContract.length > 0) {
        setMenu(menuItemFromContract);
      }
    }
  };

  const handleCreateMenu = useCallback(async () => {
    if (restaurant.contract) {
      try {
        await restaurant.contract.addMenuItem(menuItem.name, menuItem.price);
        setMenuItem(defaultItemState);
      } catch (e) {
        console.log(e);
      }
    }
  }, [menuItem]);

  return (
    <div>
      {restaurant.menu.length > 0 ? (
        <div className="flex flex-col">
          <MenuList menu={restaurant.menu} />
        </div>
      ) : (
        <div>Please create a menu</div>
      )}
      <MenuCreate
        menu={menuItem}
        onChange={(value) => setMenuItem(value)}
        onCreation={handleCreateMenu}
      />
    </div>
  );
};
