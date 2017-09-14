import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MdDialogRef} from '@angular/material';

import { Product } from '@entities/product';
import { BasketService } from '@services/basket.service';

@Component({
  selector: 'app-product-card-dialog',
  templateUrl: './product-card-dialog.component.html',
  styleUrls: ['./product-card-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductCardDialogComponent implements OnInit {

  product: Product;

  constructor(
    public dialogRef: MdDialogRef<ProductCardDialogComponent>,
    private _basketService: BasketService) { }

  ngOnInit() {
  }

  putInBasket(product: Product) {
    console.log('putInBasket');
    console.log(product);

    this._basketService.putIn(product);
  }
}
