import { IRestaurant, ITable } from "@local-types/restaurant";
import { ethers } from "ethers";
import TableAbi from "@wireshot/hardhat/artifacts/contracts/Table.sol/Table.json";

export const TableService = {
  retrieveTables: async (
    contract: ethers.Contract,
    provider: ethers.providers.Web3Provider
  ): Promise<ITable[]> => {
    const tableAddresses = await contract.getAllTableAddresses();
    let tables: ITable[] = [];
    if (tableAddresses.length > 0) {
      tables = await getTableDetails(provider, tableAddresses);
      return tables;
    }
    return [];
  },
  createTable: async (
    contract: ethers.Contract,
    name: string
  ): Promise<boolean> => {
    try {
      await contract.addTable(name);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};

const getTableDetails = async (
  provider: ethers.providers.Web3Provider,
  tableAddresses: string[]
): Promise<ITable[]> => {
  const tableCollection: ITable[] = [];
  return Promise.all(
    tableAddresses.map((item: string): Promise<ITable> => {
      return retrieveTableInfo(provider, item);
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
