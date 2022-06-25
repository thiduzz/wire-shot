import { useEthers } from "@hooks/useEthers";
import { IRestaurant } from "@local-types/restaurant";
import { ethers } from "ethers";
import { MenuService, TableService } from "services";
import RestaurantAbi from "@wireshot/hardhat/artifacts/contracts/Restaurant.sol/Restaurant.json";

export const RestaurantService = {
  getContract: (
    address: string,
    provider: ethers.providers.Web3Provider
  ): ethers.Contract => {
    return new ethers.Contract(
      address,
      RestaurantAbi.abi,
      provider.getSigner()
    );
  },
  getDetails: async (
    restaurantContract: ethers.Contract,
    provider: ethers.providers.Web3Provider
  ): Promise<IRestaurant> => {
    const restaurantName = await restaurantContract.name();
    return {
      name: restaurantName,
      tables: await TableService.retrieveTables(restaurantContract, provider),
      contract: restaurantContract,
      menu: await MenuService.retrieveMenu(restaurantContract),
    };
  },
};
