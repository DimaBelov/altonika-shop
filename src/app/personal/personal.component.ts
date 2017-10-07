import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { OrderService } from '@services/order.service';
import { UserService } from '@services/user.service';
import { Order } from '@entities/order';
import { Product } from '@entities/product';
import { ProductCardDialogComponent } from '../product-card-dialog/product-card-dialog.component';
import { FavoritesService } from '@services/favorites.service';
import { AsyncCommand } from '@lib/async-command';
import { Logger } from '@services/logger';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalComponent implements OnInit {

  user: any;
  orders: Array<Order>;
  favorites: Array<Product>;
  getFavoritesCommand: AsyncCommand<Array<Product>>;

  constructor(
    private _orderService: OrderService,
    private _userService: UserService,
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
    this.user = this._userService.getCurrentUser();
    this._orderService.getByUser(this.user.id)
      .subscribe(
      data => {
        console.log('user orders');
        console.log(data);
        this.orders = data;
      },
      error => {
        console.log('get user orders error');
        console.log(error);
      });
      this.getFavoritesCommand.execute();
  }

  openProductCardDialog(product: Product) {
    let dialogRef = this._dialog.open(ProductCardDialogComponent);
    dialogRef.componentInstance.product = product;
  }

  deleteFav(fav: Product) {
    this._favoritesService.delete(fav);
    this.getFavoritesCommand.execute();
  }
}
