import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {AuthService} from '../../auth-service';
import { IUser } from '../../../base/interfaces/interfaces';

@Component({
  selector: 'login',
  template: require('./login.html'),
  providers: [AuthService]
})

export class Login {

  user: IUser;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
    this.authService = authService;
    this.user = {
      id: null,
      username: null,
      password: null,
      person: null
    };
  }

  login() {
    console.log('inside login.ts function');

    this.authService.login(this.user)
      .subscribe(
      res => {
        this.authService.saveJwt(res.token);
      },
      err => {
      },
      () => {
        this.authService.token = localStorage.getItem('token');
        this.router.navigate(['Base']);
      }
      );
  }
}
