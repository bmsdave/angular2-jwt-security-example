import { IUnit, IEnterprise } from '../interfaces/interfaces';
import { Enterprise } from './enterprise';

export class Unit implements IUnit {

    public id:number = null;
    public title:string = null;
    public parent:any = null;
    public enterprise:Enterprise;

    constructor(unit:IUnit) {
        this.id = unit.id;
        this.title = unit.title;
        this.parent = unit.parent;
        this.enterprise = new Enterprise(unit.enterprise);
    };

}
