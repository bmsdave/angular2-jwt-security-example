import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {AuthHttp, JwtHelper, AuthConfig} from 'angular2-jwt';
import {Http, Headers, Response} from 'angular2/http';
import {Router} from 'angular2/router';
import {IPerson} from '../../base/interfaces/interfaces';


@Injectable()
export class PersonService {

    public baseUrl = 'http://kl10ch.app-showcase.corelab.pro/api';
    public persons:Observable<IPerson[]>;
    public selectedPerson:Observable<IPerson>;

    private _personsObserver:Observer<IPerson[]>;
    private _persons:IPerson[];
    private _selectedPersonObserver:Observer<IPerson>;

    constructor(private http:Http,
                private router:Router,
                private authHttp:AuthHttp) {
        this.getPersons();

        this.selectedPerson = new Observable(observer =>
            this._selectedPersonObserver = observer);

        this.persons = new Observable(observer =>
            this._personsObserver = observer);
    }

    getPersons() {
        console.log('getpersons');

        var header = new Headers();
        header.append('Content-Type', 'application/json');

        return this.authHttp.get('', {
                headers: header
            })
            .map(res => res.json()).subscribe(
                (data) => {
                    console.log(data);
                    for (var item of data) {
                        this._persons.push(item);
                    }
                },
                err => console.log('getperson.error: ', err),
                () => console.log('get person complete')
            );
    };

    fetchPersons() {
        this._personsObserver.next(this._persons);
    }

    selectPerson(person) {
        this._selectedPersonObserver.next(person);
    }

    createPerson(person:IPerson) {
        this.authHttp.post('/api/person', JSON.stringify(person))
            .map(response => response.json()).subscribe(data => {
            this._persons.push(data);
            this._personsObserver.next(this._persons);
        }, error => console.log('Could not create person.'));
    }

    updatePerson(person:IPerson) {
        this.http.put(`/directory/person/${person.id}`, JSON.stringify(person))
            .map(response => response.json()).subscribe(data => {
            this._persons.forEach((person, i) => {
                if (person.id === data.id) {
                    this._persons[i] = data;
                }
            });

            this._personsObserver.next(this._persons);
        }, error => console.log('Could not update person.'));
    }

    deletePerson(personId:number) {
        this.http.delete(`/directory/person/${personId}`).subscribe(response => {
            this._persons.forEach((e, index) => {
                if (e.id === personId) {
                    this._persons.splice(index, 1);
                }
            });

            this._personsObserver.next(this._persons);
        }, error => console.log('Could not delete person.'));
    }

}
