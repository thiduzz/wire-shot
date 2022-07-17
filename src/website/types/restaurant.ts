import { ethers } from "ethers";

export enum ETableStatus {
  Busy,
  Free,
  Closed,
}

type TTableStatusString = "Free" | "Busy" | "Closed";

export interface Table {
  id: number;
  name: string;
  address: string;
  status: ETableStatus;
}

export type TMenuKeys = "id" | "name" | "price" | "description" | "category";
export interface IMenuItem {
  name: string;
  price: number;
  id?: number;
}


export interface IMenuItemDetails extends IMenuItem {
  category: string;
  description: string;
}

export interface Restaurant {
  name: string;
  tables: Array<Table>;
  menu: Array<IMenuItemDetails>;
  contract?: ethers.Contract;
  address:string;
}

export const STATUSMAPPING: {
  [key in ETableStatus]: TTableStatusString;
} = {
  "0": "Busy",
  "1": "Free",
  "2": "Closed",
};
