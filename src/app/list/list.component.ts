import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogConfig, MdGridList } from '@angular/material';

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
  productHistory: Array<Product>;
  productCardRoute = 'card';

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
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
    this._productService.get().subscribe(data => {
      console.log('data');
      console.log(data);

      this.products = data;

      if (!this.searchText) {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter(p => p.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1);
      }
  
      this.productHistory = this._productHistoryService.getN(5);
      console.log('productHistory');
      console.log(this.productHistory);
    });
  }

  putInBasket(product: Product) {
    console.log('putInBasket');
    console.log(product);

    this._basketService.putIn(product);
  }

  openProductCard(product: Product) {
    this._router.navigate([this.productCardRoute], {queryParams: {'id': product.id}});
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

  showBtn(product: Product) {
    let btn = document.getElementById('btn' + product.id);
    btn.style.visibility = 'visible';
  }

  hideBtn(product: Product) {
    let btn = document.getElementById('btn' + product.id);
    btn.style.visibility = 'hidden';
  }
}
