import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {ViewEncapsulation} from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material/all';

import {AuthService} from './auth/auth-service';

import { Base } from './base/base-component';
import { Login } from './auth/components/login/login-component';
import { Signup } from './auth/components/signup/signup-component';
import { UserList } from './user/components/list/user-list-component';
import { UserDetail } from './user/components/detail/user-detail-component';

@Component({
  selector: 'app-container',
  providers: [MATERIAL_PROVIDERS],
  directives: [...ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES],
  styles: [require('../assets/css/index.scss')],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.html')
})
@RouteConfig([
  { path: '/',                component: Base,       name: 'Base' },
  { path: '/users',           component: UserList,   name: 'UserList' },
  { path: '/user/:username',  component: UserDetail, name: 'UserDetail' },
  { path: '/login',           component: Login,      name: 'Login' },
  { path: '/signup',          component: Signup,     name: 'Signup' },
])
export class App {

  angularclassLogo = '';
  name = 'KRONOS ERP';
  url = '';

  constructor(
      private AuthService: AuthService,
      private router: Router
    ) {
    this.AuthService = AuthService;
    this.router = router;
  }

  isAuth() {
    return this.AuthService.isAuth();
  }

  logout() {
    console.log('logout succes');
    this.AuthService.logout();
    this.router.navigate(['Login']);
  }

}
