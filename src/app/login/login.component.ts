import { Component, View } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { contentHeaders } from '../common/headers';

// let styles   = require('./login.component.css');
// let template = require('./login.component.html');

@Component({
  selector: 'login',
  templateUrl: './views/login/login.component.html'
})
// @View({
//   directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
//   template: template,
//   styles: [ styles ]
// })
export class LoginComponent {
  constructor(public router: Router, public http: Http) {
  }

  login(event, username, password) {
    event.preventDefault();
    let body = JSON.stringify({ username, password });
    this.http.post('http://kl10ch.app-showcase.corelab.pro/api/api-token-auth/', body, { headers: contentHeaders })
      .subscribe(
        response => {
          localStorage.setItem('jwt', response.json().id_token);
          this.router.parent.navigateByUrl('/home');
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  signup(event) {
    event.preventDefault();
    this.router.parent.navigateByUrl('/signup');
  }
}
