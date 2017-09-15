import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class UserService {
  currentUserKey = 'currentUser';
  baseRoute = '/';
  loginRoute = '/login';

  constructor(private _http: HttpClient) { }

  public hasCurrentUser() {
    return localStorage.getItem(this.currentUserKey) !== null;
  }

  public getCurrentUser() {
    return JSON.parse(localStorage.getItem(this.currentUserKey));
  }

  public removeCurrentUser() {
    localStorage.removeItem(this.currentUserKey);
  }

  auth(user: any) {
    return this._http.post(environment.apiUrl + 'user', user).subscribe(r => {
      console.log('auth user');
      console.log(r);

      if (r !== null) {
        localStorage.setItem(this.currentUserKey, JSON.stringify(user));  //r
        console.log('user authenticated');
        return true;
      } else {
        console.log('user not found');
        return false;
      }
    });
  }
}
