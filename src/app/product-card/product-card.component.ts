import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '@entities/product';
import { ProductService } from '@services/product.service';
import { BasketService } from '@services/basket.service';
import { ListComponent } from '../list/list.component';
import { FavoritesService } from '@services/favorites.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  productId: number;
  product: Product = new Product();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService,
    public basketService: BasketService,
    public favoritesService: FavoritesService) {
    _route.queryParams.subscribe(params => {
      this.productId = params['id'];
      this.refresh();
    });
  }

  refresh() {
    this._productService.getById(this.productId)
    .subscribe(
      p => {
        this.product = p;
        this.product.isFavorite = this.favoritesService.contains(this.product);
      },
      error => {
        console.log('get product by id error');
        console.log(error);
      });
  }

  ngOnInit() {
  }

  back() {
    console.log('back. lastSearch:');
    console.log(ListComponent.lastSearch);

    if (ListComponent.lastSearch) {
      this._router.navigate(['/list'], { queryParams: {'search': ListComponent.lastSearch } });
    } else {
      this._router.navigate(['/list']);
    }
  }
}
