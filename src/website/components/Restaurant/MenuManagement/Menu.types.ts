import { IMenuItem, TMenuKeys } from "@local-types/restaurant";

export interface IMenuCreateProps {
  menu: IMenuItem;
  onChange: (value: IMenuItem) => void;
  onCreation: () => void;
}

export interface IMenuListProps {
  menu: IMenuItem[];
  onSelect?: (item: IMenuItem) => void;
}
