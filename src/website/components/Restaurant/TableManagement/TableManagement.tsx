import { useEthers } from "@hooks/useEthers";
import { IRestaurant, ITable } from "@local-types/restaurant";
import TableAbi from "@wireshot/hardhat/artifacts/contracts/Table.sol/Table.json";
import { ethers } from "ethers";
import React, { useCallback, useEffect, useState } from "react";
import { TableCreate, TableList } from ".";

export const TableManagement = ({
  restaurant,
  setRestaurantTables,
}: {
  restaurant: IRestaurant;
  setRestaurantTables: (tables: ITable[]) => void;
}) => {
  const { getProvider } = useEthers();
  const [tableName, setTableName] = useState<string>("");

  const retrieveTables = async (provider) => {
    const tableAddresses = await restaurant.contract!.getAllTableAddresses();
    let tables: ITable[] = [];
    if (tableAddresses.length > 0) {
      tables = await getTableDetails(provider, tableAddresses);
      setRestaurantTables(tables);
    }
  };

  const getTableDetails = async (
    provider: ethers.providers.Web3Provider,
    tableAddresses: string[]
  ): Promise<ITable[]> => {
    const tableCollection: ITable[] = [];
    return Promise.all(
      tableAddresses.map((item: string): Promise<ITable> => {
        return retrieveTableInfo(provider, item, restaurant.contract!);
      })
    )
      .then((data: any) => {
        data.map((item: ITable) => {
          tableCollection.push(item);
        });
        return tableCollection;
      })
      .catch((err: any) => {
        console.log("Error while getting table details", err);
        return tableCollection;
      });
  };

  const retrieveTableInfo = async (
    provider: ethers.providers.Web3Provider,
    address: string
  ): Promise<ITable> => {
    const tableContract = new ethers.Contract(
      address,
      TableAbi.abi,
      provider.getSigner()
    );
    const tableDetails = await tableContract.getDetails();
    return {
      id: tableDetails[0].toNumber(),
      name: tableDetails[1],
      address: address,
      status: tableDetails[2],
    };
  };

  const handleCreateTable = useCallback(async () => {
    if (restaurant.contract) {
      try {
        restaurant.contract.addTable(tableName);
      } catch (e) {
        console.log(e);
      }
    }
  }, [tableName]);

  useEffect(() => {
    const provider = getProvider();
    if (provider) retrieveTables(provider);
  }, []);
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
        onCreation={handleCreateTable}
      />
    </div>
  );
};
