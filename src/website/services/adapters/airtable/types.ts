import { IMenuItem } from "@local-types/restaurant";
export interface IMenuItemResponse {
  fields: IMenuItemAirtableFields;
}

export interface IMenuItemAirtableFields {
  id: number;
  name: string;
  description: string;
  category: string;
  restaurant_address: string;
}
export interface IMenuResponse {
  records: Array<IMenuItemResponse>;
}
export interface IMenuDetails {
  [key: string]: IMenuItemDetails;
}
export interface IMenuItemDetails extends IMenuItem {
  name: string;
  description: string;
  category: string;
}
