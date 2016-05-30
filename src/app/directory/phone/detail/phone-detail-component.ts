import {Component, View, Inject} from '../../../../../node_modules/angular2/core.d';
import {Router} from '../../../../../node_modules/angular2/router.d';
import {FORM_DIRECTIVES, Validators} from '../../../../../node_modules/angular2/common.d';
import {MATERIAL_DIRECTIVES} from '../../../../../node_modules/ng2-material/all.d';
import { IPhone } from '../../../base/interfaces/interfaces';
import { PhoneService } from './../phone-service'

@Component({
    selector: 'phone-detail',
    template: require('./phone_list.html'),
    providers: [PhoneService],
    directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class EmailComponent {

    private phone:IPhone;

    constructor(@Inject(PhoneService) private PhoneService) {
        PhoneService.phone.subscribe(newPhone => this.phone = newPhone);
    }

}
