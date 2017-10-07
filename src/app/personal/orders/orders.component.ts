import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';

import { Order } from '@entities/order';
import { OrderService } from '@services/order.service';
import { UserService } from '@services/user.service';
import { ProductCardDialogComponent } from '../../product-card-dialog/product-card-dialog.component';
import { Product } from '@entities/product';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  user: any;
  orders: Array<Order>;
  constructor(
    private _dialog: MdDialog,
    private _orderService: OrderService,
    private _userService: UserService) { }

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
  }

  openProductCardDialog(product: Product) {
    let dialogRef = this._dialog.open(ProductCardDialogComponent);
    dialogRef.componentInstance.product = product;
  }
}
