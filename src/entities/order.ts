import { BasketItem } from '@entities/basket-item';

export class Order {
    id: number;
    details: Array<BasketItem>;
    createDate: Date;
}
