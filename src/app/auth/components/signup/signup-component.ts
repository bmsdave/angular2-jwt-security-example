import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';
import {AuthService} from '../../auth-service';
import { User } from '../../../user/user';

@Component({
  selector: 'signup',
  template: require('./signup.html'),
  providers: [AuthService],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class Signup {

  me: User = new User({ username: null });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    authService.me.subscribe(me => this.me = me);
  }

  signup() {
    console.log('inside sign.ts function');
    this.authService.signup(this.me);
  }

  ngOnInit() {
    this.authService.me.subscribe(me => this.me = me);
    this.authService.fetchMe();
    if (this.me.is_auth) {
      this.router.navigate(['Base']);
      this.authService.fetchMe();
    }
  }

}
