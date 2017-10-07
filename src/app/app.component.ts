import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Route, Router, NavigationEnd } from '@angular/router';
import { MdSidenav } from '@angular/material';
import { UserService } from '@services/user.service';
import { BasketService } from '@services/basket.service';
import { ProductHistoryService } from '@services/product-history.service';
import { SearchHistoryService } from '@services/search-history.service';
import { ListComponent } from './list/list.component';
import { WaitSpinner } from '@services/wait-spinner';
import { Logger } from '@services/logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  title = 'app';
  hasCurrentUser = false;
  searchText: string;
  lastSearchKey = 'lastSearch';
  searchHistory: Array<string>; //= new Array<string>();

  baseUrl = '/';
  loginUrl = '/login';
  listUrl = '/list';
  routes: any;
  basketTotal: number;
  showSpinner = false;

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
    private _productHistoryService: ProductHistoryService,
    private _searchHistoryService: SearchHistoryService) {

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
    this._searchHistoryService.init();

    this.basketTotal = this._basketService.totalCount();
    this._basketService.onItemAdded.subscribe(total => {
      this.basketTotal = total;
    });

    let lastSearch = localStorage.getItem(this.lastSearchKey);
    if (lastSearch !== null) {
      this.searchText = lastSearch;
    }
    this.searchHistory = this._searchHistoryService.getN(10);

    WaitSpinner.status.subscribe(b => setTimeout(() => this.showSpinner = b, 0));
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
    localStorage.setItem(this.lastSearchKey, this.searchText);
    this._router.navigate([this.listUrl], { queryParams: { 'search': this.searchText } });
    this._searchHistoryService.add(this.searchText);
    this.searchHistory = this._searchHistoryService.getN(10);
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
