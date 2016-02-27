// базовое описание исходных данных на основе интерфейсов

// todo 1. описать обязательные/необязательные
// todo 2. описать методы

export interface Email {
  id: number;
  cat: string;
  body: string;
}

export interface Corp {
  id: number;
  title: string;
}

export interface Unit {
  id: number;
  title: string;
  parent?: any;
  corp: Corp;
}

export interface Position {
  id: number;
  unit: Unit;
  title: string;
  since: string;
  until?: any;
}

export interface Phone {
  id: number;
  cat: string;
  country_code: number;
  area_code: number;
  number: string;
}

export interface Person {
  user: number;
  first_name: string;
  last_name: string;
  mid_name: string;
  date_of_birth: string;
  sex: string;
  emails: Email[];
  positions: Position[];
  phones: Phone[];
}

export interface User {
  id: number;
  username: string;
  password?: string;
  person: Person;
}
