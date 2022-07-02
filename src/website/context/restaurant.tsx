import { Restaurant } from "@local-types/restaurant";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface IRestaurantContext {
  restaurant: Restaurant | undefined;
  loading: boolean;
  restaurants: { address: string; name: string }[] | undefined;
  setRestaurants: Dispatch<
    SetStateAction<{ address: string; name: string }[] | undefined>
  >;
  setRestaurant: Dispatch<SetStateAction<Restaurant | undefined>>;
}

const throwMissingProvider: () => void = () => {
  throw new Error("The ContextProvider is missing!");
};

const initialState: IRestaurantContext = {
  setRestaurants: throwMissingProvider,
  setRestaurant: throwMissingProvider,
  restaurant: {
    menu: [],
    tables: [],
    name: "",
    address: "",
  },
  restaurants: [],
  loading: true,
};

export const RestaurantContext =
  createContext<IRestaurantContext>(initialState);

export const RestaurantProvider = ({ children }: { children?: ReactNode }) => {
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [restaurants, setRestaurants] = useState<
    { address: string; name: string }[] | undefined
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const state = {
    restaurant,
    loading,
    setRestaurant,
    setLoading,
    restaurants,
    setRestaurants,
  };

  return (
    <RestaurantContext.Provider value={state}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => useContext(RestaurantContext);
