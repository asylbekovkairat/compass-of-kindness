import { ApiFacultiesData, ApiFacultiesRequest } from '~entities/institution/faculty/api/types';
import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';

export const getFaculties = ({ org_id }: ApiFacultiesRequest) => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiFacultiesData>>(routes.getFaculties(), {
      params: { org_id },
    });
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
