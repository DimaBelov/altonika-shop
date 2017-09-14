import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { MdSidenav } from '@angular/material';
import { UserService } from '@services/user.service';
import { BasketService } from '@services/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  hasCurrentUser = false;
  searchText: string;

  baseRoute = '/';
  loginRoute = '/login';
  listRoute = '/list';

  routes: any;

  @ViewChild(MdSidenav) sidenav: MdSidenav;

  public options = {
    position: ['bottom', 'right'],
    timeOut: 3000,
    lastOnBottom: true
  };

  constructor(private _router: Router, private _userService: UserService, private _basketService: BasketService) {

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
  }

  checkUser() {
    this.hasCurrentUser = this._userService.hasCurrentUser();
    if (!this.hasCurrentUser) {
      this._router.navigate([this.loginRoute]);
    }

    if (this.hasCurrentUser && this._router.url === this.loginRoute) {
      this._router.navigate([this.baseRoute]);
    }
  }

  search() {
    if (!this.searchText) {
      return;
    }
    this._router.navigate([this.listRoute], {queryParams: {'search': this.searchText}});
  }

  logout() {
    console.log('logout');
    this._userService.removeCurrentUser();
    this._router.navigate([this.loginRoute]);
  }
}
