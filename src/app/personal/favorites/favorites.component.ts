import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogConfig } from '@angular/material';

import { Product } from '@entities/product';
import { AsyncCommand } from '@lib/async-command';
import { Logger } from '@services/logger';
import { ProductCardDialogComponent } from '../../product-card-dialog/product-card-dialog.component';
import { FavoritesService } from '@services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites: Array<Product>;
  getFavoritesCommand: AsyncCommand<Array<Product>>;

  constructor(
    private _dialog: MdDialog,
    private _favoritesService: FavoritesService) {
    this.getFavoritesCommand = new AsyncCommand<Array<Product>>(
      () => new Observable((o) => o.next(this._favoritesService.get())),
      (r, e) => {
        Logger.log('getFavoritesCommand complete', r, e);
        this.favorites = r;
      });
   }

  ngOnInit() {
    this.getFavoritesCommand.execute();
  }

  deleteFav(fav: Product) {
    this._favoritesService.delete(fav);
    this.getFavoritesCommand.execute();
  }

  openProductCardDialog(product: Product) {
    let dialogRef = this._dialog.open(ProductCardDialogComponent);
    dialogRef.componentInstance.product = product;
  }
}
