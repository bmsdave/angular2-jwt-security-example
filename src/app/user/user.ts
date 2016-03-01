import { IUser } from '../base/interfaces/interfaces';
import { Person } from '../base/classes/person';

export class User implements IUser {

  id: number = null;
  username: string = null;
  password: string = null;
  person: Person = new Person();
  token: string = null;
  is_auth: boolean = false;

  constructor(user: IUser) {
     this.id = user.id;
     this.username = user.username;
  };

}
