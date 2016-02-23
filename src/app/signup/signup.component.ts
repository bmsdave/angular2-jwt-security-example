import { Component, View } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http } from 'angular2/http';
import { contentHeaders } from '../common/headers';

// let styles = require('./signup.component.css');
// let template = require('./signup.component.html');

@Component({
  selector: 'signup',
  templateUrl: './views/signup/signup.component.html'
})
// @View({
//   directives: [ RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
//   template: template,
//   styles: [ styles ]
// })
export class SignupComponent {
  constructor(public router: Router, public http: Http) {
  }

  signup(event, username, password) {
    event.preventDefault();
    let body = JSON.stringify({ username, password });
    this.http.post('http://localhost:3001/users', body, { headers: contentHeaders })
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

  login(event) {
    event.preventDefault();
    this.router.parent.navigateByUrl('/login');
  }

}
