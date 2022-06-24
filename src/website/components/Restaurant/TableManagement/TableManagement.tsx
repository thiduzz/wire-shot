import { IRestaurant } from "@local-types/restaurant";
import React, { useState } from "react";
import { TableContractService } from "services";
import { TableCreate, TableList } from ".";

export const TableManagement = ({
  restaurant,
}: {
  restaurant: IRestaurant;
}) => {
  const [tableName, setTableName] = useState<string>("");

  const createTable = () => {
    if (restaurant.contract)
      TableContractService.createTable(restaurant.contract, tableName);
  };

  return (
    <div>
      {restaurant.tables.length > 0 && (
        <div className="flex flex-col">
          <TableList tables={restaurant.tables} />
        </div>
      )}
      <TableCreate
        value={tableName}
        onChange={(value: string) => setTableName(value)}
        onCreation={createTable}
      />
    </div>
  );
};
