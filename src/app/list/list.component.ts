import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '@entities/product';
import { ProductService } from '@services/product.service';
import { BasketService } from '@services/basket.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products: Array<Product>;
  filteredProducts: Array<Product>;
  searchText: string;

  constructor(private _route: ActivatedRoute,
    private _productService: ProductService, 
    private _basketService: BasketService) {
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
  }

  putInBasket(product: Product) {
    console.log('putInBasket');
    console.log(product);

    this._basketService.putIn(product);
  }
}
