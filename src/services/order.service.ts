import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Product } from '@entities/product';
import { BasketItem } from '@entities/basket-item';
import { Order } from '@entities/order';
import { environment } from '../environments/environment';
import { UserService } from '@services/user.service';

@Injectable()
export class OrderService {

  constructor(private _http: HttpClient, private _userService: UserService) { }

  add(basket: Array<BasketItem>) {
    return this._http.post(environment.apiUrl + 'order', {basketItems: basket, user: this._userService.getCurrentUser()});
  }

  getByUser(userId: number) {
    return this._http.get<Array<Order>>(environment.apiUrl + 'order/user/' + userId);
  }
}
