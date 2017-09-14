import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  currentUserKey = 'currentUser';
  baseRoute = '/';
  loginRoute = '/login';

  constructor(private _http: HttpClient) { }

  public hasCurrentUser() {
    return localStorage.getItem(this.currentUserKey) !== null;
  }

  public setCurrentUser(user: any) {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  public getCurrentUser() {
    return JSON.parse(localStorage.getItem(this.currentUserKey));
  }

  public removeCurrentUser() {
    localStorage.removeItem(this.currentUserKey);
  }

  private auth(login: string, password: string) {
    // this._http.post('', JSON.stringify({login : login, password: password}));
  }
}
