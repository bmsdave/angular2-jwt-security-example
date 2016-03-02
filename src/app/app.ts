import {Component, View, Inject} from 'angular2/core';
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

import { PersonComponent } from './directory/person/person-component';

import { Activation } from './auth/components/activation/activation-component';
import { UserList } from './user/components/list/user-list-component';
import { UserDetail } from './user/components/detail/user-detail-component';
import { UserMinimal } from './user/components/minimal/user-minimal-component';

@Component({
  selector: 'app-container',
  providers: [MATERIAL_PROVIDERS]
})
@RouteConfig([
  { path: '/',                          component: Base,       name: 'Base' },
  { path: '/users',                     component: UserList,   name: 'UserList' },
  { path: '/user/:username',            component: UserDetail, name: 'UserDetail' },

  { path: '/person',                    component: PersonComponent,     name: 'Person' },

  { path: '/me',                        component: Me,         name: 'Me' },
  { path: '/login',                     component: Login,      name: 'Login' },
  { path: '/logout',                    component: Logout,     name: 'Logout' },
  { path: '/signup',                    component: Signup,     name: 'Signup' },
  { path: '/activate/:activation_key',  component: Activation, name: 'Activation' },
])
@View({
  directives: [
    ...ROUTER_DIRECTIVES,
    MATERIAL_DIRECTIVES,
    Login,
    Signup,
    UserMinimal
    ],
  styles: [require('../assets/css/index.scss')],
  template: require('./app.html'),
  encapsulation: ViewEncapsulation.None
})
export class App {

  angularclassLogo = '';
  name = 'KRONOS ERP';
  url = '';

  me: User = new User({ username: 'UNKNOWN' });
  constructor(
      @Inject(AuthService) private AuthService,
      public router: Router,
      public sidenav: SidenavService
    ) {
  }

  ngOnInit() {
    this.AuthService.me.subscribe(me => this.me = me);
    this.AuthService.fetchMe();
    console.log('ngOnInit app');
    if (this.AuthService.getJwt()) {
      this.AuthService.getMe();
    };
  }

  isAuth() {
    var token = localStorage.getItem('token');
    return token != null;
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
