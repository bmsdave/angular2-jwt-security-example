import { IPhone } from '../interfaces/interfaces';

export class Phone implements IPhone {

  public id: number = null;
  public cat: string = null;
  public country_code: number = null;
  public area_code: number = null;
  public number: string = null;

  constructor() { };

}
