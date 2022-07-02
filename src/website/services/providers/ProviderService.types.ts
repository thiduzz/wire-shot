import { ProviderServiceAbstract } from "services/providers/abstracts";
import { OrderServiceAbstractEVM } from "services/adapters/evm/abstracts/OrderServiceAbstractEVM";
import { RestaurantServiceAbstractEVM } from "services/adapters/evm/abstracts/RestaurantServiceAbstractEVM";
import { TableServiceAbstractEVM } from "services/adapters/evm/abstracts/TableServiceAbstractEVM";

export type TProviderTypes = "evm";

export type EVMProvider = ProviderServiceAbstract<
  RestaurantServiceAbstractEVM,
  TableServiceAbstractEVM,
  OrderServiceAbstractEVM
>;
