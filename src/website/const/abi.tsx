import RestaurantAbi from "@wireshot/hardhat/artifacts/contracts/Restaurant.sol/Restaurant.json";
import TableAbi from "@wireshot/hardhat/artifacts/contracts/Table.sol/Table.json";
import OrderAbi from "@wireshot/hardhat/artifacts/contracts/Order.sol/Order.json";
import spawnerAbi from "@wireshot/hardhat/artifacts/contracts/RestaurantSpawner.sol/RestaurantSpawner.json";
import { TABIS } from "@local-types/abi";

export const ABIS: {
  [key in TABIS]: any;
} = {
  spawner: spawnerAbi,
  restaurant: RestaurantAbi,
  table: TableAbi,
  order: OrderAbi,
};
