import { Component, View, Inject } from 'angular2/core';
import { Observable } from 'rxjs/Observable';

import { IUser, UserService } from '../../user-service';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Router, RouterLink } from 'angular2/router';


@Component({
  selector: 'user-list',
  template: require('./user-list.html'),
  directives: [CORE_DIRECTIVES, RouterLink],
  providers: [UserService]
})
export class UserList {

  title = 'users list';
  users: any;

  constructor( @Inject(UserService) private UserService) {
    UserService.users.subscribe(users => this.users = users);
    UserService.fetchUsers();
  }
}
