import { ethers } from "ethers";

export enum ETableStatus {
  Busy,
  Free,
  Closed,
}

type TTableStatusString = "Free" | "Busy" | "Closed";

export interface ITable {
  id: number;
  name: string;
  address: string;
  status: ETableStatus;
}

export interface IRestaurant {
  name: string;
  tables: Array<ITable>;
  contract?: ethers.Contract;
}

export const STATUSMAPPING: {
  [key in ETableStatus]: TTableStatusString;
} = {
  "0": "Busy",
  "1": "Free",
  "2": "Closed",
};
