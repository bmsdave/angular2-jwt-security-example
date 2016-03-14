import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';
import {Http, Headers, Response} from 'angular2/http';
import {Router} from 'angular2/router';
import {User} from './user';


// TODO: refactor setDefaultTask

@Injectable()
export class UserService {


    public baseUrl = '/';
    public users: Observable<User>;
    public selectedUser: Observable<User>;

    private _usersObserver: Observer<User[]>;
    private _users:  User[] = [];
    private _selectedUserObserver: Observer<User>;

    constructor(
      private http: Http,
      private router: Router,
      private authHttp: AuthHttp
    ) {
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

      return this.authHttp.get('http://kl10ch.app-showcase.corelab.pro/api/user/', {
        headers: header
      })
      .map(res => res.json()).subscribe(
          data => {
            console.log(data);
            for ( var item in data ) {
              this._users.push(new User(item));
            }
          },
          err => console.log('getUser.error: ', err),
          () => console.log('get user complete')
      );
    };

    fetchUsers() {
      this._usersObserver.next(this._users);
    }

    selectUser(user) {
        this._selectedUserObserver.next(user);
    }

}
