import { Component, View, Inject } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../user-service';
import { IUser } from '../../../base/interfaces/interfaces';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Router, RouterLink } from 'angular2/router';

@Component({
    selector: 'user-detail',
    template: require('./user-detail.html'),
    providers: [UserService],
    directives: [CORE_DIRECTIVES, RouterLink]
})

export class UserDetail {

    title:string = 'User Detail';
    private user:IUser;

    constructor(@Inject(UserService) private UserService) {
        UserService.selectedUser.subscribe(selectedUser => this.user = selectedUser);
        //console.log('User' + this.user);
    }
}
