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

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
    authService.me$.subscribe(me => this.me = new User(me));
  }

  login() {  
    if (this.authService.login(this.me)){
      this.router.navigate(['Base']);
    } else {
      console.log('Login.login: FAILED');
    }
  }

  ngOnInit() {
    this.authService.me$.subscribe(me => this.me = new User(me));
    if (this.authService.getJwt()){
      this.authService.getMe();
      this.router.navigate(['Base']);
    };
  }
  
  
  
}
