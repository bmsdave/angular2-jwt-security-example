import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';
import {Http, Headers, Response} from 'angular2/http';
import {Router} from 'angular2/router';
import {IEMail} from '../../base/interfaces/interfaces';

@Injectable()
export class EMailService {

  public baseUrl = 'http://kl10ch.app-showcase.corelab.pro/api';
  public emails: Observable<IEMail[]>;
  public selectedEMail: Observable<IEMail>;

  private _emailsObserver: Observer<IEMail[]>;
  private _emails: IEMail[];
  private _selectedEMailObserver: Observer<IEMail>;

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

    return this.authHttp.get('', {
        headers: header
      })
      .map(res => res.json()).subscribe(
        (data) => {
          console.log(data);
          for ( var item of data ) {
            this._emails.push(item);
          }
        },
        err => console.log('getEMail.error: ', err),
        () => console.log('get email complete')
      );
  };

  fetchEMails() {
    this._emailsObserver.next(this._emails);
  }

  selectEmail(email) {
    this._selectedEMailObserver.next(email);
  }

  createEMail(email: IEMail) {
    this.authHttp.post('/api/email', JSON.stringify(email))
      .map(response => response.json()).subscribe(data => {
      this._emails.push(data);
      this._emailsObserver.next(this._emails);
    }, error => console.log('Could not create email.'));
  }

  updateEMail(email: IEMail) {
    this.http.put(`/directory/email/${email.id}`, JSON.stringify(email))
      .map(response => response.json()).subscribe(data => {
      this._emails.forEach((email, i) => {
        if (email.id === data.id) { this._emails[i] = data; }
      });

      this._emailsObserver.next(this._emails);
    }, error => console.log('Could not update email.'));
  }

  deleteEMail(emailId: number) {
    this.http.delete(`/directory/email/${emailId}`).subscribe(response => {
      this._emails.forEach((e, index) => {
        if (e.id === emailId) { this._emails.splice(index, 1); }
      });

      this._emailsObserver.next(this._emails);
    }, error => console.log('Could not delete email.'));
  }

}
