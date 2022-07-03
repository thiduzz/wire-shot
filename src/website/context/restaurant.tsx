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
  isLoading: boolean;
  restaurants: { address: string; name: string }[] | undefined;
  setRestaurants: Dispatch<
    SetStateAction<{ address: string; name: string }[] | undefined>
  >;
  setRestaurant: Dispatch<SetStateAction<Restaurant | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  resetRestaurant: () => void;
}

const throwMissingProvider: () => void = () => {
  throw new Error("The ContextProvider is missing!");
};

const initialState: IRestaurantContext = {
  setRestaurants: throwMissingProvider,
  setRestaurant: throwMissingProvider,
  resetRestaurant: throwMissingProvider,
  setIsLoading: throwMissingProvider,
  restaurant: {
    menu: [],
    tables: [],
    name: "",
    address: "",
  },
  restaurants: [],
  isLoading: true,
};

export const RestaurantContext =
  createContext<IRestaurantContext>(initialState);

export const RestaurantProvider = ({ children }: { children?: ReactNode }) => {
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [restaurants, setRestaurants] = useState<
    { address: string; name: string }[] | undefined
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const resetRestaurant = (): void => {
    setRestaurant(initialState.restaurant);
  };
  const state = {
    restaurant,
    isLoading,
    setIsLoading,
    setRestaurant,
    restaurants,
    setRestaurants,
    resetRestaurant,
  };

  return (
    <RestaurantContext.Provider value={state}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => useContext(RestaurantContext);
