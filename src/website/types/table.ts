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

export const STATUSMAPPING: {
  [key in ETableStatus]: TTableStatusString;
} = {
  "0": "Busy",
  "1": "Free",
  "2": "Closed"
};
