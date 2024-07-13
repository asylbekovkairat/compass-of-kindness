export interface ApiEmployee {
  id_users?: number;
  surname: string;
  name: string;
  patronymic: string;
  birth_date: string;
  pin: number;
  active?: boolean;
  email: string;
  telephone: string;
}

export interface ApiEmployeeFaculty {
  id_users_faculty?: number;
  id_users: number;
  fio_emp: string;
  id_faculty: number;
  faculty: string;
}

export interface ApiEmployeesData {
  data: ApiEmployee;
}

export interface ApiEmployeeFacultiesData {
  data: ApiEmployee;
}

export interface ApiEmployeesRequest {
  id_org?: number;
}

export interface ApiEmployeeFacultiesRequest {
  id_org?: number;
}
