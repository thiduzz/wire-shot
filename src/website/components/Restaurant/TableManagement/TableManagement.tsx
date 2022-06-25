import { Restaurant } from "@local-types/restaurant";
import React, { useEffect, useState } from "react";
import { RestaurantService, TableService } from "services";
import { TableCreate, TableList } from ".";

export const TableManagement = ({
  restaurantService,
}: {
  restaurantService: RestaurantService;
}) => {
  const [tableName, setTableName] = useState<string>("");

  const createTable = async (name: string) => {
    restaurantService.createTable(name);
    setTableName("");
  };

  return (
    <div>
      {restaurantService.restaurant &&
        restaurantService.restaurant.tables.length > 0 && (
          <div className="flex flex-col">
            <TableList tables={restaurantService.restaurant.tables} />
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
