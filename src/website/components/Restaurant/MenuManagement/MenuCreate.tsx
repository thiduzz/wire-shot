import { TMenuKeys } from "@local-types/restaurant";
import React from "react";
import { IMenuCreateProps } from "./Menu.types";

export const MenuCreate = ({ menu, onChange }: IMenuCreateProps) => {
  const onValueChange = (value: string | number, key: TMenuKeys) => {
    const payload = {
      ...menu,
      [key]:
        key === "price" && typeof value === "string"
          ? parseFloat(value)
          : value,
    };
    onChange(payload);
  };

  return (
    <div className="mt-10 flex flex-row gap-x-3.5">
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={menu.name}
          onChange={(e) => onValueChange(e.target.value, "name")}
          className="w-64 border border-gray-300 rounded-lg focus:active:border-purple-400 px-3 py-3 active:border-purple-400"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="price">Price</label>
        <input
          id="price"
          min="0"
          type="number"
          value={menu.price}
          onChange={(e) => onValueChange(e.target.value, "price")}
          className="w-64 border border-gray-300 rounded-lg focus:active:border-purple-400 px-3 py-3 active:border-purple-400"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          value={menu.category}
          onChange={(e) => onValueChange(e.target.value, "category")}
          className="w-64 border border-gray-300 rounded-lg focus:active:border-purple-400 px-3 py-3 active:border-purple-400"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          value={menu.description}
          onChange={(e) => onValueChange(e.target.value, "description")}
          className="w-64 border border-gray-300 rounded-lg focus:active:border-purple-400 px-3 py-3 active:border-purple-400"
        />
      </div>
    </div>
  );
};
