import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';
import {Http, Headers, Response} from 'angular2/http';
import {Router} from 'angular2/router';
import {Enterprise} from '../../base/classes/enterprise';


// TODO: refactor setDefaultTask

@Injectable()
export class EnterpriseService {

  public baseUrl = '/';
  public enterprise: Observable<Enterprise>;

  private _enterpriseObserver: any;
  private _enterprise: Enterprise;

  constructor(
    private http: Http,
    private router: Router,
    private authHttp: AuthHttp
  ) {
    this.retrieveEnterprise();

    this.enterprise = new Observable(observer =>
      this._enterprise = observer);
  }

  retrieveEnterprise() {
    console.log('Retrieve Person');

    var header = new Headers();
    header.append('Content-Type', 'application/json');

    return this.authHttp.get('http://kl10ch.app-showcase.corelab.pro/api/directory/enterprise/', {
        headers: header
      })
      .map(res => res.json()).subscribe(
        data => {
          console.log(data);
          this._enterprise = new Enterprise(data);
        },
        err => console.log('getEnterprise.error: ', err),
        () => console.log('get enterprise complete')
      );
  };

}
