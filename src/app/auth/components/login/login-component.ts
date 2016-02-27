import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'login',
  template: require('./login.component.html'),
  providers: [AuthService]
})
export class Login {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService = authService;
    this.router = router;
  }

  login(username, password) {
    this.authService.login(username, password)
      .subscribe(
        res => {
          this.authService.saveJwt(res.token);
        },
        err => {
          console.log('ERROR: auth->Login.login()')
        },
        () => {
          this.authService.token = localStorage.getItem('token');
          this.router.navigate(['Home']);
        }
      );
  }
}
