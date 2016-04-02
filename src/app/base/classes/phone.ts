import { IPhone, phoneCatgory } from '../interfaces/interfaces';

export class Phone implements IPhone {

    public id:number = null;
    public cat:phoneCatgory = null;
    public country_code:number = null;
    public area_code:number = null;
    public number:string = null;

    constructor(phone:IPhone) {
        this.id = phone.id;
        this.cat = phone.cat;
        this.country_code = phone.country_code;
        this.area_code = phone.area_code;
        this.number = phone.number;
    };

}
