import { useRestaurant } from "@context/restaurant";
import { userService } from "@hooks/useService";
import React, { useState } from "react";
import { IoAddSharp, IoRemoveCircle } from "react-icons/io5";
import { TableCreate, TableList } from ".";

export const TableManagement = () => {
  const { restaurant } = useRestaurant();
  const { RestaurantService } = userService("evm");

  const [tableNames, setTableNames] = useState<string[]>([""]);

  const updateItemDetails = (index: number, item: string) => {
    const updatedList = [...tableNames];
    updatedList[index] = item;
    setTableNames(updatedList);
  };

  const handleCreateTables = async () => {
    if (restaurant?.contract) {
      console.log("Using tables now");
      await RestaurantService.addTables(tableNames, restaurant.contract);
      setTableNames([""]);
    }
  };

  const removeLineItem = (index: number) => {
    const itemListNew = [...tableNames];
    itemListNew.splice(index, 1);
    setTableNames(itemListNew);
  };

  const addNewLineItem = () => {
    const itemListNew = [...tableNames];
    itemListNew.push("");
    setTableNames(itemListNew);
  };

  return (
    <div>
      {restaurant && restaurant.tables.length > 0 && (
        <div className="flex flex-col">
          <TableList tables={restaurant.tables} />
        </div>
      )}
      {tableNames.map((item, index) => {
        return (
          <div
            key={index}
            className="relative flex justify-start items-end w-full"
          >
            <TableCreate
              value={item}
              onChange={(value: string) => updateItemDetails(index, value)}
            />
            {index === tableNames.length - 1 && (
              <button
                className="bg-gray-400 text-white p-4 rounded-lg ml-4"
                onClick={addNewLineItem}
              >
                <IoAddSharp size={24} />
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
        onClick={handleCreateTables}
      >
        Add tables
      </button>
    </div>
  );
};
