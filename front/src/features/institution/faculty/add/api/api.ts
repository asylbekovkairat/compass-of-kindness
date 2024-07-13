import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiFacultyAddData } from './types';

export const addFaculty = async (data: ApiFacultyAddData) => {
  let response;

  try {
    response = await api.post<any, ApiResponseData<ApiFacultyAddData>>(routes.addFaculty(), {
      id_org: data.id_org,
      s_faculty: data.s_faculty,
      faculty_ky: data.faculty_ky,
      faculty_ru: data.faculty_ru,
      faculty_en: data.faculty_en,
    });
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
