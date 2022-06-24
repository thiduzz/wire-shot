import { ETableStatus, ITable, STATUSMAPPING } from "@local-types/restaurant";
import React from "react";
import { IoEllipseOutline } from "react-icons/io5";
import { ITableCreateProps } from "./Table.types";

const style: {
  [key in ETableStatus]: string;
} = {
  [ETableStatus.Free]: "text-green-400",
  [ETableStatus.Busy]: "text-orange-400",
  [ETableStatus.Closed]: "text-red-400",
};

export const TableCreate = ({
  value,
  onChange,
  onCreation,
}: ITableCreateProps) => (
  <div className="mt-10 flex flex-row items-center gap-x-3.5">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-64 border border-gray-300 rounded-lg focus:active:border-purple-400 px-3 py-3 active:border-purple-400"
    />
    <button
      className="bg-purple-400 text-white p-5 rounded-lg"
      onClick={onCreation}
    >
      Create Table
    </button>
  </div>
);
