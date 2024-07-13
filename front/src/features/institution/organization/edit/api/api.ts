import {
  ApiOrganizationInfoEditData,
  ApiOrganizationInfoEditResponseData,
} from '~features/institution/organization/edit/api/types';
import { ApiResponseData, api } from '~shared/api';

import { routes } from './routes';

export const editOrganizationInfo = async (data: ApiOrganizationInfoEditData) => {
  let response;

  try {
    response = await api.post<any, ApiResponseData<ApiOrganizationInfoEditResponseData>>(
      routes.editOrganizationInfo(),
      {
        id_org: data.id_org,
        okpo: data.okpo,
        s_org: data.s_org,
        org_ru: data.org_ru,
        org_ky: data.org_ky,
        org_en: data.org_en,
        id_region: data.id_region,
        id_district: data.id_district,
        id_org_type: data.id_org_type,
        longitude: data.longitude,
        latitude: data.latitude,
      }
    );
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};
