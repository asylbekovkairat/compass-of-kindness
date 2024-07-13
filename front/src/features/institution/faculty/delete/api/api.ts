import {
  ApiFacultyDeleteData,
  ApiFacultyDeleteResponseData,
} from '~features/institution/faculty/delete/api/types';
import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';

export const deleteFaculty = async (data: ApiFacultyDeleteData) => {
  let response;

  try {
    response = await api.delete<any, ApiResponseData<ApiFacultyDeleteResponseData>>(
      routes.deleteFaculty(),
      { params: { id_faculty: data.id_faculty } }
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
