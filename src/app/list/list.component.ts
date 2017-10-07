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
import { Messenger } from '@services/messenger';
import { AsyncCommand } from '@lib/async-command';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {

  static lastSearch: string;

  static paggingOptions: PaggingOptions = {
    pageNumber: 1,
    pageSize: 12,
    searchText: ''
  };

  products: Array<Product>;
  filteredProducts: Array<Product>;
  searchText: string;
  productHistory: Array<Product>;
  productCardRoute = 'card';

  pageSizeOptions = [12, 24, 36, 48];
  paggingResult: PaggingResult<Product>;

  refreshCommand = new AsyncCommand<PaggingResult<Product>>(
    () => this.refresh(),
    (r, e) => this.refreshComplete(r, e)
  );

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _productService: ProductService, 
    private _basketService: BasketService,
    private _productHistoryService: ProductHistoryService,
    private _dialog: MdDialog,
    private _messenger: Messenger) {
      this.filteredProducts = new Array<Product>();
      this.paggingResult = new PaggingResult<Product>();
    }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      ListComponent.paggingOptions.searchText = params['search'];
      ListComponent.lastSearch = ListComponent.paggingOptions.searchText;
      ListComponent.paggingOptions.pageNumber = 1;
      this.refreshCommand.execute();
    });
  }

  refresh() {
    return this._productService.get(ListComponent.paggingOptions);
  }

  refreshComplete(result: PaggingResult<Product>, error: any) {
    if (error != null) {
      console.log('get products error');
      console.log(error);
      // this._messenger.onError(error, 'get products error');
      return;
    }    

    console.log('data');
    console.log(result);

    this.paggingResult = result;
    this.products = result.items;
    this.filteredProducts = this.products;

    this.productHistory = this._productHistoryService.getN(10);
    console.log('productHistory');
    console.log(this.productHistory);
  }

  get paggingOptionsStatic () {
    return ListComponent.paggingOptions;
  }

  paggingChange() {
    console.log('paggingChange');
    console.log(ListComponent.paggingOptions);

    this.refreshCommand.execute();
  }

  prevPage() {
    ListComponent.paggingOptions.pageNumber -= 1;
    //this.scrollPageNumber();
    this.paggingChange();
  }

  nextPage() {
    ListComponent.paggingOptions.pageNumber += 1;
    //this.scrollPageNumber();
    this.paggingChange();
  }

  firstPage() {
    ListComponent.paggingOptions.pageNumber = 1;
    //this.scrollPageNumber();
    this.paggingChange();
  }

  lastPage() {
    ListComponent.paggingOptions.pageNumber = 
      this.paggingResult.pageNumbers.slice(
        this.paggingResult.pageNumbers.length - 1, 
        this.paggingResult.pageNumbers.length)
      [0];
    //this.scrollPageNumber();
    this.paggingChange();
  }

  pageSizeChange () {
    ListComponent.paggingOptions.pageNumber = 1;
    //this.scrollPageNumber();
    this.paggingChange();
  }

  selectPage(n: number) {
    ListComponent.paggingOptions.pageNumber = n;
    //this.scrollPageNumber();
    this.paggingChange();
  }

  scrollPageNumber() {
    let pageNumberElemet = document.getElementById('page' + ListComponent.paggingOptions.pageNumber);
    console.log('pageNumberElemet');
    console.log(pageNumberElemet);
    pageNumberElemet.scrollIntoView({block: 'center', inline: 'center'});
  }

  putInBasket(product: Product) {
    console.log('putInBasket');
    console.log(product);

    this._basketService.putIn(product);
  }

  openProductCard(product: Product) {
    this._router.navigate([this.productCardRoute], {queryParams: {'id': product.id}});
    this._productHistoryService.add(product);
  }

  openProductCardDialog(product: Product) {
    let dialogRef = this._dialog.open(ProductCardDialogComponent);
    dialogRef.componentInstance.product = product;
    this._productHistoryService.add(product);
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
