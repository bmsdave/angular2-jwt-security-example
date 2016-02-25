import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {ViewEncapsulation} from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material/all';
import {AuthService} from './shared/services/auth.service';

import { Login } from './login/login.component';
import { Signup } from './signup/signup.component';
import { Home } from './home/home.component';
import { UserList } from './user/user_list.component';
import { UserDetail } from './user/user_detail.component';

@Component({
  selector: 'app-container',
<<<<<<< HEAD
  providers: [MATERIAL_PROVIDERS],
  directives: [...ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES],
  styles: [require('../assets/css/index.scss')],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.html')
=======
  providers: [ ...FORM_PROVIDERS ],
  directives: [ ...ROUTER_DIRECTIVES, RouterActive ],
  pipes: [],
  template: `
    <header>
      <md-toolbar class="md-theme-light">
        <ul class="hr">
          <md-button md-no-ink class="md-raised md-primary" *ngIf="!loggedIn()" [routerLink]="['Login']">Login</md-button>
          <md-button md-no-ink class="md-primary md-primary" *ngIf="loggedIn()" (click)="logout()">Logout</md-button>
          <md-button md-no-ink class="md-primary"><a [routerLink]="['Signup']">Signup</a></md-button>
          <md-button md-no-ink class="md-primary"><a [routerLink]="['Home']">Home</a></md-button>
          <md-button md-no-ink class="md-primary"><a [routerLink]="['UserList']">UserList</a></md-button>
        </ul>
      </md-toolbar>
    </header>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `
>>>>>>> a5362b709c549914bf717062ca6e178250309b66
})
@RouteConfig([
  { path: '/',                component: Home,       name: 'Index' },
  { path: '/home',            component: Home,       name: 'Home' },
  { path: '/users',           component: UserList,   name: 'UserList' },
  { path: '/user/:username',  component: UserDetail, name: 'UserDetail' },
  { path: '/login',           component: Login,      name: 'Login' },
  { path: '/signup',          component: Signup,     name: 'Signup' },
])
export class App {
<<<<<<< HEAD
=======
  angularclassLogo = '';
  name = 'KRONOS ERP';
  url = '';
>>>>>>> a5362b709c549914bf717062ca6e178250309b66

  constructor(
      private AuthService: AuthService,
      private router: Router
    ) {
    this.AuthService = AuthService;
    this.router = router;
  }

<<<<<<< HEAD
  isAuth() {
    return this.AuthService.isAuth();
=======
  loggedIn() {
    return !!localStorage.getItem('jwt');
>>>>>>> a5362b709c549914bf717062ca6e178250309b66
  }

  logout() {
    console.log('logout succes');
    this.AuthService.logout();
    this.router.navigate(['Login']);
  }

}
