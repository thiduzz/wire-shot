import { ETableStatus, Table, STATUSMAPPING } from "@local-types/restaurant";
import React from "react";
import { IoEllipseOutline } from "react-icons/io5";
import { TableListProps } from "./Table.types";

const style: {
  [key in ETableStatus]: string;
} = {
  [ETableStatus.Free]: "text-green-400",
  [ETableStatus.Busy]: "text-orange-400",
  [ETableStatus.Closed]: "text-red-400",
};

export const TableList = ({ tables, onClickHandler }: TableListProps) => {
  const onClick = (table: Table) => {
    if (onClickHandler) onClickHandler(table);
  };
  return (
    <>
      <div className="flex flex-row flex-wrap justify-start my-4 gap-4">
        {tables.map((table) => (
          <div
            key={table.name}
            className={`${
              style[table.status]
            } relative cursor-pointer hover:scale-125 transition-transform bg-white h-48 w-48 shadow-lg border rounded-lg flex flex-col items-center justify-center`}
            onClick={() => onClick(table)}
          >
            <div
              className={`${
                style[table.status]
              } absolute top-2 right-3 text-sm`}
            >
              {STATUSMAPPING[table.status]}
            </div>
            <IoEllipseOutline
              size={50}
              className={`${style[table.status]} mb-5`}
            />
            {table.name}
          </div>
        ))}
      </div>
      {tables.length <= 0 && <span>No tables defined...</span>}
    </>
  );
};
