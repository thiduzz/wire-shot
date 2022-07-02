import { userService } from "@hooks/useService";
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
import { RestaurantServiceAbstract } from "services/providers/abstracts";
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
  orderItems: number[];
  tableName: string;
  setContract: Dispatch<SetStateAction<ethers.Contract | null>>;
  setRestaurant: Dispatch<SetStateAction<IBasicInfo>>;
  setMenu: Dispatch<SetStateAction<IMenuItem[]>>;
  setOrderItems: Dispatch<SetStateAction<number[]>>;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  getRestaurantAndTableData: (
    contractService: ISmartContractService
  ) => Promise<void>;
}

const throwMissingProvider: () => void = () => {
  throw new Error("The ContextProvider is missing!");
};

const initialState: IOrderContext = {
  totalPrice: 0,
  contract: null,
  getRestaurantAndTableData: async () => {},
  setContract: throwMissingProvider,
  setOrderItems: throwMissingProvider,
  setRestaurant: throwMissingProvider,
  setMenu: throwMissingProvider,
  setTotalPrice: throwMissingProvider,
  restaurant: {
    contract: null,
    name: "",
  },
  table: {
    contract: null,
    name: "",
  },
  menu: [],
  orderItems: [],
  tableName: "",
};

export const OrderContext = createContext<IOrderContext>(initialState);

export const OrderProvider = ({ children }: { children?: ReactNode }) => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
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

  const [tableName, setTableName] = useState<string>("");
  const [menu, setMenu] = useState<IMenuItem[]>([]);
  const [orderItems, setOrderItems] = useState<number[]>([]);

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
    tableName,
    setTableName,
    setTotalPrice,
    orderItems,
    setOrderItems,
    getRestaurantAndTableData,
  };

  return (
    <OrderContext.Provider value={state}>{children}</OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
