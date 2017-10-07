import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@entities/product';
import { ProductHistory } from '@entities/product-history';

@Injectable()
export class ProductHistoryService {

    private productHistorytKey = 'productHistory';

    constructor() {
    }

    init() {
        if (localStorage.getItem(this.productHistorytKey) !== null) {
            return;
        }

        this.set([]);
    }

    get() {
        return JSON.parse(localStorage.getItem(this.productHistorytKey)) as Array<Product>;
    }

    getN(n: number) {
        let history = this.get();
        let nHistory: Array<Product>;

        if (history.length <= n) {
            nHistory = history;
        } else {
            nHistory = history.slice(history.length - n, history.length);
        }

        return nHistory.reverse();
    }

    add(product: Product) {
        let history = this.get();
        history.push(product);
        this.set(history);
    }

    private set(history: Array<Product>) {
        localStorage.setItem(this.productHistorytKey, JSON.stringify(history));
    }
}
