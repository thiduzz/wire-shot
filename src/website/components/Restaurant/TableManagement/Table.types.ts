import { Table } from "@local-types/restaurant";

export interface TableCreateProps {
  value: string;
  onChange: (value: string) => void;
  onCreation: () => void;
}

export interface TableListProps {
  tables: Table[];
  onClickHandler?: (table: Table) => void;
}
