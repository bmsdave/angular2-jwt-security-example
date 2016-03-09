import {Component, View, Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import { Person } from '../../base/classes/person';
import { PersonService } from './person-service';

@Component({
  selector: 'person',
  template: require('./person.html'),
  providers: [Person],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class PersonComponent {

  public person: Person;

  constructor(@Inject(PersonService) private PersonService) {
    PersonService.person.subscribe(newPerson => this.person = newPerson);
  }

}
