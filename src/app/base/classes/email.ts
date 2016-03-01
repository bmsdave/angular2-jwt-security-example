import { IEmail } from '../interfaces/interfaces';

export class Email implements IEmail {

  public id: number = null;
  public cat: string = null;
  public body: string = null;

  constructor() { };

}
