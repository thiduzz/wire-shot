import { IBasket } from "@local-types/order";
import { IMenuItem } from "@local-types/restaurant";
import { ABIS } from "const";
import { ethers } from "ethers";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ISmartContractService } from "services/SmartContractService.types";

interface IBasicInfo {
  contract: ethers.Contract | null;
  name: string;
}
interface IOrderContext {
  totalPrice: number;
  contract: ethers.Contract | null;
  restaurant: IBasicInfo;
  table: {
    contract: ethers.Contract | null;
    name: string;
  };
  menu: IMenuItem[];
  basket: {
    price: number;
    items: IMenuItem[];
  };
  orderItems: number[];
  setContract: Dispatch<SetStateAction<ethers.Contract | null>>;
  setRestaurant: Dispatch<SetStateAction<IBasicInfo>>;
  setMenu: Dispatch<SetStateAction<IMenuItem[]>>;
  setBasket: Dispatch<SetStateAction<IBasket>>;
  setOrderItems: Dispatch<SetStateAction<number[]>>;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  getRestaurantAndTableData: (
    contractService: ISmartContractService
  ) => Promise<void>;
  resetOrder: () => void;
  resetBasket: () => void;
  calculateBasketPrice: (items: IMenuItem[]) => number;
}

const throwMissingProvider: () => void = () => {
  throw new Error("The ContextProvider is missing!");
};

const initialState: IOrderContext = {
  totalPrice: 0,
  contract: null,
  getRestaurantAndTableData: async () => {},
  calculateBasketPrice: () => 0,
  setContract: throwMissingProvider,
  setOrderItems: throwMissingProvider,
  setRestaurant: throwMissingProvider,
  setMenu: throwMissingProvider,
  setBasket: throwMissingProvider,
  setTotalPrice: throwMissingProvider,
  resetOrder: throwMissingProvider,
  resetBasket: throwMissingProvider,
  restaurant: {
    contract: null,
    name: "",
  },
  table: {
    contract: null,
    name: "",
  },
  menu: [],
  basket: {
    price: 0,
    items: [],
  },
  orderItems: [],
};

export const OrderContext = createContext<IOrderContext>(initialState);

/* Wouldnt it make more sense to have one big state because we do not need to update that often single "setXY()" */
export const OrderProvider = ({ children }: { children?: ReactNode }) => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [menu, setMenu] = useState<IMenuItem[]>([]);
  const [basket, setBasket] = useState<IBasket>({
    price: 0,
    items: [],
  });
  const [orderItems, setOrderItems] = useState<number[]>([]);
  const [restaurant, setRestaurant] = useState<{
    contract: ethers.Contract | null;
    name: string;
  }>({ contract: null, name: "" });
  const [table, setTable] = useState<{
    contract: ethers.Contract | null;
    name: string;
  }>({ contract: null, name: "" });

  const getRestaurantAndTableData = async (
    contractService: ISmartContractService
  ): Promise<void> => {
    if (contract) {
      const restaurantAddress = await contract.restaurant();
      const tableAddress = await contract.table();
      const restaurantContract = contractService.getContract(
        restaurantAddress,
        ABIS.restaurant.abi
      );
      setRestaurant({
        contract: restaurantContract,
        name: await restaurantContract.name(),
      });
      /* Should be done in tableService */
      const tableContract = contractService.getContract(
        tableAddress,
        ABIS.table.abi
      );
      setTable({
        contract: tableContract,
        name: await tableContract.name(),
      });
    }
  };

  const calculateBasketPrice = (items: IMenuItem[]) => {
    return items.reduce((variantsSum, variantItem) => {
      return variantsSum + variantItem.price;
    }, 0);
  };

  const resetBasket = () => {
    setBasket(initialState.basket);
  };

  const resetOrder = (): void => {
    setTotalPrice(initialState.totalPrice);
    setContract(initialState.contract);
    setMenu(initialState.menu);
    setTable(initialState.table);
    setOrderItems(initialState.orderItems);
  };

  const state = {
    contract,
    setContract,
    restaurant,
    setRestaurant,
    table,
    setTable,
    menu,
    totalPrice,
    setMenu,
    setTotalPrice,
    orderItems,
    setOrderItems,
    getRestaurantAndTableData,
    resetOrder,
    setBasket,
    resetBasket,
    basket,
    calculateBasketPrice,
  };

  return (
    <OrderContext.Provider value={state}>{children}</OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
