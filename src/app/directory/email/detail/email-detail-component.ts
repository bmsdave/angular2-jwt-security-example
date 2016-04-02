import {Component, View, Inject} from '../../../../../node_modules/angular2/core.d';
import {Router} from '../../../../../node_modules/angular2/router.d';
import {FORM_DIRECTIVES, Validators} from '../../../../../node_modules/angular2/common.d';
import {MATERIAL_DIRECTIVES} from '../../../../../node_modules/ng2-material/all.d';
import { EMail } from '../../../base/classes/email';
import { EMailService } from './../email-service'

@Component({
    selector: 'email-detail',
    template: require('./email_list.html'),
    providers: [EMail],
    directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class EmailComponent {

    private email:EMail;

    constructor(@Inject(EMailService) private EMailService) {
        EMailService.email.subscribe(newEMail => this.email = newEMail);
    }

}
