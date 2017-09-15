import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  
  public user: object = {
    login: null,
    password: null
  };

  constructor(private _router: Router, private _route: ActivatedRoute, private _userService: UserService) { }

  ngOnInit() {
    let returnUrl = this._route.snapshot.queryParams['returnUrl'];
    this.returnUrl = returnUrl !== 'login' ? returnUrl || '/' : '/';
  }

  login() {
    console.log('user');
    console.log(this.user);
    this._userService.auth(this.user)
      .add(() => this._router.navigate([this.returnUrl]));
  }
}
