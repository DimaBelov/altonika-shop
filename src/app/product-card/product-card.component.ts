import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '@entities/product';
import { ProductService } from '@services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  product: Product;

  constructor(private _route: ActivatedRoute,
    private _productService: ProductService) {
    _route.queryParams.subscribe(params => {
      let id = params['id'];
      this._productService.getById(id)
        .subscribe(
          p => {
            this.product = p;
          },
          error => {
            console.log('get product by id error');
            console.log(error);
          });
    });
  }

  ngOnInit() {
  }

}
