import {Component, View, Inject} from '../../../../../node_modules/angular2/core.d';
import {Router} from '../../../../../node_modules/angular2/router.d';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, Validators} from '../../../../../node_modules/angular2/common.d';
import {MATERIAL_DIRECTIVES} from '../../../../../node_modules/ng2-material/all.d';
import { IPosition } from '../../../base/interfaces/interfaces';
import { PositionService } from './../position-service'

@Component({
    selector: 'position-list',
    template: require('./position_list.html'),
    providers: [PositionService],
    directives: [CORE_DIRECTIVES, MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class EmailComponent {

    title = 'Positions list';
    positions:IPosition[];

    constructor(@Inject(PositionService) private PositionService) {
        PositionService.positions.subscribe(positions => this.positions = positions);
        PositionService.fetchPositions();
    }

}
