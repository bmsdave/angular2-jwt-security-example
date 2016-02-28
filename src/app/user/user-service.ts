import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';
import {Http, Headers, Response} from 'angular2/http';
import {Router} from 'angular2/router';
import {IUser} from '../base/interfaces/interfaces';


// TODO: refactor setDefaultTask

@Injectable()
export class UserService {


    public baseUrl = '/';
    public users: Observable<IUser>;
    public selectedUser: Observable<IUser>;

    private _usersObserver: any;
    private _users: IUser[];
    private _selectedUserObserver: any;

    constructor(
      private http: Http,
      private router: Router,
      private authHttp: AuthHttp
    ) {
        this.setDefaultTask();

        this.selectedUser = new Observable(observer =>
            this._selectedUserObserver = observer);

        this.users = new Observable(observer =>
            this._usersObserver = observer);
    }


    fetchUsers() {
      this._usersObserver.next(this._users);
    }

    selectUser(user) {
        this._selectedUserObserver.next(user);
    }

    private setDefaultTask() {
      this._users = [
      {
        'id': 13,
        'username': 'Demo',
        'person': null
      },
      {
        'id': 1,
        'username': 'CLTanuki',
        'person':
        {
          'user': 1,
          'first_name': 'Никита',
          'last_name': 'Мошкалов',
          'mid_name': 'Александрович',
          'date_of_birth': '1991-05-19',
          'sex': 'm',
          'bio': '',
          'emails':
          [
            { 'id': 10, 'cat': 'w', 'body': 'CLTanuki@gmail.com' }
          ],
          'positions':
          [
            {
              'id': 2,
              'unit':
              {
                'id': 1,
                'title': 'Main',
                'parent': null,
                'corp':
                {
                  'id': 1,
                  'title': 'KL10CH'
                }
              },
              'title': 'Soldier',
              'since': '1991-05-19',
              'until': null
            }
          ],
          'phones':
          [
            {
              'id': 1,
              'cat': 'h',
              'country_code': 8,
              'area_code': 911,
              'number': '0258529'
            }
          ]
        }
      },
      {
        'id': 19,
        'username': 'temp',
        'person': null
      },
      {
        'id': 20,
        'username':
        'tempo',
        'person': null
      }
        ];
    }

}
