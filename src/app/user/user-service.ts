import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';
import {Http, Headers, Response} from 'angular2/http';
import {Router} from 'angular2/router';
import { IUser } from '../base/interfaces/interfaces';
import {User} from './user';


// TODO: refactor setDefaultTask

@Injectable()
export class UserService {


    public baseUrl = '/';
    public users:Observable<IUser>;
    public selectedUser:Observable<IUser>;

    private _usersObserver:Observer<IUser[]>;
    private _users:IUser[] = [];
    private _selectedUserObserver:Observer<IUser>;

    constructor(private http:Http,
                private router:Router,
                private authHttp:AuthHttp) {
        this.getUsers();

        this.selectedUser = new Observable(observer =>
            this._selectedUserObserver = observer);

        this.users = new Observable(observer =>
            this._usersObserver = observer);
    }


    getUsers() {
        console.log('getUsers');

        var header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'JWT '.concat(localStorage.getItem('token')));

        return this.authHttp.get('http://kl10ch.app-showcase.corelab.pro/api/user/', {
                headers: header
            })
            .map(res => res.json())
            .subscribe(
                (data) => {
                    console.log(data);
                    for (var item of data) {
                        this._users.push(item);
                    }
                },
                err => console.log('getUsers.error: ', err),
                () => console.log('get users complete')
            );
    };

    fetchUsers() {
        this._usersObserver.next(this._users);
    }

    selectUser(user) {
        console.log(user);
        this._selectedUserObserver.next(user);
    }

}
