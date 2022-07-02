import { ethers } from "ethers";
import { ISmartContractService } from "./SmartContractService.types";

const getContract = (address: string, abiSource: string): ethers.Contract => {
  return new ethers.Contract(address, abiSource, getProvider().getSigner());
};

const getProvider = (): ethers.providers.Web3Provider => {
  const { ethereum } = window as any;
  if (!ethereum) {
    throw Error("Provider could not be set");
  }

  return new ethers.providers.Web3Provider(window.ethereum);
};

export const SmartContractService: ISmartContractService = {
  getContract,
  getProvider,
};
