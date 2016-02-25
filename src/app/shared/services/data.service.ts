<<<<<<< HEAD
import {Http, Headers, Response} from 'angular2/http';
import {Router} from 'angular2/router';
import {Injectable} from 'angular2/core';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';
=======
import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
>>>>>>> a5362b709c549914bf717062ca6e178250309b66



@Injectable()
export class DataService {
  token: any;
  baseUrl: string = '/';
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private router: Router, private authHttp: AuthHttp) { }


  getCustomers() {
    return this.http.get(this.baseUrl + 'assets/customers.json')
      .map((res: Response) => res.json());
  }

  getUserList() {
    return this.authHttp.get(this.baseUrl + 'api/user/')
      .map((res: Response) => res.json());
  }

  getUserDetail(username) {
    return this.authHttp.get(this.baseUrl + 'api/user/' + username)
      .map((res: Response) => res.json());
  }

  getIndex() {
    return this.http.get(this.baseUrl + '/customers.json')
      .map((res: Response) => res.json());
  }

  getOrders() {
    return this.http.get(this.baseUrl + '/orders.json')
      .map((res: Response) => res.json());
  }

  handleError(error: any) {
    console.error(error);
  }


  saveJwt(jwt) {
    if (jwt) {
      localStorage.setItem('token', jwt);
      this.token = localStorage.getItem('token');
    }
  };
  deleteJwt() {
    localStorage.removeItem('token');
    this.token = localStorage.getItem('token');
  };
  isAuth() {
    var decoded: any;
    //decoded = this.jwtHelper(this.token);
    var date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    if (date === null) {
      return false;
    }
    console.log(date);
    return (date.valueOf() > (new Date().valueOf()));
  }
  login(username, password) {
    console.log('inside authService.login');
    console.log(username);
    console.log(password);
    var header = new Headers();
    header.append('Content-Type', 'application/json');

    return this.authHttp.post('http://kl10ch.app-showcase.corelab.pro/api/token/api-token-auth/', JSON.stringify({ username, password }), {
      headers: header
    })
      .map(res => res.json());
    /*.subscribe(
      data => {
      alert('logging in');
      this.saveJwt(data.auth_token);
      },
      err => console.log(err),
      () => this.router.navigate(['Home'])
    );*/
  }
  logout() {
    /*var jwt = localStorage.getItem('auth_token');
    var authHeader = new Headers();
    if (jwt) {
      authHeader.append('Authorization', jwt);
    }*/
    var token = localStorage.getItem('token');
    var header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', token);
    console.log(token);

    return this.authHttp.delete('http://localhost:3000/logout', {
      headers: header
    })
      .map(res => res.json());
    /*.subscribe(
      data => this.deleteJwt(),
      err => console.log(err),
      () => this.router.navigate(['Login'])
    );*/
  }
  isLoggedIn() {
    //_jwt === localStorage.getItem('auth_token');
  }
}
