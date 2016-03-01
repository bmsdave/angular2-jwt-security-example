import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {AuthService} from '../../auth-service';
import { IUser } from '../../../base/interfaces/interfaces';
import { User } from '../../../user/user';

@Component({
  selector: 'login',
  template: require('./login.html'),
  providers: [AuthService],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class Login {

  me: User = new User({ username: null });

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
  }

  login() {
    console.log('inside login.ts function');
    this.authService.login(this.me);
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
