import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import { Phone } from '../../base/classes/phone';

@Component({
  selector: 'phone',
  template: require('./phone.html'),
  providers: [Phone],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class PhoneComponent {

  public phone: Phone;

  constructor(phone: Phone) {
    this.phone = new Phone();
  }

}
