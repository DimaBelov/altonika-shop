import { Component, OnInit } from '@angular/core';

import { OrderService } from '@services/order.service';
import { UserService } from '@services/user.service';
import { Order } from '@entities/order';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  user: any;
  orders: Array<Order>;

  constructor(
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
      }
    );
  }

}
