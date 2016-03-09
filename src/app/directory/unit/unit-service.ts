import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';
import {Http, Headers, Response} from 'angular2/http';
import {Router} from 'angular2/router';
import {Unit} from '../../base/classes/unit';


// TODO: refactor setDefaultTask

@Injectable()
export class UnitService {

  public baseUrl = '/';
  public unit: Observable<Unit>;

  private _unitObserver: any;
  private _unit = Unit;

  constructor(
    private http: Http,
    private router: Router,
    private authHttp: AuthHttp
  ) {
    this.retrieveUnit();

    this.unit = new Observable(observer =>
      this._unit = observer);
  }

  retrieveUnit() {
    console.log('Retrieve Person');

    var header = new Headers();
    header.append('Content-Type', 'application/json');

    return this.authHttp.get('http://kl10ch.app-showcase.corelab.pro/api/directory/enterprise/', {
        headers: header
      })
      .map(res => res.json()).subscribe(
        data => {
          console.log(data);
          this._unit = new Unit(data);
        },
        err => console.log('getEnterprise.error: ', err),
        () => console.log('get enterprise complete')
      );
  };

}
