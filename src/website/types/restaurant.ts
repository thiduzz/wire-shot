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

export type TMenuKeys = "id" | "name" | "price"
export interface IMenuItem {
  id?: number;
  name: string;
  price: number;
}

export interface Restaurant {
  name: string;
  tables: Array<ITable>;
  menu: Array<IMenuItem>;
  contract?: ethers.Contract;
}

export const STATUSMAPPING: {
  [key in ETableStatus]: TTableStatusString;
} = {
  "0": "Busy",
  "1": "Free",
  "2": "Closed",
};
