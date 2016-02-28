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
      person:
      {
        user: null,
        first_name: null,
        last_name: null,
        mid_name: null,
        date_of_birth: null,
        sex: null,
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
