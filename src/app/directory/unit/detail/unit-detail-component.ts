import {Component, View, Inject} from '../../../../../node_modules/angular2/core.d';
import {Router} from '../../../../../node_modules/angular2/router.d';
import {FORM_DIRECTIVES, Validators} from '../../../../../node_modules/angular2/common.d';
import {MATERIAL_DIRECTIVES} from '../../../../../node_modules/ng2-material/all.d';
import { IUnit } from '../../../base/interfaces/interfaces';
import { UnitService } from './../unit-service'

@Component({
    selector: 'unit-detail',
    template: require('./unit_list.html'),
    directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class EmailComponent {

    private unit:IUnit;

    constructor(@Inject(UnitService) private UnitService) {
        UnitService.unit.subscribe(newUnit => this.unit = newUnit);
    }

}
