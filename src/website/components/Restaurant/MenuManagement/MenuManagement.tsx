import { useRestaurant } from "@context/restaurant";
import { userService } from "@hooks/useService";
import { IMenuItem } from "@local-types/restaurant";
import React, { useState } from "react";
import { MenuCreate, MenuList } from ".";
import { IoAddSharp, IoRemoveCircle } from "react-icons/io5";

export const MenuManagement = () => {
  const defaultItemState = [{ name: "", price: 0, category: "" }];
  const [menuItems, setMenuItems] = useState<IMenuItem[]>(defaultItemState);
  const { restaurant } = useRestaurant();
  const { RestaurantService } = userService("evm");

  const updateItemDetails = (index: number, item: IMenuItem) => {
    const updatedList = [...menuItems];
    updatedList[index] = { ...item, price: item.price < 0 ? 0 : item.price };
    setMenuItems(updatedList);
  };
  const handleCreateMenu = async () => {
    if (restaurant?.contract) {
      await RestaurantService.addMenuItems(menuItems, restaurant.contract);
    }
    setMenuItems(defaultItemState);
  };

  const removeLineItem = (index: number) => {
    const itemListNew = [...menuItems];
    itemListNew.splice(index, 1);
    setMenuItems(itemListNew);
  };

  const addNewLineItem = () => {
    const itemListNew = [...menuItems];
    itemListNew.push({ name: "", price: 0, category: "" });
    setMenuItems(itemListNew);
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
      {menuItems.map((item, index) => {
        return (
          <div
            key={index}
            className="relative flex justify-start items-end w-full"
          >
            <MenuCreate
              menu={item}
              onChange={(value: IMenuItem) => updateItemDetails(index, value)}
            />
            {index === menuItems.length - 1 && (
              <button
                className="bg-gray-400 text-white p-4 rounded-lg ml-4"
                onClick={addNewLineItem}
              >
                <IoAddSharp size={20} />
              </button>
            )}
            {index > 0 && (
              <button
                className="text-red-400 rounded-lg ml-2"
                onClick={() => removeLineItem(index)}
              >
                <IoRemoveCircle size={52} />
              </button>
            )}
          </div>
        );
      })}
      <button
        className="bg-purple-400 text-white p-5 rounded-lg mt-6"
        onClick={handleCreateMenu}
      >
        Add all items to menu
      </button>
    </div>
  );
};
