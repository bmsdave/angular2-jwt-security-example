import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {AuthService} from '../../auth-service';
import { IUser } from '../../../base/interfaces/interfaces';
import { User } from '../../../user/user';

@Component({
    selector: 'me',
    template: require('./me.html'),
    directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class Me {

    me:User;

    constructor(private authService:AuthService,
                private router:Router) {
        authService.me$.subscribe(me => this.me = new User(me));
    }
}
