import {Component, View, Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import { Unit } from '../../base/classes/unit';
import { UnitService } from './unit-service';

@Component({
    selector: 'unit',
    template: require('./unit.html'),
    providers: [Unit],
    directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class UnitComponent {

    public unit:Unit;

    constructor(@Inject(UnitService) private UnitService) {
        UnitService.position.subscribe(newUnit => this.unit = newUnit);
    }

}
