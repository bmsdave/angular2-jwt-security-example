import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import { Position } from '../../base/classes/position';

@Component({
  selector: 'position',
  template: require('./position.html'),
  providers: [Position],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class PositionComponent {

  public position: Position;

  constructor(position: Position) {
    this.position = new Position();
  }

}
