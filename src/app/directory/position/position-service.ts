import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';
import {Http, Headers, Response} from 'angular2/http';
import {Router} from 'angular2/router';
import {IPosition} from '../../base/interfaces/interfaces';


@Injectable()
export class PositionService {

    public baseUrl = 'http://kl10ch.app-showcase.corelab.pro/api';
    public positions:Observable<IPosition[]>;
    public selectedPosition:Observable<IPosition>;

    private _positionsObserver:Observer<IPosition[]>;
    private _positions:IPosition[];
    private _selectedPositionObserver:Observer<IPosition>;

    constructor(private http:Http,
                private router:Router,
                private authHttp:AuthHttp) {
        this.getPositions();

        this.selectedPosition = new Observable(observer =>
            this._selectedPositionObserver = observer);

        this.positions = new Observable(observer =>
            this._positionsObserver = observer);
    }

    getPositions() {
        console.log('getpositions');

        var header = new Headers();
        header.append('Content-Type', 'application/json');

        return this.authHttp.get('', {
                headers: header
            })
            .map(res => res.json()).subscribe(
                (data) => {
                    console.log(data);
                    for (var item of data) {
                        this._positions.push(item);
                    }
                },
                err => console.log('getposition.error: ', err),
                () => console.log('get position complete')
            );
    };

    fetchPositions() {
        this._positionsObserver.next(this._positions);
    }

    selectPosition(position) {
        this._selectedPositionObserver.next(position);
    }

    createPosition(position:IPosition) {
        this.authHttp.post('/api/position', JSON.stringify(position))
            .map(response => response.json()).subscribe(data => {
            this._positions.push(data);
            this._positionsObserver.next(this._positions);
        }, error => console.log('Could not create position.'));
    }

    updatePosition(position:IPosition) {
        this.http.put(`/directory/position/${position.id}`, JSON.stringify(position))
            .map(response => response.json()).subscribe(data => {
            this._positions.forEach((position, i) => {
                if (position.id === data.id) {
                    this._positions[i] = data;
                }
            });

            this._positionsObserver.next(this._positions);
        }, error => console.log('Could not update position.'));
    }

    deletePosition(positionId:number) {
        this.http.delete(`/directory/position/${positionId}`).subscribe(response => {
            this._positions.forEach((e, index) => {
                if (e.id === positionId) {
                    this._positions.splice(index, 1);
                }
            });

            this._positionsObserver.next(this._positions);
        }, error => console.log('Could not delete position.'));
    }

}
