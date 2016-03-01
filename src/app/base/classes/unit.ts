import { IUnit } from '../interfaces/interfaces';
import { Enterprise } from './enterprise';

export class Unit implements IUnit {

  public id: number = null;
  public title: string = null;
  public parent: any = null;
  public enterprise: Enterprise = new Enterprise();

  constructor() { };

}
