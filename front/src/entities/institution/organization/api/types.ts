export interface ApiOrganizationInfo {
  okpo: string;
  s_org: string;
  org_ru: string;
  org_ky: string;
  org_en: string;
  id_region: number;
  id_district: number;
  id_org_type: number;
}

export interface ApiOrganizationInfoData {
  data: ApiOrganizationInfo;
}

export interface ApiOrganizationInfoRequest {
  org_id: number;
  org_okpo: string;
}
