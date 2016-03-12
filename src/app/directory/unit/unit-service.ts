import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';
import {Http, Headers, Response} from 'angular2/http';
import {Router} from 'angular2/router';
import {IUnit} from '../../base/interfaces/interfaces';


@Injectable()
export class UnitService {

  public baseUrl = 'http://kl10ch.app-showcase.corelab.pro/api';
  public units: Observable<IUnit[]>;
  public selectedUnit: Observable<IUnit>;

  private _unitsObserver: Observer<IUnit[]>;
  private _units: IUnit[];
  private _selectedUnitObserver: Observer<IUnit>;

  constructor(
    private http: Http,
    private router: Router,
    private authHttp: AuthHttp
  ) {
    this.getUnits();

    this.selectedUnit = new Observable(observer =>
      this._selectedUnitObserver = observer);

    this.units = new Observable(observer =>
      this._unitsObserver = observer);
  }

  getUnits() {
    console.log('getunits');

    var header = new Headers();
    header.append('Content-Type', 'application/json');

    return this.authHttp.get('', {
        headers: header
      })
      .map(res => res.json()).subscribe(
        data => {
          console.log(data);
          for ( var item in data ) {
            this._units.push(item);
          }
        },
        err => console.log('getunit.error: ', err),
        () => console.log('get unit complete')
      );
  };

  fetchUnits() {
    this._unitsObserver.next(this._units);
  }

  selectUnit(unit) {
    this._selectedUnitObserver.next(unit);
  }

  createUnit(unit: IUnit) {
    this.authHttp.post('/api/unit', JSON.stringify(unit))
      .map(response => response.json()).subscribe(data => {
      this._units.push(data);
      this._unitsObserver.next(this._units);
    }, error => console.log('Could not create unit.'));
  }

  updateUnit(unit: IUnit) {
    this.http.put(`/directory/unit/${unit.id}`, JSON.stringify(unit))
      .map(response => response.json()).subscribe(data => {
      this._units.forEach((unit, i) => {
        if (unit.id === data.id) { this._units[i] = data; }
      });

      this._unitsObserver.next(this._units);
    }, error => console.log('Could not update unit.'));
  }

  deleteUnit(unitId: number) {
    this.http.delete(`/directory/unit/${unitId}`).subscribe(response => {
      this._units.forEach((e, index) => {
        if (e.id === unitId) { this._units.splice(index, 1); }
      });

      this._unitsObserver.next(this._units);
    }, error => console.log('Could not delete unit.'));
  }

}
