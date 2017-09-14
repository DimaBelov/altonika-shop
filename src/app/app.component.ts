import { Component, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { MdSidenav } from '@angular/material';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showSidenav = false;
  hasCurrentUser = false;

  baseRoute = '/';
  homeRoute = '/home';
  loginRoute = '/login';

  routes: any;

  @ViewChild(MdSidenav) sidenav: MdSidenav;

  public options = {
    position: ['bottom', 'right'],
    timeOut: 3000,
    lastOnBottom: true
  };

  constructor(private _router: Router, private _userService: UserService) {

    this.routes = _router.config;
    
    _router.events.subscribe(event => {

      // if (event instanceof NavigationStart) {
      //   console.log(_router);
      //   this.checkUser();
      // }

      if (event instanceof NavigationEnd) {
        console.log(_router);
        this.hasCurrentUser = this._userService.hasCurrentUser();
        this.checkUser();
        //this.checkRoute();
      }
    });
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

  // checkRoute() {
  //   if (this._router.url === this.baseRoute || this._router.url === this.homeRoute || this._router.url === this.loginRoute) {
  //     this.showSidenav = false;
  //   } else {
  //     this.showSidenav = true;
  //   }

  //   this.sidenav.opened = false;
  // }

  logout() {
    console.log('logout');
    this._userService.removeCurrentUser();
    this._router.navigate([this.loginRoute]);
  }
}
