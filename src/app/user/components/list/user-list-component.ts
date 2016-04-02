import { Component, View, Inject } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../user-service';
import { IUser } from '../../../base/interfaces/interfaces';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Router, RouterLink } from 'angular2/router';

@Component({
    selector: 'user-list',
    template: require('./user-list.html'),
    providers: [UserService],
    directives: [CORE_DIRECTIVES, RouterLink]
})

export class UserList {

    title = 'users list';
    users:IUser[];

    constructor(@Inject(UserService) private UserService) {
        UserService.users.subscribe(users => this.users = users);
        UserService.fetchUsers();
    }
}
