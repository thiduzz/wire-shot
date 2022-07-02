import { ethers } from "ethers";
import {
  EVMProvider,
  TProviderTypes
} from "services/providers/ProviderService.types";
import { SmartContractService } from "services/SmartContractService";
import { ISmartContractService } from "services/SmartContractService.types";
import { getProviderServices } from "./../services/providers/ProviderService";

export type UseService = EVMProvider & { SmartContractService: ISmartContractService };
/* Needs refacotring if we want to allow different providers */
const getProvider = (): ethers.providers.Web3Provider => {
  const { ethereum } = window as any;
  if (!ethereum) {
    throw "No Provider";
  }

  return new ethers.providers.Web3Provider(window.ethereum);
};

export const userService = (providerType: TProviderTypes): UseService => {
  const service = getProviderServices(providerType);
  return {
    RestaurantService: service.RestaurantService,
    TableService: service.TableService,
    OrderService: service.OrderService,
    SmartContractService: SmartContractService,
  };
};
