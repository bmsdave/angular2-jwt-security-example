import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {AuthService} from '../../auth-service';

@Component({
  selector: 'login',
  template: require('./login.html'),
  providers: [AuthService]
})

export class Login {

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
    this.authService = authService;
  }

  login(username, password) {
    console.log('inside login.ts function');
    console.log(username);

    this.authService.login(username, password)
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
