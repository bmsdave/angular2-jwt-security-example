import { Component, View, Inject } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../user-service';
import { User } from '../../user';
import { EmailComponent } from '../../../directory/email/detail/email-detail-component';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Router, RouterLink, RouteParams } from 'angular2/router';

@Component({
    selector: 'user-detail',
    template: require('./user-detail.html'),
    directives: [CORE_DIRECTIVES, RouterLink, EmailComponent]
})

export class UserDetail {

  my_test: string;
  title: string = 'User Detail';
  private user: User = new User({id: null, username: null, is_auth: false});

  constructor(
    private UserService:UserService,
    private _routeParams:RouteParams
  ) {
    UserService.selectedUser$.subscribe( user => this.user = new User(user));
  }
    
  ngOnInit() {
      let username = this._routeParams.get('username');
      this.UserService.selectedUser$.subscribe( user => this.user = new User(user));
      this.UserService.getSelectedUser(username);
  }
    
}
