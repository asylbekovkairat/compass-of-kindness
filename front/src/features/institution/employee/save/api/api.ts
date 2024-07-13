import {
  ApiEmployeeFacultySave,
  ApiEmployeeFacultySaveResponseData,
  ApiEmployeeSave,
  ApiEmployeeSaveResponseData,
} from '~features/institution/employee/save/api/types';
import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';

export const saveEmployee = async (data: ApiEmployeeSave) => {
  let response;

  try {
    response = await api.post<any, ApiResponseData<ApiEmployeeSaveResponseData>>(
      routes.saveEmployee(),
      {
        id_users: data.id_users,
        id_org: data.id_org,
        surname: data.surname,
        name: data.name,
        patronymic: data.patronymic,
        birth_date: data.birth_date,
        pin: data.pin,
        active: data.active,
        okpo: data.okpo,
        email: data.email,
        telephone: data.telephone,
      }
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};

export const saveEmployeeFaculty = async (data: ApiEmployeeFacultySave) => {
  let response;

  try {
    response = await api.post<any, ApiResponseData<ApiEmployeeFacultySaveResponseData>>(
      routes.saveEmployeeFaculty(),
      {
        id_users: data.id_users,
        id_faculty: data.id_faculty,
      }
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
