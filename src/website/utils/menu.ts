import { IMenuByCategory } from "@components/Restaurant/MenuManagement/Menu.types";
import { IMenuItemDetails } from "@local-types/restaurant";

const formatMenuByCategory = (menu: IMenuItemDetails[]): IMenuByCategory => {
  const objected = {};
  menu.map((item) => {
    if (objected[item.category]) {
      objected[item.category].push(item);
    } else if (item.category) {
      objected[item.category] = [item];
    }
  });
  return objected;
};

export { formatMenuByCategory };
