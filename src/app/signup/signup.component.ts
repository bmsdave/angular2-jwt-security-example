import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'signup',
  template: require('./signup.component.html'),
})

export class Signup {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService = authService;
  }

  signup() {
  }

}
