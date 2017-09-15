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

  hasCurrentUser() {
    return localStorage.getItem(this.currentUserKey) !== null;
  }

  setCurrentUser(user: any) {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(this.currentUserKey));
  }

  removeCurrentUser() {
    localStorage.removeItem(this.currentUserKey);
  }

  auth(user: any) {
    return this._http.post(environment.apiUrl + 'user', user);
  }
}
