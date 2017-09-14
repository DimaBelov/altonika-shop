import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@entities/product';
import { ProductHistory } from '@entities/product-history';

@Injectable()
export class ProductHistoryService {

    private productHistorytKey = 'productHistory';

    constructor() {
        // this.init();
     }

    init() {
        if (localStorage.getItem(this.productHistorytKey) !== null) {
            return;
        }
    
        this.set([]);
    }

    get() {
        return JSON.parse(localStorage.getItem(this.productHistorytKey)) as Array<ProductHistory>;
    }

    getN(n: number) {
        let history = this.get();

        if (history.length <= n) {
            return history;
        }

        return history.slice(history.length - n, history.length).reverse();
    }

    add(product: Product) {
        let history = this.get();
        history.push({Product: product, Date: new Date()});
        this.set(history);
    }

    private set(history: Array<ProductHistory>) {
        localStorage.setItem(this.productHistorytKey, JSON.stringify(history));
    }
}
