import { IUnit } from '../interfaces/interfaces';
import { Corp } from './corp';

export class Unit implements IUnit {

  public id: number = null;
  public title: string = null;
  public parent: any = null;
  public corp: Corp = null;

  constructor() { };

}
