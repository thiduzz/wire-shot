import OrderAbi from "@wireshot/hardhat/artifacts/contracts/Table.sol/Table.json";
import { ethers } from "ethers";

export class OrderService {
  provider: ethers.providers.Web3Provider;
  contract: ethers.Contract;

  constructor(provider: ethers.providers.Web3Provider, address: string) {
    this.provider = provider;
    this.contract = this.getContract(address);
  }

  private getContract = (address: string) => {
    return new ethers.Contract(
      address,
      OrderAbi.abi,
      this.provider.getSigner()
    );
  };

  retrieveCurrentOrderItems = async (): Promise<void> => {
    const items = await this.contract.getOrderItems();
    console.log("items", items);
  };
  placeOrder = async (address: string): Promise<boolean> => {
    const tableContract = this.getContract(address);
    const response = await tableContract.checkIn();
    return response;
  };
}
