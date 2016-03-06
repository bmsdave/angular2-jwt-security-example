import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';
import {Http, Headers, Response} from 'angular2/http';
import {Router} from 'angular2/router';
import {EMail} from '../../base/classes/email';


// TODO: refactor setDefaultTask

@Injectable()
export class EmailService {

  public baseUrl = '/';
  public email: Observable<EMail>;

  private _emailObserver: any;
  private _email = EMail;

  constructor(
    private http: Http,
    private router: Router,
    private authHttp: AuthHttp
  ) {
    this.retrieveEmails();

    this.email = new Observable(observer =>
      this._email = observer);
  }

  retrieveEmails() {
    console.log('Retrieve Email');

    var header = new Headers();
    header.append('Content-Type', 'application/json');

    return this.authHttp.get('http://kl10ch.app-showcase.corelab.pro/api/directory/email/', {
        headers: header
      })
      .map(res => res.json()).subscribe(
        data => {
          console.log(data);
          this._email= new EMail(data);
        },
        err => console.log('getEmail.error: ', err),
        () => console.log('get email complete')
      );
  };

}
