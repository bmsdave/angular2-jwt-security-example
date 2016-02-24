import { Component, View } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { contentHeaders } from '../common/headers';

// let styles   = require('./login.component.css');
// let template = require('./login.component.html');

@Component({
  selector: 'signup',
  template: `
    <div class="login jumbotron center-block">
      <h1>Login</h1>
      <form role="form" (submit)="signup($event, username.value, first_name.value, last_name.value, emails.value, positions.value, phones.value, password.value, password_confirmation.value)">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" #username class="form-control" id="username" placeholder="Username">
      </div>
      <div class="form-group">
        <label for="first_name">First Name</label>
        <input type="text" #first_name class="form-control" id="first_name" placeholder="Username">
      </div>
      <div class="form-group">
        <label for="last_name">Last Name</label>
        <input type="text" #last_name class="form-control" id="last_name" placeholder="Username">
      </div>
      // <div class="form-group">
      //   <label for="emails">emails</label>
      //   <input type="text" #emails class="form-control" id="emails" placeholder="emails">
      // </div>
      // <div class="form-group">
      //   <label for="positions">positions</label>
      //   <input type="text" #positions class="form-control" id="positions" placeholder="positions">
      // </div>
      // <div class="form-group">
      //   <label for="phones">phones</label>
      //   <input type="text" #phones class="form-control" id="phones" placeholder="phones">
      // </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" #password class="form-control" id="password" placeholder="Password">
      </div>
      <div class="form-group">
        <label for="password_confirmation">Password confirmation</label>
        <input type="password_confirmation" #password_confirmation class="form-control" id="password_confirmation" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
        <a href="/signup">Click here to Signup</a>
    </form>
    </div>
  `
})



export class SignupComponent {

  user: any = {
  "id": 1,
  "username": "cltanuki",
  "person": {
      "user": 1,
      "first_name": "Никита",
      "last_name": "Мошкалов",
      "mid_name": "Александрович",
      "date_of_birth": "1991-05-19",
      "sex": "m",
      "emails": [
        {
          "id": 10,
          "cat": "w",
          "body": "CLTanuki@gmail.com"
        }
      ],
      "positions": [],
      "phones": [
        {
          "id": 1,
          "cat": "h",
          "country_code": 8,
          "area_code": 911,
          "number": "0258529"
        }
      ]
    }
  }

  constructor(public router: Router, public http: Http) {
  }

  signup(event,
    username,
    first_name,
    last_name,
    emails,
    positions,
    phones,
    password,
    password_confirmation
   ) {
    event.preventDefault();
    let body = JSON.stringify({
      username,
      person: {
        first_name,
        last_name,
        emails: [],
        positions: [],
        phones: []
      },
      password,
      password_confirmation
    });
    this.http.post('http://kl10ch.app-showcase.corelab.pro/api/user/', body, { headers: contentHeaders })
      .subscribe(
      response => {
        console.log(response.json());
        localStorage.setItem('jwt', response.json().token);
        this.router.parent.navigateByUrl('/home');
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
      );
  }

  // signup(event) {
  //   event.preventDefault();
  //   this.router.parent.navigateByUrl('/signup');
  // }
}
