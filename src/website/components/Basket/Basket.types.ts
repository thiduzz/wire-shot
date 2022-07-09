import { IBasket } from "./../../types/order";

export interface BasketProps {
  orderPlaced: boolean;
  basket: IBasket;
  handlePlaceOrder: () => void;
  handleRemoveItem: (index: number) => void;
}
