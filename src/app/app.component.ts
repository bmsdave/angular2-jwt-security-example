import { Component } from 'angular2/core';

import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';

import { UserListComponent } from './user/user_list.component';
import { UserDetailComponent } from './user/user_detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@Component({
	selector: 'app-container',
  templateUrl: './views/app.component.html',
	directives: [ROUTER_DIRECTIVES],
})

@RouteConfig([

	{ path: '/users', as: 'UserList', component: UserListComponent },
	{ path: '/user/:id', as: 'UserDetail', component: UserDetailComponent },
	{ path: '/', redirectTo: ['/Home'], useAsDefault: true  },
	{ path: '/home', component: HomeComponent, as: 'Home' },
	{ path: '/login', component: LoginComponent, as: 'Login' },
	{ path: '/signup', component: SignupComponent, as: 'Signup' }
])
export class AppComponent {

	constructor() {

	}

}
