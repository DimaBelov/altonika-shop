import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

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
  productCardRoute = 'card';

  constructor(
    public dialogRef: MdDialogRef<ProductCardDialogComponent>,
    private _router: Router,
    public basketService: BasketService) { }

  ngOnInit() {
  }

  openProductCard(product: Product) {
    this.dialogRef.close(true);
    this._router.navigate([this.productCardRoute], { queryParams: { 'id': product.id } });
  }
}
