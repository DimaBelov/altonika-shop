import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router, RouterModule } from '@angular/router';


import { Logger } from '@services/logger';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalComponent implements OnInit {

  user: any;
  constructor(
    private _userService: UserService,
    router: Router) {
    Logger.log('router', router);

    
  }

  ngOnInit() {
    this.user = this._userService.getCurrentUser();
      
  }




}
