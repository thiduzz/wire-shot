import { useRestaurant } from "@context/restaurant";
import { userService } from "@hooks/useService";
import React, { useState } from "react";
import { TableCreate, TableList } from ".";

export const TableManagement = () => {
  const { restaurant, setRestaurant } = useRestaurant();
  const { RestaurantService } = userService("evm");

  const [tableName, setTableName] = useState<string>("");

  const createTable = async (name: string) => {
    if (restaurant?.contract) {
      await RestaurantService.addTable(name, restaurant.contract);
      setTableName("");
    }
  };

  return (
    <div>
      {restaurant && restaurant.tables.length > 0 && (
        <div className="flex flex-col">
          <TableList tables={restaurant.tables} />
        </div>
      )}
      <TableCreate
        value={tableName}
        onChange={(value: string) => setTableName(value)}
        onCreation={() => createTable(tableName)}
      />
    </div>
  );
};
