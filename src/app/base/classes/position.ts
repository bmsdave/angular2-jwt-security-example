import { IPosition } from '../interfaces/interfaces';
import { Unit } from './unit';

export class Position implements IPosition {

  public id: number = null;
  public title: string = null;
  public since: string = null;
  public until: any = null;
  public unit: Unit = new Unit();

  constructor(position: IPosition) {
    this.id = position.id;
    this.title = position.title;
    this.since = position.since;
    this.until = position.until;
    this.unit = position.unit;
  };

}
