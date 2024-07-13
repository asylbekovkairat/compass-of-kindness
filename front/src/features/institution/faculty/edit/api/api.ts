import {
  ApiFacultyEditData,
  ApiFacultyEditResponseData,
} from '~features/institution/faculty/edit/api/types';
import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';

export const editFaculty = async (data: ApiFacultyEditData) => {
  let response;

  try {
    response = await api.post<any, ApiResponseData<ApiFacultyEditResponseData>>(
      routes.editFaculty(),
      {
        id_org: data.id_org,
        id_faculty: data.id_faculty,
        s_faculty: data.s_faculty,
        faculty_ky: data.faculty_ky,
        faculty_ru: data.faculty_ru,
        faculty_en: data.faculty_en,
      }
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
