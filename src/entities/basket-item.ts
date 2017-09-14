import { Product } from '@entities/product';

export class BasketItem extends Product {

    Quantity: number;

    constructor() {
        super();
    }
}
