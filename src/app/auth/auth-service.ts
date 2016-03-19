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

  public me$: Observable<IUser>;

  private _meObserver: any;
  private _me: IUser = { id: null, username: null, is_auth: false };

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private authHttp: AuthHttp, private router: Router) {
    this.me$ = new Observable(observer => this._meObserver = observer).share();
  }

  next() {
    console.log("AuthService.next: ", this._me);
    this._meObserver.next(this._me);
  }

  // JWT logic
  saveJwt(jwt) {
    if (jwt) {
      console.log(jwt);
      localStorage.setItem('token', jwt);
      //this.token = localStorage.getItem('token');
    } else {
     console.log("AuthService.saveJwt: jwt is NULL");
    }
  };

  getJwt() {
    console.log("AuthService.getJwt: ", localStorage.getItem('token'));
    return localStorage.getItem('token');
  };

  getJwtData() {
    var token = localStorage.getItem('token');

    console.log(
      "AuthService.getJwtData: ",
      this.jwtHelper.decodeToken(token),
      this.jwtHelper.getTokenExpirationDate(token),
      this.jwtHelper.isTokenExpired(token)
    );
  };

  deleteJwt() {
    console.log("AuthService.deleteJwt: ", localStorage.getItem('token'));
    localStorage.removeItem('token');
  };

  // ME logic
  isAuth() {
    console.log('AuthService.isAuth: ', this._me.is_auth);
    return this._me.is_auth;
  };

  login(user: User) : boolean{
    console.log('AuthService.login: ', this._me);
    var header = new Headers();
    header.append('Content-Type', 'application/json');
    this.authHttp.post('http://kl10ch.app-showcase.corelab.pro/api/auth/signin/',
      JSON.stringify({username: user.username, password: user.password}),
      {headers: header})
      .map(res => res.json())
      .subscribe(
        data => {
          if (data.token){
            this.saveJwt(data.token);
            user.is_auth = true;
            this._me = {id: user.id, username: user.username, is_auth: user.is_auth};
            this._meObserver.next(this._me);
            console.log('AuthService.login: ', this._me);
            this.router.navigate(['Base']);
          }
        },
        err => console.log('login user error: ', err),
        () => console.log('Authentication Complete')
      );

    return user.is_auth;
  };

  activate(activation_key: string) {
    console.log('AuthService.activate: ', activation_key);
    var header = new Headers();
    header.append('Content-Type', 'application/json');
    return this.authHttp
      .get('http://kl10ch.app-showcase.corelab.pro/api/auth/activate/'.concat(activation_key), {
        headers: header
      }).map(res => res.text());
  }

  signup(user: User) : boolean {
    console.log('AuthService.signup: ', user);
    var header = new Headers();
    header.append('Content-Type', 'application/json');
    user.is_auth = true;
    this._me = {id: user.id, username: user.username, is_auth: user.is_auth};
    this._meObserver.next(this._me);
    return true;
  };

  logout() {
    console.log('AuthService.logout: ');
    this.deleteJwt();
    this._me = {id: null, username: null, is_auth: false};
    this._meObserver.next(this._me);
  };

  getMe() {
    console.log('AuthService.getMe: ');

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
      this.next();
    },
    err => console.log('get user error: ', err),
    () => console.log('AuthService.getMe is DONE')
    );
  };
}
