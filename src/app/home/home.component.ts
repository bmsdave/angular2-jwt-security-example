import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouterLink, RouteParams } from 'angular2/router';
import { Http, Headers } from 'angular2/http';
import { Router } from 'angular2/router';


@Component({
  selector: 'home',
  templateUrl: './views/home/home.component.html',
  directives: [CORE_DIRECTIVES, RouterLink]
})

export class HomeComponent {

  constructor(public router: Router, public http: Http) {

  }

}
