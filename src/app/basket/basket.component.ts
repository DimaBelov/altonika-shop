import { Component, OnInit } from '@angular/core';
import { Product } from '@entities/product';
import { BasketItem } from '@entities/basket-item';
import { BasketService } from '@services/basket.service';
import { OrderService } from '@services/order.service';
import { MdDialog } from '@angular/material';
import { OrderSuccessDialogComponent } from './order-success-dialog/order-success-dialog.component';
import { ProductCardDialogComponent } from '../product-card-dialog/product-card-dialog.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basket: Array<BasketItem>;

  constructor(
    private _basketService: BasketService, 
    private _orderService: OrderService,
    private _dialog: MdDialog) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.basket = this._basketService.get();
  }

  dec(item: BasketItem) {
    this._basketService.dec(item);
    this.refresh();
  }

  inc(item: BasketItem) {
    this._basketService.inc(item);
    this.refresh();
  }

  remove(item: BasketItem) {
    this._basketService.remove(item);
    this.refresh();
  }

  clear() {
    this._basketService.clear();
    this.refresh();
  }

  buy() {
    console.log('buy');
    console.log(this.basket);
    this._orderService.add(this.basket)
      .subscribe(
        r => {
          console.log('on order add');
          console.log(r);
          this.clear();
          let dialogRef = this._dialog.open(OrderSuccessDialogComponent);
          dialogRef.componentInstance.orderId = <number>r;
        },
        error => {
          console.log('on order add error');
          console.log(error);
        });
  }

  openProductCardDialog(product: Product) {
    let dialogRef = this._dialog.open(ProductCardDialogComponent);
    dialogRef.componentInstance.product = product;
  }
}
