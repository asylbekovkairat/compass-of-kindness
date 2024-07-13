export interface ApiEmployeeSave {
  id_users?: number;
  id_org?: number;
  surname: string;
  name: string;
  patronymic: string;
  birth_date: string;
  pin: number;
  active?: number;
  okpo?: string;
  email: string;
  telephone: number;
}

export interface ApiEmployeeFacultySave {
  id_users: number;
  id_faculty: number;
}

export interface ApiEmployeeSaveResponseData {
  data?: boolean;
  error?: boolean;
}

export interface ApiEmployeeFacultySaveResponseData {
  data?: boolean;
  error?: boolean;
}
