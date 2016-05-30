import {Component, View, Inject} from '../../../../../node_modules/angular2/core.d';
import {Router} from '../../../../../node_modules/angular2/router.d';
import {FORM_DIRECTIVES, Validators} from '../../../../../node_modules/angular2/common.d';
import {MATERIAL_DIRECTIVES} from '../../../../../node_modules/ng2-material/all.d';
import { IEnterprise } from '../../../base/interfaces/interfaces';
import { EnterpriseService } from './../enterprise-service'

@Component({
    selector: 'enterprise-detail',
    template: require('./enterprise_list.html'),
    directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class EmailComponent {

    private enterprise:IEnterprise;

    constructor(@Inject(EnterpriseService) private EnterpriseService) {
        EnterpriseService.enterprise.subscribe(newEnterprise => this.enterprise = newEnterprise);
    }

}
