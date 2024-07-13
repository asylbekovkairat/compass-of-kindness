import {
  ApiOrganizationInfoData,
  ApiOrganizationInfoRequest,
} from '~entities/institution/organization/api/types';
import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';

export const getOrganizationInfo = ({ org_id, org_okpo }: ApiOrganizationInfoRequest) => {
  let response;

  try {
    response = api.get<any, ApiResponseData<ApiOrganizationInfoData>>(
      routes.getOrganizationInfo(),
      {
        params: { org_id, org_okpo },
      }
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
