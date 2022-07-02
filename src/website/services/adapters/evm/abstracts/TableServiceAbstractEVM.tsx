import { Table } from "@local-types/restaurant";
import { ethers } from "ethers";

export abstract class TableServiceAbstractEVM {
  abstract getTables: (contract: ethers.Contract) => Promise<Table[]>;
  abstract checkIn: (address: string) => Promise<boolean>;
  abstract getTableDetails: (address: string) => Promise<Table>;
}
