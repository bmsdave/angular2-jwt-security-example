import {Component, Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {AuthService} from '../../auth-service';
import { IUser } from '../../../base/interfaces/interfaces';
import { User } from '../../../user/user';

@Component({
  selector: 'login',
  template: require('./login.html'),
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class Login {

  me: User = new User({ username: null, is_auth: false });
  me2: User = new User({ username: null, is_auth: false });

  constructor(
    private AuthService: AuthService,
    private router: Router
    ) {
  }

  login() {
    console.log('inside login.ts function');
    this.AuthService.login(this.me);
  }

  fetchMe(){
      this.AuthService.fetchMe();
  }

  ngOnInit() {
    this.AuthService.me$.subscribe(me => this.me2 = new User(me));
    this.AuthService.fetchMe();
    if (this.me.is_auth) {
      this.router.navigate(['Base']);
      this.AuthService.fetchMe();
    }
  }
}
