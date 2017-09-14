import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Product } from '@entities/product';

@Injectable()
export class ProductService {

  constructor(private _http: HttpClient) { }

  get() {
    return this.test();
  }

  test() {
      return [
          {Id: 1, Name: 'Product1', Description: 'This is a product'},
          {Id: 2, Name: 'Product2', Description: 'This is another product'},
          {Id: 3, Name: 'Product3', Description: 'This is a product'},
          {Id: 4, Name: 'Product4', Description: 'This is another product'},
          {Id: 5, Name: 'Product5', Description: 'This is a product'},
          {Id: 6, Name: 'Product6', Description: 'This is another product'},
          {Id: 7, Name: 'Product7', Description: 'This is a product'},
          {Id: 8, Name: 'Product8', Description: 'This is another product'},
          {Id: 9, Name: 'Product9', Description: 'This is another product'}

      ] as Array<Product>;
  }
}
