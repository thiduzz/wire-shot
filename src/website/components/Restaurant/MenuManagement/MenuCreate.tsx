import {
  ETableStatus,
  ITable,
  STATUSMAPPING,
  TMenuKeys,
} from "@local-types/restaurant";
import React from "react";
import { IoEllipseOutline } from "react-icons/io5";
import { IMenuCreateProps } from "./Menu.types";

const style: {
  [key in ETableStatus]: string;
} = {
  [ETableStatus.Free]: "text-green-400",
  [ETableStatus.Busy]: "text-orange-400",
  [ETableStatus.Closed]: "text-red-400",
};

export const MenuCreate = ({
  menu,
  onChange,
  onCreation,
}: IMenuCreateProps) => {
  const onValueChange = (value: string | number, key: TMenuKeys) => {
    const payload = { ...menu, [key]: value };
    onChange(payload);
  };

  return (
    <div className="mt-10 flex flex-row items-center gap-x-3.5">
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
          type="number"
          value={menu.price}
          onChange={(e) => onValueChange(e.target.value, "price")}
          className="w-64 border border-gray-300 rounded-lg focus:active:border-purple-400 px-3 py-3 active:border-purple-400"
        />
      </div>
      <button
        className="bg-purple-400 text-white p-5 rounded-lg mt-auto"
        onClick={onCreation}
      >
        Create Item
      </button>
    </div>
  );
};
