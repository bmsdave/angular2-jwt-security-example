import {Component, View, Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import { Enterprise } from '../../base/classes/enterprise';
import { EnterpriseService } from './enterprise-service'

@Component({
  selector: 'enterprise',
  template: require('./enterprise.html'),
  providers: [Enterprise],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class EnterpriseComponent {

  public enterprise: Enterprise;

  constructor(@Inject(EnterpriseService) private EnterpriseService) {
    EnterpriseService.enterprise.subscribe(newEnterprise => this.enterprise = newEnterprise);
  }

}
