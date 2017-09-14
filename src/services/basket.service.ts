import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BasketItem } from '@entities/basket-item';
import { Product } from '@entities/product';
// import { LinqService } from 'ng2-linq/ng2-linq';

@Injectable()
export class BasketService {

  private basketKey = 'basket';

  constructor(private _http: HttpClient, /*private linq: LinqService*/) { }

  init() {
    if (localStorage.getItem(this.basketKey) !== null) {
        return;
    }

    localStorage.setItem(this.basketKey, JSON.stringify([]));
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

      localStorage.setItem(this.basketKey, JSON.stringify(basket));
  }

  remove(item) {
    let basket = this.get();

    basket.forEach(i => {
      if (i.Id === item.Id) {
        let index = basket.indexOf(i);
        basket.splice(index, 1);
        console.log('remove from basket');
        console.log(i);
      }
    });

    localStorage.setItem(this.basketKey, JSON.stringify(basket));
  }

  clear() {
    localStorage.removeItem(this.basketKey);
    this.init();
  }
}
