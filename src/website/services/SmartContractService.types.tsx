import { ethers } from "ethers";

export interface ISmartContractService {
  getContract: (address: string, abiSource: string) => ethers.Contract;
  getProvider: () => ethers.providers.Web3Provider;
}
