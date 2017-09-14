import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Product } from '@entities/product';

@Injectable()
export class BasketService {

  private basketKey = 'basket';

  constructor(private _http: HttpClient) { }

  init() {
    if (localStorage.getItem(this.basketKey) !== null) {
        return;
    }

    localStorage.setItem(this.basketKey, JSON.stringify([]));
  }

  get() {
    return JSON.parse(localStorage.getItem(this.basketKey)) as Array<Product>;
  }

  putIn(product: Product) {
      let basket = this.get();
      basket.push(product);
      localStorage.setItem(this.basketKey, JSON.stringify(basket));
  }

  clear() {
    localStorage.removeItem(this.basketKey);
    this.init();
  }
}
