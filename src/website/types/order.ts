import { IMenuItem } from './restaurant';

export interface IBasket {
    price: number;
    items: IMenuItem[];
}