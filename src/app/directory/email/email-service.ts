import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';
import {Http, Headers, Response} from 'angular2/http';
import {Router} from 'angular2/router';
import {EMail} from '../../base/classes/email';

@Injectable()
export class EMailService {

  public baseUrl = '/';
  public emails: Observable<EMail>;
  public selectedEMail: Observable<EMail>;

  private _emailsObserver: any;
  private _emails: EMail[] = [];
  private _selectedEMailObserver: any;

  constructor(
    private http: Http,
    private router: Router,
    private authHttp: AuthHttp
  ) {
    this.getEMails();

    this.selectedEMail = new Observable(observer =>
      this._selectedEMailObserver = observer);

    this.emails = new Observable(observer =>
      this._emailsObserver = observer);
  }

  getEMails() {
    console.log('getEMails');

    var header = new Headers();
    header.append('Content-Type', 'application/json');

    return this.authHttp.get('http://kl10ch.app-showcase.corelab.pro/api/directory/email/', {
        headers: header
      })
      .map(res => res.json()).subscribe(
        data => {
          console.log(data);
          for ( var item in data ) {
            this._emails.push(new EMail(item));
          }
        },
        err => console.log('getUser.error: ', err),
        () => console.log('get user complete')
      );
  };

  fetchEMails() {
    this._emailsObserver.next(this._emails);
  }

  selectEmail(email) {
    this._selectedEMailObserver.next(email);
  }

}
