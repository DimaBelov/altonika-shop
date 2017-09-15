import { Product } from '@entities/product';

export class BasketItem {

    product: Product;
    quantity: number;

    constructor() {
    }
}
