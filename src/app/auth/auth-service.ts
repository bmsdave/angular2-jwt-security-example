import {Http, Headers} from 'angular2/http';
import {Router} from 'angular2/router';
import {Injectable} from 'angular2/core';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';
import { IUser } from '../base/interfaces/interfaces';

@Injectable()
export class AuthService {
  token: any;
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(private http: Http, private router: Router, private authHttp: AuthHttp) { }

  saveJwt(jwt) {
    if (jwt) {
      localStorage.setItem('token', jwt);
      this.token = localStorage.getItem('token');
    }
  };

  getJwt() {
    return localStorage.getItem('token');
  };

  deleteJwt() {
    localStorage.removeItem('token');
    this.token = localStorage.getItem('token');
  };

  isAuth() {
    var token = localStorage.getItem('token');
    return !(token === null);
    // return true;
  };

  login(user: IUser) {
    console.log('inside authService.login');
    console.log(user);
    var header = new Headers();
    header.append('Content-Type', 'application/json');

    return this.authHttp.post('http://kl10ch.app-showcase.corelab.pro/api/token/api-token-auth/', JSON.stringify(user), {
      headers: header
    })
      .map(res => res.json());
  };


  signup(user: IUser) {
    console.log('inside authService.signup');
    console.log(user);
    var header = new Headers();
    header.append('Content-Type', 'application/json');

    return this.authHttp.post('http://kl10ch.app-showcase.corelab.pro/api/user/', JSON.stringify(user), {
      headers: header
    })
      .map(res => res.json());
  };

  logout() {
    this.deleteJwt();
  };

}
