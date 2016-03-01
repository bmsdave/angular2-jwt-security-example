import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {ViewEncapsulation} from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS, Media, SidenavService} from 'ng2-material/all';

import {AuthService} from './auth/auth-service';

import { Base } from './base/base-component';
import { User } from './user/user';

import { Login } from './auth/components/login/login-component';
import { Logout } from './auth/components/logout/logout-component';
import { Signup } from './auth/components/signup/signup-component';
import { Me } from './auth/components/me/me-component';

import { Activation } from './auth/components/activation/activation-component';
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
  { path: '/',                          component: Base,       name: 'Base' },
  { path: '/users',                     component: UserList,   name: 'UserList' },
  { path: '/user/:username',            component: UserDetail, name: 'UserDetail' },

  { path: '/me',                        component: Me,         name: 'Me' },
  { path: '/login',                     component: Login,      name: 'Login' },
  { path: '/logout',                    component: Logout,     name: 'Logout' },
  { path: '/signup',                    component: Signup,     name: 'Signup' },
  { path: '/activate/:activation_key',  component: Activation, name: 'Activation' },
])
export class App {

  angularclassLogo = '';
  name = 'KRONOS ERP';
  url = '';
  me: User;

  constructor(
      private AuthService: AuthService,
      private router: Router,
      public sidenav: SidenavService
    ) {
    AuthService.me.subscribe(me => this.me = me);
    AuthService.fetchMe();
  }

  ngOnInit() {
    if (this.AuthService.getJwt()) {
      this.AuthService.getMe();
    }
  }

  isAuth() {
    return this.AuthService.isAuth();
  }

  logout() {
    console.log('logout succes');
    this.AuthService.logout();
    this.router.navigate(['Login']);
  }

  hasMedia(breakSize: string): boolean {
    return Media.hasMedia(breakSize);
  }

  open(name: string) {
    this.sidenav.show(name);
  }

  close(name: string) {
    this.sidenav.hide(name);
  }

}
