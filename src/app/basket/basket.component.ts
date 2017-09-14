import { Component, OnInit } from '@angular/core';
import { Product } from '@entities/product';
import { BasketService } from '@services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basket: Array<Product>;

  constructor(private _basketService: BasketService) { }

  ngOnInit() {
    this.basket = this._basketService.get();
  }

}
