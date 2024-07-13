export interface ApiFaculty {
  id_faculty: number;
  s_faculty: string;
  faculty_ky: string;
  faculty_ru: string;
  faculty_en: string;
  id_org: number;
}

export interface ApiFacultiesData {
  data: ApiFaculty;
}

export interface ApiFacultiesRequest {
  org_id?: number;
}
