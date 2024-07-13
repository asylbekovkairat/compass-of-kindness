export interface ApiOrganizationInfoEditData {
  id_org: number;
  okpo: string;
  s_org: string;
  org_ru: string;
  org_ky: string;
  org_en: string;
  id_region: number;
  id_district: number;
  id_org_type: number;
  longitude: string;
  latitude: string;
}

export interface ApiOrganizationInfoEditResponseData {
  data?: boolean;
  error?: boolean;
}
