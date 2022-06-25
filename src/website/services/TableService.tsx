import { Restaurant, Table } from "@local-types/restaurant";
import TableAbi from "@wireshot/hardhat/artifacts/contracts/Table.sol/Table.json";
import { ethers } from "ethers";

export class TableService {
  provider: ethers.providers.Web3Provider;

  constructor(provider: ethers.providers.Web3Provider) {
    this.provider = provider;
  }

  getContract = (address: string): ethers.Contract => {
    return new ethers.Contract(
      address,
      TableAbi.abi,
      this.provider.getSigner()
    );
  };

  retrieveTables = async (contract: ethers.Contract): Promise<Table[]> => {
    const tableAddresses = await contract.getAllTableAddresses();
    let tables: Table[] = [];
    if (tableAddresses.length > 0) {
      tables = await this.getTableDetails(tableAddresses);
      return tables;
    }
    return [];
  };

  checkIn = async (address: string): Promise<boolean> => {
    const tableContract = this.getContract(address);
    const response = await tableContract.checkIn();
    return response;
  };

  retrieveTableDetails = async (address: string): Promise<Table> => {
    const tableContract = this.getContract(address);
    const tableDetails = await tableContract.getDetails();
    return {
      id: tableDetails[0].toNumber(),
      name: tableDetails[1],
      address: address,
      status: tableDetails[2],
    };
  };

  private getTableDetails = async (
    tableAddresses: string[]
  ): Promise<Table[]> => {
    const tableCollection: Table[] = [];
    return Promise.all(
      tableAddresses.map((item: string): Promise<Table> => {
        return this.retrieveTableDetails(item);
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
}
