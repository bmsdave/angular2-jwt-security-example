import { IPerson } from '../interfaces/interfaces';
import { Email } from './email';
import { Position } from './position';
import { Phone } from './phone';

export class Person implements IPerson {

  public user: number = null;
  public first_name: string = null;
  public last_name: string = null;
  public mid_name: string = null;
  public date_of_birth: string = null;
  public sex: string = null;
  public bio: string = null;
  public emails: Email[] = [new Email()];
  public positions: Position[] = [new Position()];
  public phones: Phone[] = [new Phone()];

  constructor() { };

}
