import { useEthers } from "@hooks/useEthers";
import { IMenuItem, Restaurant, ITable } from "@local-types/restaurant";
import TableAbi from "@wireshot/hardhat/artifacts/contracts/Table.sol/Table.json";
import { ethers } from "ethers";
import React, { useCallback, useEffect, useState } from "react";
import { MenuService } from "services";
import { MenuCreate, MenuList } from ".";

export const MenuManagement = ({ restaurant }: { restaurant: Restaurant }) => {
  const defaultItemState = {
    name: "",
    price: 0,
  };
  const [menuItem, setMenuItem] = useState<IMenuItem>(defaultItemState);

  const handleCreateMenu = async () => {
    if (restaurant.contract)
      MenuService.createMenuItem(restaurant.contract, menuItem);
  };

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
