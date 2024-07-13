import {
  ApiEmployeeFacultiesData,
  ApiEmployeeFacultiesRequest,
  ApiEmployeesData,
  ApiEmployeesRequest,
} from '~entities/institution/employee/api/types';
import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';

export const getEmployees = ({ id_org }: ApiEmployeesRequest) => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiEmployeesData>>(routes.getEmployees(), {
      params: { id_org },
    });
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};

export const getEmployeeFaculties = ({ id_org }: ApiEmployeeFacultiesRequest) => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiEmployeeFacultiesData>>(
      routes.getEmployeeFaculties(),
      {
        params: { id_org },
      }
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
