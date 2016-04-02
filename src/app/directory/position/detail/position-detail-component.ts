import {Component, View, Inject} from '../../../../../node_modules/angular2/core.d';
import {Router} from '../../../../../node_modules/angular2/router.d';
import {FORM_DIRECTIVES, Validators} from '../../../../../node_modules/angular2/common.d';
import {MATERIAL_DIRECTIVES} from '../../../../../node_modules/ng2-material/all.d';
import { IPosition } from '../../../base/interfaces/interfaces';
import { PositionService } from './../position-service'

@Component({
    selector: 'position-detail',
    template: require('./position_list.html'),
    providers: [Position],
    directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class EmailComponent {

    private position:Position;

    constructor(@Inject(PositionService) private PositionService) {
        PositionService.position.subscribe(newPosition => this.position = newPosition);
    }

}
