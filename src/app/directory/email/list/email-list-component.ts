import {Component, View, Inject} from '../../../../../node_modules/angular2/core.d';
import {Router} from '../../../../../node_modules/angular2/router.d';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, Validators} from '../../../../../node_modules/angular2/common.d';
import {MATERIAL_DIRECTIVES} from '../../../../../node_modules/ng2-material/all.d';
import { IEMail } from '../../../base/interfaces/interfaces';
import { EMailService } from './../email-service'

@Component({
    selector: 'email-list',
    template: require('./email-list.html'),
    providers: [EMailService],
    directives: [CORE_DIRECTIVES, MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class EmailComponent {

    title = 'Emails list';
    emails:IEMail[];

    constructor(@Inject(EMailService) private EMailService) {
        EMailService.enterprises.subscribe(emails => this.emails = emails);
        EMailService.fetchEMails();
    }

}
