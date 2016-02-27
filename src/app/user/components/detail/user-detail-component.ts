import { Component, View, Inject } from 'angular2/core';
import { Observable } from 'rxjs/Observable';

import { IUser, UserService } from '../../user-service';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Router, RouterLink } from 'angular2/router';

@Component({
  selector: 'user-detail',
  template: require('./user-detail.html'),
  directives: [CORE_DIRECTIVES, RouterLink],
  providers: [UserService]
})
export class UserDetail {

  title: string = 'User Detail';

  private user: IUser;

  constructor( @Inject(UserService) private UserService) {
    // UserService.selectUser.subscribe(newSelectedUser => this.UserService = newSelectedUser)
    this.user = {
      id:1,
      username: 'Demo',
      person: null
    };
  }


}
