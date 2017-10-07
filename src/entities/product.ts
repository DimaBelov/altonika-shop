import { NamedEntity } from '@entities/named-entity';
import { BasketItem } from '@entities/basket-item';

export class Product extends NamedEntity {
    
    code: string;
    price: number;
    description: string;
    imageSource: string;
    isDeleted: boolean;
    isFavorite: boolean;
    
    constructor() {
        super();
    }
}
