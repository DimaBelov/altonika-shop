import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MdSnackBar } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { UserService } from '@services/user.service';
import { User } from '@entities/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  authFailed: boolean;
  returnUrl: string;
  
  public user: User = new User();

  constructor(
    private _router: Router, 
    private _route: ActivatedRoute, 
    private _userService: UserService,
    private _snackBar: MdSnackBar,
    private _notificationsService: NotificationsService) { }

  ngOnInit() {
    let returnUrl = this._route.snapshot.queryParams['returnUrl'];
    this.returnUrl = returnUrl !== 'login' ? returnUrl || '/' : '/';
    document.onmouseup = () => this._snackBar.dismiss();
  }

  login() {
    console.log('user');
    console.log(this.user);
    this._userService.auth(this.user)
    .subscribe(user => {
      console.log('auth user');
      console.log(user);

      if (user !== null) {
        this.authFailed = false;
        this._userService.setCurrentUser(user);
        console.log('user authenticated');
        this._router.navigate([this.returnUrl]);
      } else {
        this.authFailed = true;
        console.log('user not found');
        // this._snackBar.open('Неправильный логин или пароль', null, {});
        // this._notificationsService.error('Неправильный логин или пароль');
      }
    });
  }
}
