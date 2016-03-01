import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import { Person } from '../../base/classes/person';

@Component({
  selector: 'person',
  template: require('./person.html'),
  providers: [Person],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class PersonComponent {

  public person: Person;

  constructor(person: Person) {
    this.person = new Person();
  }

}
