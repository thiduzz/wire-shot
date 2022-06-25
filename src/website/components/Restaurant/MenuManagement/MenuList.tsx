import { IMenuItem } from "@local-types/restaurant";
import React from "react";

export const MenuList = ({ menu }: { menu: IMenuItem[] }) => (
  <>
    <div className="flex flex-row flex-wrap justify-start my-4 gap-4">
      {menu.map((item) => (
        <div
          key={item.name}
          className="flex flex-col items-center justify-center shadow-md border-green-50 p-4 rounded-md bg-red-300"
        >
          {item.name} - {item.price} €
        </div>
      ))}
    </div>
    {menu.length <= 0 && <span>No Menu defined...</span>}
  </>
);
