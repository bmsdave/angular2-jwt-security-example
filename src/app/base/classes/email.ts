import { IEMail } from '../interfaces/interfaces';

export class EMail implements IEMail {

  public id: number = null;
  public cat: string = null;
  public body: string = null;

  constructor() { };

}
