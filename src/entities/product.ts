import { NamedEntity } from '@entities/named-entity';
import { BasketItem } from '@entities/basket-item';

export class Product extends NamedEntity {
    
    price: number;
    description: string;
    imageSource: string;
    
    constructor() {
        super();
    }

    // public getBasketItem() {
    //     let item = new BasketItem();
    //     item.Id = this.Id;
    //     item.Name = this.Name;
    //     item.Description = this.Description;
    //     item.Quantity = 1;
    //     return item;
    // }
}
