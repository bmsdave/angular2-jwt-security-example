import {Component, View, Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import { EMail } from '../../base/classes/email';
import { EMailService } from './email-service'

@Component({
  selector: 'email',
  template: require('./email.html'),
  providers: [EMail],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class EmailComponent {

  public email: EMail;

  constructor(@Inject(EMailService) private EMailService) {
    EMailService.email.subscribe(newEMail => this.email = newEMail);
  }

}
