// базовое описание исходных данных на основе интерфейсов

// TODO: описать обязательные/необязательные
// TODO: описать методы


export const enum sex {
    Male,
    Female
}

export enum category {
    Home,
    Work
}

export enum phoneCatgory {
    Home,
    Work,
    Mobile
}

export interface IEMail {
    id?: number;
    cat?: category;
    body: string;
}

export interface IEnterprise {
    id: number;
    title: string;
}

export interface IUnit {
    id: number;
    title: string;
    parent?: any;
    enterprise: IEnterprise;
}

export interface IPosition {
    id: number;
    unit: IUnit;
    title: string;
    since: string;
    until?: any;
}

export interface IPhone {
    id: number;
    cat: phoneCatgory;
    country_code: number;
    area_code: number;
    number: string;
}

export interface IPerson {
    id: number;
    user: number;
    first_name: string;
    last_name: string;
    mid_name: string;
    date_of_birth: string;
    sex: sex;
    bio: string;
    emails?: IEMail[];
    positions?: IPosition[];
    phones?: IPhone[];
}

export interface IUser {
    id?: number;
    username: string;
    password?: string;
    person?: IPerson;
    is_auth: boolean;
}
