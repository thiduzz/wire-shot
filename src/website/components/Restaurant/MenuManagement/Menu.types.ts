import { IMenuItem } from "@local-types/restaurant";
import { IMenuItemDetails } from './../../../types/restaurant';

export interface IMenuCreateProps {
  menu: IMenuItemDetails;
  onChange: (value: IMenuItemDetails) => void;
}

export interface IMenuListProps {
  menu: IMenuByCategory;
  type?: "fixed" | "interactive";
  onSelect?: (item: IMenuItemDetails) => void;
}

export interface IMenuByCategory {
  [key: string]: IMenuItemDetails[];
}
