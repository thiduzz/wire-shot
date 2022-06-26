import { IMenuItem } from "@local-types/restaurant";
import React, { useState } from "react";
import { RestaurantService } from "services";
import { MenuCreate, MenuList } from ".";

export const MenuManagement = ({
  restaurantService,
}: {
  restaurantService: RestaurantService;
}) => {
  const defaultItemState = {
    name: "",
    price: 0,
  };
  const [menuItem, setMenuItem] = useState<IMenuItem>(defaultItemState);

  const { restaurant } = restaurantService;

  const handleCreateMenu = async () => {
    if (restaurantService) {
      await restaurantService.createMenuItem(menuItem);
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
