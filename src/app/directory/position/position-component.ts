import {Component, View, Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import { Position } from '../../base/classes/position';
import { PositionService } from './position-service';

@Component({
  selector: 'position',
  template: require('./position.html'),
  providers: [Position],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class PositionComponent {

  public position: Position;

  constructor(@Inject(PositionService) private PositionService) {
    PositionService.position.subscribe(newPosition => this.position = newPosition);
  }

}
