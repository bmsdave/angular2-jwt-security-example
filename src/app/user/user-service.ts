import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';
import {Http, Headers, Response} from 'angular2/http';
import {Router} from 'angular2/router';

export interface IEmail {
  id: number;
  cat: string;
  body: string;
}

export interface ICorp {
  id: number;
  title: string;
}

export interface IUnit {
  id: number;
  title: string;
  parent?: any;
  corp: ICorp;
}

export interface IPosition {
  id: number;
  unit: IUnit;
  title: string;
  since: string;
  until?: any;
}

export interface IPhone {
  id: number;
  cat: string;
  country_code: number;
  area_code: number;
  number: string;
}

export interface IPerson {
  user: number;
  first_name: string;
  last_name: string;
  mid_name: string;
  date_of_birth: string;
  sex: string;
  emails: IEmail[];
  positions: IPosition[];
  phones: IPhone[];
}

export interface IUser {
  id: number;
  username: string;
  password?: string;
  person: IPerson;
}


@Injectable()
export class UserService {


    public baseUrl = '/';
    public users: Observable<IUser>;
    private _usersObserver: any;
    private _users: IUser[];

    public selectedUser: Observable<IUser>;
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


    fetchUsers(){
      this._usersObserver.next(this._users);
    }

    selectUser(user) {
        this._selectedUserObserver.next(user);
    }

    // fetchUsers() {
    // return this.authHttp.get(this.baseUrl + 'api/user/')
    //   .map((res: Response) => res.json());
    // }

    private setDefaultTask() {
        this._users = [
        {
          "id": 13,
          "username": "Demo",
          "person": null
        },
        {
          "id": 1,
          "username": "CLTanuki",
          "person":
            {
              "user": 1,
              "first_name": "Никита",
              "last_name": "Мошкалов",
              "mid_name": "Александрович",
              "date_of_birth": "1991-05-19",
              "sex": "m",
              "emails":
                [
                  { "id": 10, "cat": "w", "body": "CLTanuki@gmail.com" }
                ],
              "positions":
                [
                  {
                    "id": 2,
                    "unit":
                      {
                        "id": 1,
                        "title": "Main",
                        "parent": null,
                        "corp":
                          {
                            "id": 1,
                            "title": "KL10CH"
                          }
                      },
                    "title": "Soldier",
                    "since": "1991-05-19",
                    "until": null
                  }
                ],
                "phones":
                  [
                    {
                      "id": 1,
                      "cat": "h",
                      "country_code": 8,
                      "area_code": 911,
                      "number": "0258529"
                    }
                  ]
              }
          },
          {
            "id": 19,
            "username": "temp",
            "person": null
          },
          {
            "id": 20,
            "username":
            "tempo",
            "person": null
          }
        ];
    }

}
