export interface ApiEmployeeDeleteData {
  users_id: number;
}

export interface ApiEmployeeFacultyDeleteData {
  id_users: number;
  id_faculty: number;
}

export interface ApiEmployeeDeleteResponseData {
  data?: boolean;
  error?: boolean;
}

export interface ApiEmployeeFacultyDeleteResponseData {
  data?: boolean;
  error?: boolean;
}
