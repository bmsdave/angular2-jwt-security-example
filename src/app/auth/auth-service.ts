import { Http, Headers } from 'angular2/http';
import { Router } from 'angular2/router';
import { Injectable } from 'angular2/core';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { IUser } from '../base/interfaces/interfaces';
import { User } from '../user/user';


@Injectable()
export class AuthService {

  public me: Observable<User>;

  public _meObserver: any;
  public _me: User = new User({id: null, username: null});

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private authHttp: AuthHttp, private router: Router) {


  this.me = new Observable(observer =>
      this._meObserver = observer).share();;

  }

  fetchMe() {
      console.log('fetchMe!!!! ', this._me);
      this._meObserver.next(this._me);
  }

  saveJwt(jwt) {
    if (jwt) {
      localStorage.setItem('token', jwt);
    }
  };

  getJwt() {
    return localStorage.getItem('token');
  };

  getJwtData() {
    var token = localStorage.getItem('token');

    console.log(
      this.jwtHelper.decodeToken(token),
      this.jwtHelper.getTokenExpirationDate(token),
      this.jwtHelper.isTokenExpired(token)
    );
  };

  deleteJwt() {
    localStorage.removeItem('token');
  };

  isAuth() {
    console.log('check isAuth');
    return this._me.is_auth;
  };

  login(user: User) {
    console.log('inside login');
    var header = new Headers();
    header.append('Content-Type', 'application/json');

    this.authHttp.post('http://kl10ch.app-showcase.corelab.pro/api/auth/signin/', JSON.stringify(user), {
      headers: header
    })
    .map(res => res.json()).subscribe(
    data => {
      if (data.token){
        this.saveJwt(data.token);
        this._me.is_auth = true;
        this.getMe();
        this.router.navigate(['Base']);
      }
    },
    err => console.log('login user error: ', err),
    () => console.log('login user complete')
    );
  };

  activate(activation_key: string) {
    console.log('inside authService.activate');
    var header = new Headers();
    header.append('Content-Type', 'application/json');

    return this.authHttp.get('http://kl10ch.app-showcase.corelab.pro/api/auth/activate/'.concat(activation_key), {
    headers: header
    }).map(res => res.text());

  }

  signup(user: User) {
    console.log('inside authService.signup');

    var header = new Headers();
    header.append('Content-Type', 'application/json');

    return this.authHttp.post('http://kl10ch.app-showcase.corelab.pro/api/auth/signup/', JSON.stringify(user), {
      headers: header
    })
      .map(res => res.json());
  };

  logout() {
    this.deleteJwt();
    this._me.is_auth = false;
  };

  getMe() {
    console.log('inside getMe');
    var token = localStorage.getItem('token');

    var username = this.jwtHelper.decodeToken(token).username;
    var header = new Headers();
    header.append('Content-Type', 'application/json');

    this.authHttp.get('http://kl10ch.app-showcase.corelab.pro/api/user/'.concat(username), {
          headers: header
    })
    .map(res => res.json()).subscribe(
    data => {
      this._me = new User(data);
      this._me.is_auth = true;
      this.fetchMe();
    },
    err => console.log('get user error: ', err),
    () => console.log('get user complete')
    );

  };

}
