import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';
import {Http, Headers, Response} from 'angular2/http';
import {Router} from 'angular2/router';
import {Phone} from '../../base/classes/phone';


// TODO: refactor setDefaultTask

@Injectable()
export class PhoneService {

  public baseUrl = '/';
  public phone: Observable<Phone>;

  private _phoneObserver: any;
  private _phone: Phone;

  constructor(
    private http: Http,
    private router: Router,
    private authHttp: AuthHttp
  ) {
    this.retrievePhones();

    this.phone = new Observable(observer =>
      this._phone = observer);
  }

  retrievePhones() {
    console.log('Retrieve Phones');

    var header = new Headers();
    header.append('Content-Type', 'application/json');

    return this.authHttp.get('http://kl10ch.app-showcase.corelab.pro/api/directory/phones/', {
        headers: header
      })
      .map(res => res.json()).subscribe(
        data => {
          console.log(data);
          this._phone = new Phone(data);
        },
        err => console.log('getPhone.error: ', err),
        () => console.log('get phone complete')
      );
  };

}
