import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import { Unit } from '../../base/classes/unit';

@Component({
  selector: 'unit',
  template: require('./unit.html'),
  providers: [Unit],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})

export class UnitComponent {

  public unit: Unit;

  constructor(unit: Unit) {
    this.unit = new Unit();
  }

}
