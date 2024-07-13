export interface IEmployee {
  id_users?: number;
  surname: string;
  name: string;
  patronymic: string;
  birth_date: string;
  pin: number;
  active: boolean;
  email: string;
  telephone: string;
}

export interface IEmployeeFaculty {
  id_users_faculty?: number;
  id_users: number;
  fio_emp: string;
  id_faculty: number;
  faculty: string;
}
