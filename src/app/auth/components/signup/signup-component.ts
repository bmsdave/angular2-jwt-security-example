import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {AuthService} from '../../auth-service';
import { IUser, IPerson } from '../../../base/interfaces/interfaces';

@Component({
  selector: 'signup',
  template: require('./signup.html'),
  providers: [AuthService]
})

export class Signup {

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
      person: null,
    };
  }

  signup() {
    console.log('inside sign.ts function');

    this.authService.signup(this.user)
      .subscribe(
      res => {
        // this.authService.saveJwt(res.token);
        // если вдруг при регистрации будет сразу же отдаваться токен, то раскомментировать
        // и закомментировать реврайт на логин.
        // пока после регистрации человек должен еще авторизоваться.
        this.router.navigate(['Login']);
      },
      err => {
      },
      () => {
        this.authService.token = localStorage.getItem('token');
        this.router.navigate(['Login']);
      }
      );
  }
}
