import {Http, Headers} from 'angular2/http';
import {Router} from 'angular2/router';
import {Injectable} from 'angular2/core';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';


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
    console.log(token);
    return !(token === null);
  }
  login(username, password) {
    console.log('inside authService.login');
    console.log(username);
    console.log(password);
    var header = new Headers();
    header.append('Content-Type', 'application/json');

    return this.authHttp.post('http://kl10ch.app-showcase.corelab.pro/api/token/api-token-auth/', JSON.stringify({username, password}), {
      headers: header
    })
    .map(res => res.json());
  }
  logout() {
    this.deleteJwt();
  }
  isLoggedIn() {
  }
}
