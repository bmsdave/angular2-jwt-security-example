import { Component, View, Inject, Input } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../user-service';
import { IUser } from '../../../base/interfaces/interfaces';
import { User } from '../../user';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Router, RouterLink } from 'angular2/router';

@Component({
    selector: 'user-minimal',
    template: require('./user-minimal.html')
})

export class UserMinimal {
    @Input() me;

    user:User;

    constructor() {
    }


}
