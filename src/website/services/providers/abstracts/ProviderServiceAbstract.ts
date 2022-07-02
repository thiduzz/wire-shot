

export type OrderServiceAbstract<P> = P;
export type RestaurantServiceAbstract<P> = P;
export type TableServiceAbstract<P> = P;

export abstract class ProviderServiceAbstract<R,T,O> {
  abstract RestaurantService: RestaurantServiceAbstract<R>;
  abstract TableService: TableServiceAbstract<T>;
  abstract OrderService: OrderServiceAbstract<O>;
}
