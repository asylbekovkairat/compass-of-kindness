import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiGendersData } from './types';

export const getGenders = () => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiGendersData>>(routes.getGenders());
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
