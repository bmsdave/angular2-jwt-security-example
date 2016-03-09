import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';
import {Http, Headers, Response} from 'angular2/http';
import {Router} from 'angular2/router';
import {Person} from '../../base/classes/person';


// TODO: refactor setDefaultTask

@Injectable()
export class PersonService {

  public baseUrl = '/';
  public person: Observable<Person>;

  private _personObserver: any;
  private _person = Person;

  constructor(
    private http: Http,
    private router: Router,
    private authHttp: AuthHttp
  ) {
    this.retrievePerson();

    this.person = new Observable(observer =>
      this._person = observer);
  }

  retrievePerson() {
    console.log('Retrieve Person');

    var header = new Headers();
    header.append('Content-Type', 'application/json');

    return this.authHttp.get('http://kl10ch.app-showcase.corelab.pro/api/directory/person/', {
        headers: header
      })
      .map(res => res.json()).subscribe(
        data => {
          console.log(data);
          this._person = new Person(data);
        },
        err => console.log('getPerson.error: ', err),
        () => console.log('get person complete')
      );
  };

}
