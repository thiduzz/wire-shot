import React from "react";
import { TableCreateProps } from "./Table.types";

export const TableCreate = ({ value, onChange }: TableCreateProps) => (
  <div className="mt-10 flex gap-3.5 flex-col">
    <label htmlFor="name">Name</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-64 border border-gray-300 rounded-lg focus:active:border-purple-400 px-3 py-3 active:border-purple-400"
    />
  </div>
);
