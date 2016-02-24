/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './directives/router-active';
import {Home} from './home/home';

import { UserListComponent } from './user/user_list.component';
import { UserDetailComponent } from './user/user_detail.component';
// import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app-container',
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
})
@RouteConfig([
  { path: '/', component: Home, name: 'Index' },
  { path: '/home', component: Home, name: 'Home' },
  { path: '/users', name: 'UserList', component: UserListComponent },
  { path: '/user/:username', name: 'UserDetail', component: UserDetailComponent },
  { path: '/login', component: LoginComponent, name: 'Login' },
  { path: '/signup', component: SignupComponent, name: 'Signup' },
  // Async load a component using Webpack's require with es6-promise-loader
  { path: '/about', loader: () => require('./about/about')('About'), name: 'About' }
  // { path: '/**', redirectTo: ['Index'] }
])
export class App {
  angularclassLogo = '';
  name = 'KRONOS ERP';
  url = '';

  constructor() { }

  loggedIn() {
    return !!localStorage.getItem('jwt');
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    localStorage.removeItem('csrftoken');
    localStorage.removeItem('jwt');
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 * or via chat on Gitter at https://gitter.im/AngularClass/angular2-webpack-starter
 */
