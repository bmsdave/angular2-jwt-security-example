import { IEnterprise } from '../interfaces/interfaces';

export class Enterprise implements IEnterprise {

  public id: number = null;
  public title: string = null;

  constructor(enterprise: IEnterprise) {
    this.id = enterprise.id;
    this.title = enterprise.title;
  };

}
