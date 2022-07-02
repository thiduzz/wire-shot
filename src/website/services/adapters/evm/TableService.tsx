import { Table } from "@local-types/restaurant";
import { ABIS } from "const";
import { ethers } from "ethers";
import { TableServiceAbstract } from "services/providers/abstracts";
import { SmartContractService } from "../../SmartContractService";
import { TableServiceAbstractEVM } from "./abstracts/TableServiceAbstractEVM";

const getTables = async (contract: ethers.Contract): Promise<Table[]> => {
  const tableAddresses = await contract.getAllTableAddresses();
  let tables: Table[] = [];
  if (tableAddresses.length > 0) {
    tables = await getDetailsForMultipleTables(tableAddresses);
    return tables;
  }
  return [];
};

const checkIn = async (address: string): Promise<boolean> => {
  const tableContract = SmartContractService.getContract(
    address,
    ABIS.table.abi
  );
  const response = await tableContract.checkIn();
  return response;
};

const getTableDetails = async (address: string): Promise<Table> => {
  const tableContract = SmartContractService.getContract(
    address,
    ABIS.table.abi
  );
  const tableDetails = await tableContract.getDetails();
  return {
    id: tableDetails[0].toNumber(),
    name: tableDetails[1],
    address: address,
    status: tableDetails[2],
  };
};

const getDetailsForMultipleTables = async (
  tableAddresses: string[]
): Promise<Table[]> => {
  const tableCollection: Table[] = [];
  return Promise.all(
    tableAddresses.map((item: string): Promise<Table> => {
      return getTableDetails(item);
    })
  )
    .then((data: any) => {
      data.map((item: Table) => {
        tableCollection.push(item);
      });
      return tableCollection;
    })
    .catch((err: any) => {
      console.log("Error while getting table details", err);
      return tableCollection;
    });
};

export const TableService: TableServiceAbstract<TableServiceAbstractEVM> = {
  getTables,
  getTableDetails,
  checkIn,
};
