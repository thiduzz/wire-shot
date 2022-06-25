import { ITable } from "@local-types/restaurant";

export interface ITableCreateProps {
  value: string;
  onChange: (value: string) => void;
  onCreation: () => void;
}

export interface ITableListProps {
  tables: ITable[];
  onClickHandler?: (table: ITable) => void;
}
