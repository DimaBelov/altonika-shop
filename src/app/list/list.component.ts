import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdGridList, PageEvent } from '@angular/material';

import { Product } from '@entities/product';
import { ProductHistory } from '@entities/product-history';
import { ProductService } from '@services/product.service';
import { BasketService } from '@services/basket.service';
import { ProductHistoryService } from '@services/product-history.service';
import { ProductCardDialogComponent } from '../product-card-dialog/product-card-dialog.component';
import { PaggingOptions } from '@entities/pagging-options';
import { PaggingResult } from '@entities/pagging-result';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {

  static lastSearch: string;

  products: Array<Product>;
  filteredProducts: Array<Product>;
  searchText: string;
  productHistory: Array<Product>;
  productCardRoute = 'card';

  pageSizeOptions = [10, 20, 30];
  paggingOptions: PaggingOptions = {
    pageNumber: 1,
    pageSize: 20
  };

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _productService: ProductService, 
    private _basketService: BasketService,
    private _productHistoryService: ProductHistoryService,
    private _dialog: MdDialog) {

      this.filteredProducts = new Array<Product>();

      _route.queryParams.subscribe(params => {
        this.searchText = params['search'];
        ListComponent.lastSearch = this.searchText;
        this.refresh();
      });
    }

  ngOnInit() {
    this.refresh();
  }
  
  refresh() {
    this._productService.get(this.paggingOptions)
      .subscribe(data => {
        console.log('data');
        console.log(data);

        this.products = data.items;

        if (!this.searchText) {
          this.filteredProducts = this.products;
        } else {
          this.filteredProducts = this.products.filter(p => p.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1);
        }
    
        this.productHistory = this._productHistoryService.getN(10);
        console.log('productHistory');
        console.log(this.productHistory);
      });
  }

  paggingChange(page: PageEvent) {
    this.paggingOptions.pageNumber = page.pageIndex;
    this.paggingOptions.pageSize = page.pageSize;
    this.refresh();
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
    let dialogRef = this._dialog.open(ProductCardDialogComponent);
    dialogRef.componentInstance.product = product;
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
