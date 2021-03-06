import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BasketItem } from '@entities/basket-item';
import { Product } from '@entities/product';
import { ProductHistoryService } from '@services/product-history.service';

@Injectable()
export class BasketService {

  @Output() onItemAdded = new EventEmitter();

  private basketKey = 'basket';

  constructor(private _http: HttpClient, private _productHistoryService: ProductHistoryService) { }

  init() {
    if (localStorage.getItem(this.basketKey) !== null) {
        return;
    }

    this.set([]);
  }

  get() {
    return JSON.parse(localStorage.getItem(this.basketKey)) as Array<BasketItem>;
  }

  putIn(product: Product) {
      let basket = this.get();
      let exists: BasketItem;

      basket.forEach(i => {
        if (i.product.id === product.id) {
          exists = i;
        }
      });

      console.log('exists');
      console.log(exists);
      console.log('exists === undefined');
      console.log(exists === undefined);

      if (exists === undefined) {
        // basket.push(product.getBasketItem());  //WTF?!

        basket.push({
          product: product,
          quantity: 1
        });

        console.log('add new product to basket');
      } else {
        exists.quantity += 1;
        console.log('inc quantity of');
        console.log(exists);
      }

      this.set(basket);
      this._productHistoryService.add(product);

      this.onItemAdded.emit(this.totalCount());
  }

  dec(item: BasketItem) {
    let basket = this.get();
    basket.forEach(i => {
      if (i.product.id === item.product.id) {
        if (i.quantity === 1) {
          let index = basket.indexOf(i);
          basket.splice(index, 1);
          console.log('remove from basket');
          console.log(i);
        } else {
          i.quantity -= 1;
          console.log('dec quantity');
          console.log(i);
        }
      }
    });

    this.set(basket);
    this.onItemAdded.emit(this.totalCount());
  }

  inc(item: BasketItem) {
    let basket = this.get();
    basket.forEach(i => {
      if (i.product.id === item.product.id) {
        i.quantity += 1;
        console.log('inc quantity');
        console.log(i);
      }
    });
    this.set(basket);
    this.onItemAdded.emit(this.totalCount());
  }

  remove(item: BasketItem) {
    let basket = this.get();

    basket.forEach(i => {
      if (i.product.id === item.product.id) {
        let index = basket.indexOf(i);
        basket.splice(index, 1);
        console.log('remove from basket');
        console.log(i);
      }
    });

    this.set(basket);
    this.onItemAdded.emit(this.totalCount());
  }

  clear() {
    localStorage.removeItem(this.basketKey);
    this.init();
    this.onItemAdded.emit(this.totalCount());
  }

  totalCount() {
    let basket = this.get();
    let total = 0;
    basket.forEach(i => {
      total += i.quantity;
    });
    return total;
  }

  private set(basket: Array<BasketItem>) {
    localStorage.setItem(this.basketKey, JSON.stringify(basket));
  }
}
