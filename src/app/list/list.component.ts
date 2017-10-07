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
import { Paginator } from '@services/paginator';
import { FavoritesService } from '@services/favorites.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [
    // './list.component.css', 
    './new-list.component.css', 
    './product-history.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {

  static lastSearch: string;
  static lastPaggingOptions: PaggingOptions;

  paginator = new Paginator(
    (options) => this.refresh(options),
    (r, e) => this.refreshComplete(r, e));

  filteredProducts: Array<Product>;
  searchText: string;
  productHistory: Array<Product>;
  productCardRoute = 'card';

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _productService: ProductService,
    private _productHistoryService: ProductHistoryService,
    private _dialog: MdDialog,
    private _messenger: Messenger,
    public favoritesService: FavoritesService,
    public basketService: BasketService) {
    this.filteredProducts = new Array<Product>();
  }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      if (params['search'] === ListComponent.lastSearch && ListComponent.lastPaggingOptions != null) {
        Logger.log('set saved options', ListComponent.lastPaggingOptions);
        this.paginator.paggingOptions = ListComponent.lastPaggingOptions;
      } else {
        Logger.log('query params changed');
        ListComponent.lastSearch =
          this.paginator.paggingOptions.searchText =
          params['search'];
        this.paginator.paggingOptions.pageNumber = 1;
      }
      this.paginator.page();
    });
  }

  refresh(options: PaggingOptions) {
    ListComponent.lastPaggingOptions = options;
    return this._productService.get(options);
  }

  refreshComplete(result: PaggingResult<Product>, error: any) {
    this.productHistory = this._productHistoryService.getN(5);
    if (error != null) {
      return;
    }
    this.filteredProducts = result.items;
    this.filteredProducts.forEach(p => p.isFavorite = this.favoritesService.contains(p));  //TODO
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
}
