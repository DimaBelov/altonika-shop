import { Component, OnInit, ViewChild } from '@angular/core';
import { Route, Router, NavigationEnd } from '@angular/router';
import { MdSidenav } from '@angular/material';
import { UserService } from '@services/user.service';
import { BasketService } from '@services/basket.service';
import { ProductHistoryService } from '@services/product-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  hasCurrentUser = false;
  searchText: string;

  baseUrl = '/';
  loginUrl = '/login';
  listUrl = '/list';
  routes: any;
  basketTotal: number;

  @ViewChild(MdSidenav) sidenav: MdSidenav;

  public options = {
    position: ['bottom', 'right'],
    timeOut: 3000,
    lastOnBottom: true
  };

  constructor(
    private _router: Router, 
    private _userService: UserService, 
    private _basketService: BasketService, 
    private _productHistoryService: ProductHistoryService) {

    this.routes = _router.config;
    
    _router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(_router);
        this.hasCurrentUser = this._userService.hasCurrentUser();
        this.checkUser();
      }
    });
  }

  ngOnInit() {
    this._basketService.init();
    this._productHistoryService.init();
    
    this.basketTotal = this._basketService.totalCount();
    this._basketService.onItemAdded.subscribe(total => {
      this.basketTotal = total;
    });
  }

  checkUser() {
    this.hasCurrentUser = this._userService.hasCurrentUser();
    if (!this.hasCurrentUser) {
      this._router.navigate([this.loginUrl]);
    }

    if (this.hasCurrentUser && this._router.url === this.loginUrl) {
      this._router.navigate([this.baseUrl]);
    }
  }

  search() {
    this._router.navigate([this.listUrl], {queryParams: {'search': this.searchText}});
  }

  logout() {
    console.log('logout');
    this._userService.removeCurrentUser();
    this._router.navigate([this.loginUrl]);
  }

  goto(route: string) {
    this._router.navigate([route]);
  }
}
