import {Component, View, Inject} from '../../../../../node_modules/angular2/core.d';
import {Router} from '../../../../../node_modules/angular2/router.d';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, Validators} from '../../../../../node_modules/angular2/common.d';
import {MATERIAL_DIRECTIVES} from '../../../../../node_modules/ng2-material/all.d';
import { IEnterprise } from '../../../base/interfaces/interfaces';
import { EnterpriseService } from './../enterprise-service'

@Component({
    selector: 'enterprise-list',
    template: require('./enterprise_list.html'),
    providers: [EnterpriseService],
    directives: [CORE_DIRECTIVES, MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class EmailComponent {

    title = 'Emails list';
    enterprises:IEnterprise[];

    constructor(@Inject(EnterpriseService) private EnterpriseService) {
        EnterpriseService.enterprises.subscribe(enterprises => this.enterprises = enterprises);
        EnterpriseService.fetchEnterprises();
    }

}
