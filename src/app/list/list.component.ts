import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogConfig } from '@angular/material';

import { Product } from '@entities/product';
import { ProductHistory } from '@entities/product-history';
import { ProductService } from '@services/product.service';
import { BasketService } from '@services/basket.service';
import { ProductHistoryService } from '@services/product-history.service';
import { ProductCardDialogComponent } from '../product-card-dialog/product-card-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products: Array<Product>;
  filteredProducts: Array<Product>;
  searchText: string;
  productHistory: Array<ProductHistory>;

  constructor(private _route: ActivatedRoute,
    private _productService: ProductService, 
    private _basketService: BasketService,
    private _productHistoryService: ProductHistoryService,
    private _dialog: MdDialog) {
      _route.queryParams.subscribe(params => {
        this.searchText = params['search'];
        this.refresh();
      });
    }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.products = this._productService.get();
    
    if (!this.searchText) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.Name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1);
    }

    this.productHistory = this._productHistoryService.getN(5);
    console.log('productHistory');
    console.log(this.productHistory);
  }

  putInBasket(product: Product) {
    console.log('putInBasket');
    console.log(product);

    this._basketService.putIn(product);
  }

  openProductCardDialog(product: Product) {
    let dialogConfig = new MdDialogConfig();
    let dialogRef = this._dialog.open(ProductCardDialogComponent, dialogConfig);
    dialogRef.componentInstance.product = product;
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}
