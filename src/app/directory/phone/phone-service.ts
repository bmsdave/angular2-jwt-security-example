import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';
import {Http, Headers, Response} from 'angular2/http';
import {Router} from 'angular2/router';
import {IPhone} from '../../base/interfaces/interfaces';


@Injectable()
export class PhoneService {

  public baseUrl = 'http://kl10ch.app-showcase.corelab.pro/api';
  public phones: Observable<IPhone[]>;
  public selectedPhone: Observable<IPhone>;

  private _phonesObserver: Observer<IPhone[]>;
  private _phones: IPhone[];
  private _selectedPhoneObserver: Observer<IPhone>;

  constructor(
    private http: Http,
    private router: Router,
    private authHttp: AuthHttp
  ) {
    this.getPhones();

    this.selectedPhone = new Observable(observer =>
      this._selectedPhoneObserver = observer);

    this.phones = new Observable(observer =>
      this._phonesObserver = observer);
  }

  getPhones() {
    console.log('getphones');

    var header = new Headers();
    header.append('Content-Type', 'application/json');

    return this.authHttp.get('', {
        headers: header
      })
      .map(res => res.json()).subscribe(
        data => {
          console.log(data);
          for ( var item in data ) {
            this._phones.push(item);
          }
        },
        err => console.log('getphone.error: ', err),
        () => console.log('get phone complete')
      );
  };

  fetchPhones() {
    this._phonesObserver.next(this._phones);
  }

  selectPhone(phone) {
    this._selectedPhoneObserver.next(phone);
  }

  createPhone(phone: IPhone) {
    this.authHttp.post('/api/phone', JSON.stringify(phone))
      .map(response => response.json()).subscribe(data => {
      this._phones.push(data);
      this._phonesObserver.next(this._phones);
    }, error => console.log('Could not create phone.'));
  }

  updatePhone(phone: IPhone) {
    this.http.put(`/directory/phone/${phone.id}`, JSON.stringify(phone))
      .map(response => response.json()).subscribe(data => {
      this._phones.forEach((phone, i) => {
        if (phone.id === data.id) { this._phones[i] = data; }
      });

      this._phonesObserver.next(this._phones);
    }, error => console.log('Could not update phone.'));
  }

  deletePhone(phoneId: number) {
    this.http.delete(`/directory/phone/${phoneId}`).subscribe(response => {
      this._phones.forEach((e, index) => {
        if (e.id === phoneId) { this._phones.splice(index, 1); }
      });

      this._phonesObserver.next(this._phones);
    }, error => console.log('Could not delete phone.'));
  }

}
