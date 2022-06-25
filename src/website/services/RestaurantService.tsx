import { useEthers } from "@hooks/useEthers";
import { Restaurant } from "@local-types/restaurant";
import { ethers } from "ethers";
import { MenuService, TableService } from "services";
import RestaurantAbi from "@wireshot/hardhat/artifacts/contracts/Restaurant.sol/Restaurant.json";

export class RestaurantService {
  provider: ethers.providers.Web3Provider;
  tableService: TableService;

  constructor(provider: ethers.providers.Web3Provider) {
    this.provider = provider;
    this.tableService = new TableService(provider);
  }

  getContract = (address: string): ethers.Contract => {
    return new ethers.Contract(
      address,
      RestaurantAbi.abi,
      this.provider.getSigner()
    );
  };
  getDetails = async (
    restaurantContract: ethers.Contract
  ): Promise<Restaurant> => {
    const restaurantName = await restaurantContract.name();
    return {
      name: restaurantName,
      tables: await this.tableService.retrieveTables(restaurantContract),
      contract: restaurantContract,
      menu: await MenuService.retrieveMenu(restaurantContract),
    };
  };
}
