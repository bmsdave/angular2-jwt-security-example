import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';
import {Http, Headers, Response} from 'angular2/http';
import {Router} from 'angular2/router';
import {Position} from '../../base/classes/position';


// TODO: refactor setDefaultTask

@Injectable()
export class PositionService {

  public baseUrl = '/';
  public position: Observable<Position>;

  private _positionObserver: any;
  private _position: Position;

  constructor(
    private http: Http,
    private router: Router,
    private authHttp: AuthHttp
  ) {
    this.retrievePosition();

    this.position = new Observable(observer =>
      this._position= observer);
  }

  retrievePosition() {
    console.log('Retrieve Person');

    var header = new Headers();
    header.append('Content-Type', 'application/json');

    return this.authHttp.get('http://kl10ch.app-showcase.corelab.pro/api/directory/position/', {
        headers: header
      })
      .map(res => res.json()).subscribe(
        data => {
          console.log(data);
          this._position = new Position(data);
        },
        err => console.log('getPosition.error: ', err),
        () => console.log('get position complete')
      );
  };

}
