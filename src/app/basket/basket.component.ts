import { Component, OnInit } from '@angular/core';
import { Product } from '@entities/product';
import { BasketItem } from '@entities/basket-item';
import { BasketService } from '@services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basket: Array<BasketItem>;

  constructor(private _basketService: BasketService) { }

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
}
