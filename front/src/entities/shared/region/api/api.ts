import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';
import { ApiRegionData } from './types';

export const getRegion = () => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiRegionData>>(routes.getRegion());
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
