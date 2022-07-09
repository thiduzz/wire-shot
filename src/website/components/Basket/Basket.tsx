import LoadingSpinner from "@components/LoadingSpinner";
import React from "react";
import { IoCart, IoRemoveCircle } from "react-icons/io5";
import { BasketProps } from "./Basket.types";

const Basket = ({
  orderPlaced,
  basket,
  handlePlaceOrder,
  handleRemoveItem,
}: BasketProps) => {
  return (
    <div className="w-full py-4 flex border-2 p-4 gap-12">
      {orderPlaced ? (
        <div className="p-4 flex gap-8 items-center text-purple-400">
          <LoadingSpinner></LoadingSpinner>
          <div>
            Your order is beeing processed. Please reload after a few minutes
          </div>
        </div>
      ) : basket.items.length > 0 ? (
        <div>
          <button
            className="bg-purple-400 text-white p-4 rounded-lg flex items-center mb-auto gap-4"
            onClick={handlePlaceOrder}
          >
            <IoCart size={24} />
            Order
          </button>
          <div className="mt-4 font-bold text-xl">
            Total price {basket.price} €
          </div>
        </div>
      ) : (
        <div>Please add an item to your basket..</div>
      )}
      <div>
        <div>
          {basket.items.map((item, index) => {
            return (
              <div className="flex gap-4 my-2">
                <div key={item.name}>
                  {item.name} - {item.price}€
                </div>
                <button
                  className="text-red-400 rounded-lg"
                  onClick={() => handleRemoveItem(index)}
                >
                  <IoRemoveCircle size={20} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Basket;
