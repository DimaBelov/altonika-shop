import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Product } from '@entities/product';
import { environment } from '../environments/environment';

@Injectable()
export class ProductService {

  constructor(private _http: HttpClient) { }

  get() {
    return this._http.get<Array<Product>>(environment.apiUrl + 'product');
  }

  getById(id: number) {
    return this._http.get<Product>(environment.apiUrl + 'product/' + id);
  }
}
