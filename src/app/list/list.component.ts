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
import { Logger } from '@services/logger';
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
      this.onSearchChanged(params['search']);
      this.refreshCommand.execute();
    });
  }

  onSearchChanged(searchParam: string) {
    ListComponent.lastSearch =
      ListComponent.paggingOptions.searchText =
      searchParam;
    ListComponent.paggingOptions.pageNumber = 1;
  }

  refresh() {
    return this._productService.get(ListComponent.paggingOptions);
  }

  refreshComplete(result: PaggingResult<Product>, error: any) {
    if (error != null) {
      return;
    }

    this.paggingResult = result;
    this.filteredProducts = result.items;
    this.productHistory = this._productHistoryService.getN(10);
  }

  get paggingOptionsStatic() {
    return ListComponent.paggingOptions;
  }

  paggingChange() {
    this.refreshCommand.execute();
  }

  prevPage() {
    ListComponent.paggingOptions.pageNumber -= 1;
    this.paggingChange();
  }

  nextPage() {
    ListComponent.paggingOptions.pageNumber += 1;
    this.paggingChange();
  }

  firstPage() {
    ListComponent.paggingOptions.pageNumber = 1;
    this.paggingChange();
  }

  lastPage() {
    ListComponent.paggingOptions.pageNumber =
      this.paggingResult.pageNumbers.slice(
        this.paggingResult.pageNumbers.length - 1,
        this.paggingResult.pageNumbers.length)
      [0];
    this.paggingChange();
  }

  pageSizeChange() {
    ListComponent.paggingOptions.pageNumber = 1;
    this.paggingChange();
  }

  selectPage(n: number) {
    ListComponent.paggingOptions.pageNumber = n;
    this.paggingChange();
  }

  // scrollPageNumber() {
  //   let pageNumberElemet = document.getElementById('page' + ListComponent.paggingOptions.pageNumber);
  //   console.log('pageNumberElemet');
  //   console.log(pageNumberElemet);
  //   pageNumberElemet.scrollIntoView({ block: 'center', inline: 'center' });
  // }

  putInBasket(product: Product) {
    this._basketService.putIn(product);
  }

  openProductCard(product: Product) {
    this._router.navigate([this.productCardRoute], { queryParams: { 'id': product.id } });
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
