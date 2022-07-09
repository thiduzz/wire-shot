import { IMenuItem } from "@local-types/restaurant";
import React from "react";
import { IMenuListProps } from "./Menu.types";

export const MenuList = ({ menu, onSelect }: IMenuListProps) => {
  const onItemSelection = (item: IMenuItem) => {
    if (onSelect) {
      onSelect(item);
    }
  };
  return (
    <>
      <div className="flex flex-row flex-wrap justify-start my-4 gap-4">
        {menu.map((item, index) => (
          <div
            onClick={() => onItemSelection(item)}
            key={`${item.name}-${index}`}
            className={`flex flex-col shadow-md border-green-50 p-4 rounded-md bg-red-300 ${
              onSelect ? "cursor-pointer hover:font-bold" : ""
            }`}
          >
            <h3>
              {item.name} (id - {item.id})
            </h3>
            {item.price} €
          </div>
        ))}
      </div>
      {menu.length <= 0 && <span>No Menu defined...</span>}
    </>
  );
};
