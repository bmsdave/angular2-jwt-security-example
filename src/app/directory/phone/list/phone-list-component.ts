import {Component, View, Inject} from '../../../../../node_modules/angular2/core.d';
import {Router} from '../../../../../node_modules/angular2/router.d';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, Validators} from '../../../../../node_modules/angular2/common.d';
import {MATERIAL_DIRECTIVES} from '../../../../../node_modules/ng2-material/all.d';
import { IPhone } from '../../../base/interfaces/interfaces';
import { PhoneService } from './../phone-service'

@Component({
    selector: 'phone-list',
    template: require('./phone_list.html'),
    providers: [PhoneService],
    directives: [CORE_DIRECTIVES, MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class EmailComponent {

    title = 'Phones list';
    phones:IPhone[];

    constructor(@Inject(PhoneService) private PhoneService) {
        PhoneService.phones.subscribe(phones => this.phones = phones);
        PhoneService.fetchPhones();
    }

}
