import { Component, View } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { Router } from 'angular2/router';


@Component({
  selector: 'home',
  templateUrl: './app/home/home.component.html',
})

export class HomeComponent {

  constructor(public router: Router, public http: Http) {

  }

  logout() {
    this.router.parent.navigateByUrl('/login');
  }

  getUserList() {
    this.router.parent.navigateByUrl('/users');
  }

}
