import {
  OrderServiceAbstract,
  ProviderServiceAbstract,
  RestaurantServiceAbstract,
  TableServiceAbstract,
} from "services/providers/abstracts";
import { TableServiceAbstractEVM } from "services/adapters/evm/abstracts";
import { OrderServiceAbstractEVM } from "services/adapters/evm/abstracts/OrderServiceAbstractEVM";
import { RestaurantServiceAbstractEVM } from "services/adapters/evm/abstracts/RestaurantServiceAbstractEVM";
import {
  OrderService as EVMOrderService,
  RestaurantService as EVMRestaurantService,
  TableService as EVMTableService,
} from "../adapters/evm";
import { EVMProvider, TProviderTypes } from "./ProviderService.types";

const generateProvider = (providerType: TProviderTypes): EVMProvider => {
  return {
    RestaurantService: restaurantService[providerType],
    TableService: tableServices[providerType],
    OrderService: orderService[providerType],
  };
};

const tableServices: { evm: TableServiceAbstract<TableServiceAbstractEVM> } = {
  evm: EVMTableService,
};
const restaurantService: {
  evm: RestaurantServiceAbstract<RestaurantServiceAbstractEVM>;
} = {
  evm: EVMRestaurantService,
};
const orderService: { evm: OrderServiceAbstract<OrderServiceAbstractEVM> } = {
  evm: EVMOrderService,
};

/* Adjustment required if adding additional providers */
export const getProviderServices = (
  providerType: TProviderTypes
): EVMProvider => {
  return generateProvider(providerType);
};
