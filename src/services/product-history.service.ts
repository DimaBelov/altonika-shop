import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@entities/product';
import { ProductHistory } from '@entities/product-history';
import { Logger } from '@services/logger';

@Injectable()
export class ProductHistoryService {
    readonly maxCount = 100;
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
        
        if (history.length >= this.maxCount) {
            let diff = history.length - this.maxCount + 1;  // + 1, удаляем на один больше, т.к. в конце надо добавить ещё один
            Logger.log('diff', diff, 'current count', history.length);
            history.splice(0, diff);
            Logger.log('count after splice', history.length);
        }

        history.push(product);
        this.set(history);
    }

    // totalCount() {
    //     return this.get().length;
    // }

    private set(history: Array<Product>) {
        localStorage.setItem(this.productHistorytKey, JSON.stringify(history));
    }
}
