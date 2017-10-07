import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class WaitSpinner {
  static status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  static show() {
    this.status.next(true);
  }

  static hide() {
    this.status.next(false);
  }
}
