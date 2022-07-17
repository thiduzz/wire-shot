import { makeUrl } from "./constants";
import {
  IMenuDetails,
  IMenuItemDetails,
  IMenuItemResponse,
  IMenuResponse,
} from "./types";

const getMenuDetailsFromAirtable = async (restaruantAddress: string) => {
  const response = await fetch(makeUrl("Menu"));
  const restauarantMenu = await response
    .json()
    .then((data: IMenuResponse) =>
      data.records.filter(
        (record) => record.fields.restaurant_address === restaruantAddress
      )
    );
  return serializeMenuDetails(restauarantMenu);
};

const createMenuDetailsInAirtable = async (
  item: IMenuItemDetails,
  address: string
) => {
  return fetch(makeUrl("Menu"), {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields: { ...item, restaurant_address: address } }),
  });
};

const serializeMenuDetails = (
  menuDetails: Array<IMenuItemResponse>
): IMenuDetails => {
  const menuItemsObject = {};
  for (let i = 0; i < menuDetails.length; i++) {
    menuItemsObject[menuDetails[i].fields.id] = {
      name: menuDetails[i].fields.name,
      description: menuDetails[i].fields.description,
      category: menuDetails[i].fields.category,
    };
  }
  return menuItemsObject;
};

export const menuApi = {
  getMenuDetailsFromAirtable,
  createMenuDetailsInAirtable,
};
