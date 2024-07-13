import {
  ApiEmployeeDeleteData,
  ApiEmployeeDeleteResponseData,
  ApiEmployeeFacultyDeleteData,
  ApiEmployeeFacultyDeleteResponseData,
} from '~features/institution/employee/delete/api/types';
import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';

export const deleteEmployee = async (data: ApiEmployeeDeleteData) => {
  let response;

  try {
    response = await api.delete<any, ApiResponseData<ApiEmployeeDeleteResponseData>>(
      routes.deleteEmployee(),
      { params: { users_id: data.users_id } }
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};

export const deleteEmployeeFaculty = async (data: ApiEmployeeFacultyDeleteData) => {
  let response;

  try {
    response = await api.delete<any, ApiResponseData<ApiEmployeeFacultyDeleteResponseData>>(
      routes.deleteEmployeeFaculty(),
      { params: { id_users: data.id_users, id_faculty: data.id_faculty } }
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
