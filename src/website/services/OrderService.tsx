import OrderAbi from "@wireshot/hardhat/artifacts/contracts/Table.sol/Table.json";
import { ABIS } from "const";
import { ethers } from "ethers";
import { SmartContractService } from "./SmartContractService";

export class OrderService extends SmartContractService {
  contract: ethers.Contract;

  constructor(address: string) {
    super(ABIS.order);
    this.contract = this.getContract(address);
  }

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
