import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BasketItem } from '@entities/basket-item';
import { Product } from '@entities/product';
import { ProductHistoryService } from '@services/product-history.service';

@Injectable()
export class BasketService {

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
        if (i.Id === product.Id) {
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
          Id: product.Id,
          Name: product.Name,
          Description: product.Description,
          Quantity: 1
        });

        console.log('add new product to basket');
      } else {
        exists.Quantity += 1;
        console.log('inc quantity of');
        console.log(exists);
      }

      this.set(basket);
      this._productHistoryService.add(product);
  }

  dec(item: BasketItem) {
    let basket = this.get();
    basket.forEach(i => {
      if (i.Id === item.Id) {
        if (i.Quantity === 1) {
          let index = basket.indexOf(i);
          basket.splice(index, 1);
          console.log('remove from basket');
          console.log(i);
        } else {
          i.Quantity -= 1;
          console.log('dec quantity');
          console.log(i);
        }
      }
    });

    this.set(basket);
  }

  inc(item: BasketItem) {
    let basket = this.get();
    basket.forEach(i => {
      if (i.Id === item.Id) {
        i.Quantity += 1;
        console.log('inc quantity');
        console.log(i);
      }
    });
    this.set(basket);
  }

  remove(item: BasketItem) {
    let basket = this.get();

    basket.forEach(i => {
      if (i.Id === item.Id) {
        let index = basket.indexOf(i);
        basket.splice(index, 1);
        console.log('remove from basket');
        console.log(i);
      }
    });

    this.set(basket);
  }

  clear() {
    localStorage.removeItem(this.basketKey);
    this.init();
  }

  private set(basket: Array<BasketItem>) {
    localStorage.setItem(this.basketKey, JSON.stringify(basket));
  }
}
