import { IUser, IPerson } from '../base/interfaces/interfaces';
import { Person } from '../base/classes/person';

export class User implements IUser {

  id: number = null;
  username: string = null;
  password: string = null;
  person: IPerson;
  token: string = null;
  is_auth: boolean = false;

  constructor(user: IUser) {
     this.id = user.id;
     this.username = user.username;
     this.is_auth = user.is_auth;
  };

}
