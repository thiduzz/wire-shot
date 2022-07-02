import { useRestaurant } from "@context/restaurant";
import { userService } from "@hooks/useService";
import { IMenuItem } from "@local-types/restaurant";
import React, { useState } from "react";
import { MenuCreate, MenuList } from ".";

export const MenuManagement = () => {
  const defaultItemState = {
    name: "",
    price: 0,
  };
  const [menuItem, setMenuItem] = useState<IMenuItem>(defaultItemState);
  const { restaurant } = useRestaurant();
  const { RestaurantService } = userService("evm");

  const handleCreateMenu = async () => {
    if (restaurant?.contract) {
      await RestaurantService.addMenuItem(menuItem, restaurant.contract);
      setMenuItem(defaultItemState);
    }
  };

  return (
    <div>
      {restaurant && restaurant.menu.length > 0 ? (
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
