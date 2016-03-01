import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import { EMail } from '../../base/classes/email';

@Component({
  selector: 'email',
  template: require('./email.html'),
  providers: [EMail],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class EmailComponent {

  public email: EMail;

  constructor(email: EMail) {
    this.email = new EMail();
  }

}
