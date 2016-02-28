// базовое описание исходных данных на основе интерфейсов

// todo 1. описать обязательные/необязательные
// todo 2. описать методы

export interface IEmail {
  id: number;
  cat: string;
  body: string;
}

export interface ICorp {
  id: number;
  title: string;
}

export interface IUnit {
  id: number;
  title: string;
  parent?: any;
  corp: ICorp;
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
  cat: string;
  country_code: number;
  area_code: number;
  number: string;
}

export interface IPerson {
  user: number;
  first_name: string;
  last_name: string;
  mid_name: string;
  date_of_birth: string;
  sex: string;
  bio: string;
  emails: IEmail[];
  positions: IPosition[];
  phones: IPhone[];
}

export interface IUser {
  id?: number;
  username: string;
  password?: string;
  person?: IPerson;
}
