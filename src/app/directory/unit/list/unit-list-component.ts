import {Component, View, Inject} from '../../../../../node_modules/angular2/core.d';
import {Router} from '../../../../../node_modules/angular2/router.d';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, Validators} from '../../../../../node_modules/angular2/common.d';
import {MATERIAL_DIRECTIVES} from '../../../../../node_modules/ng2-material/all.d';
import { IUnit } from '../../../base/interfaces/interfaces';
import { UnitService } from './../unit-service'

@Component({
    selector: 'unit-list',
    template: require('./unit_list.html'),
    providers: [UnitService],
    directives: [CORE_DIRECTIVES, MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class EmailComponent {

    title = 'Units list';
    units:IUnit[];

    constructor(@Inject(UnitService) private UnitService) {
        UnitService.enterprises.subscribe(units => this.units = units);
        UnitService.fetchUnits();
    }

}
