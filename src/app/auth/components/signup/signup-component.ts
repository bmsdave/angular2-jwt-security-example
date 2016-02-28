import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';
import {AuthService} from '../../auth-service';
import { IUser, IPerson } from '../../../base/interfaces/interfaces';

@Component({
  selector: 'signup',
  template: require('./signup.html'),
  providers: [AuthService],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
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
      person:
      {
        user: null,
        first_name: null,
        last_name: null,
        mid_name: null,
        date_of_birth: null,
        sex: null,
        bio: null,
        emails:
        [
          { id: null, cat: null, body: null }
        ],
        positions:
        [
          {
            id: null,
            unit:
            {
              id: null,
              title: null,
              parent: null,
              corp:
              {
                id: null,
                title: null
              }
            },
            title: null,
            since: null,
            until: null
          }
        ],
        phones:
        [
          {
            id: null,
            cat: null,
            country_code: null,
            area_code: null,
            number: null
          }
        ]
      }
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
