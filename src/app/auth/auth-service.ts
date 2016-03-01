import { Http, Headers } from 'angular2/http';
import { Router } from 'angular2/router';
import { Injectable } from 'angular2/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../base/interfaces/interfaces';
import { User } from '../user/user';


@Injectable()
export class AuthService {

  public me: Observable<User>;

  private _meObserver: any;
  private _me: User = new User({id: null, username: null});

  constructor(private http: Http, private authHttp: AuthHttp, private router: Router) {


  this.me = new Observable(observer =>
    this._meObserver = observer);

  }

  fetchMe() {
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

  deleteJwt() {
    localStorage.removeItem('token');
  };

  isAuth() {
    console.log('check isAuth');
    return this._me.is_auth;
  };

  login(user: User) {
    console.log('inside authService.login');
    console.log(user);
    this._me = user;
    var header = new Headers();
    header.append('Content-Type', 'application/json');

    this.authHttp.post('http://kl10ch.app-showcase.corelab.pro/api/auth/signin/', JSON.stringify(this._me), {
      headers: header
    })
    .map(res => res.json()).subscribe(
    data => {
    if (data.token)
      this.saveJwt(data.token);
      this._me.is_auth = true;
      this.getMe();
      console.log('this.me: ', this.me);
      this._me.is_auth = true;
    },
    err => console.log('getUser.error: ', err),
    () => console.log('get user complete')
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
    console.log(user);

    this._me = user;

    var header = new Headers();
    header.append('Content-Type', 'application/json');

    return this.authHttp.post('http://kl10ch.app-showcase.corelab.pro/api/auth/signup/', JSON.stringify(this._me), {
      headers: header
    })
      .map(res => res.json());
  };

  logout() {
    this.deleteJwt();
    this.me = null;
  };

  getMe() {
    console.log('inside getMe');

    var header = new Headers();
    header.append('Content-Type', 'application/json');

    this.authHttp.get('http://kl10ch.app-showcase.corelab.pro/api/user/'.concat(this._me.username), {
          headers: header
    })
    .map(res => res.json()).subscribe(
    data => {
      this._me = new User(data);
      this._me.is_auth = true;
      console.log('this.me: ', this.me);
    },
    err => console.log('getUser.error: ', err),
    () => console.log('get user complete')
    );

  };

}
