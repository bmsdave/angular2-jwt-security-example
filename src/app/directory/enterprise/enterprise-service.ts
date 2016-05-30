import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';
import {Http, Headers, Response} from 'angular2/http';
import {Router} from 'angular2/router';
import {IEnterprise} from '../../base/interfaces/interfaces';


@Injectable()
export class EnterpriseService {

    public baseUrl = 'http://kl10ch.app-showcase.corelab.pro/api';
    public enterprises:Observable<IEnterprise[]>;
    public selectedEnterprise:Observable<IEnterprise>;

    private _enterprisesObserver:Observer<IEnterprise[]>;
    private _enterprises:IEnterprise[];
    private _selectedEnterpriseObserver:Observer<IEnterprise>;

    constructor(private http:Http,
                private router:Router,
                private authHttp:AuthHttp) {
        this.getEnterprises();

        this.selectedEnterprise = new Observable(observer =>
            this._selectedEnterpriseObserver = observer);

        this.enterprises = new Observable(observer =>
            this._enterprisesObserver = observer);
    }

    getEnterprises() {
        console.log('getenterprises');

        var header = new Headers();
        header.append('Content-Type', 'application/json');

        return this.authHttp.get('', {
                headers: header
            })
            .map(res => res.json()).subscribe(
                (data) => {
                    console.log(data);
                    for (var item of data) {
                        this._enterprises.push(item);
                    }
                },
                err => console.log('getenterprises.error: ', err),
                () => console.log('get enterprises complete')
            );
    };

    fetchEnterprises() {
        this._enterprisesObserver.next(this._enterprises);
    }

    selectEnterprise(enterprise) {
        this._selectedEnterpriseObserver.next(enterprise);
    }

    createEnterprise(enterprise:IEnterprise) {
        this.authHttp.post('/api/enterprise', JSON.stringify(enterprise))
            .map(response => response.json()).subscribe(data => {
            this._enterprises.push(data);
            this._enterprisesObserver.next(this._enterprises);
        }, error => console.log('Could not create enterprise.'));
    }

    updateEnterprise(enterprise:IEnterprise) {
        this.http.put(`/directory/enterprise/${enterprise.id}`, JSON.stringify(enterprise))
            .map(response => response.json()).subscribe(data => {
            this._enterprises.forEach((enterprise, i) => {
                if (enterprise.id === data.id) {
                    this._enterprises[i] = data;
                }
            });

            this._enterprisesObserver.next(this._enterprises);
        }, error => console.log('Could not update enterprise.'));
    }

    deleteEnterprise(enterpriseId:number) {
        this.http.delete(`/directory/enterprise/${enterpriseId}`).subscribe(response => {
            this._enterprises.forEach((e, index) => {
                if (e.id === enterpriseId) {
                    this._enterprises.splice(index, 1);
                }
            });

            this._enterprisesObserver.next(this._enterprises);
        }, error => console.log('Could not delete enterprise.'));
    }

}
