import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';
import {AuthService} from '../../auth-service';
import { User } from '../../../user/user';
import { Person } from '../../../base/classes/person';
import { IPerson, IEMail, IPhone, IPosition } from '../../../base/interfaces/interfaces';


@Component({
    selector: 'signup',
    template: require('./signup.html'),
    directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class Signup {

    me:User = new User({username: null, is_auth: false});
    person:IPerson = {
        id: null,
        user: null,
        first_name: null,
        last_name: null,
        mid_name: null,
        date_of_birth: null,
        sex: null,
        bio: null
    };
    email:IEMail = {body: null};


    constructor(private authService:AuthService,
                private router:Router) {
        authService.me$.subscribe(me => this.me = new User(me));
    }

    signup() {
        this.me.person = this.person;
        this.me.person.emails = [];

        this.me.person.emails.push(this.email);

        console.log('Signup.signup: ', this.me);

        this.authService.signup(this.me);
    }

    ngOnInit() {
        this.authService.me$.subscribe(me => this.me = new User(me));
        if (this.authService.getJwt()) {
            this.authService.getMe();
            this.router.navigate(['Base']);
        }
        ;
    }

}
