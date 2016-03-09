import { IPerson, IEMail, IPosition, IPhone } from '../interfaces/interfaces';
import { EMail } from './email';
import { Position } from './position';
import { Phone } from './phone';

export class Person implements IPerson {

  public id: number = null;
  public user: number = null;
  public first_name: string = null;
  public last_name: string = null;
  public mid_name: string = null;
  public date_of_birth: string = null;
  public sex: string = null;
  public bio: string = null;
  public emails: EMail[];
  public positions: Position[];
  public phones: Phone[];

  constructor(person: IPerson) {
    this.user = person.user;
    this.first_name = person.first_name;
    this.last_name = person.last_name;
    this.mid_name = person.mid_name;
    this.date_of_birth = person.date_of_birth;
    this.sex = person.sex;
    this.bio = person.bio;
  };

}
