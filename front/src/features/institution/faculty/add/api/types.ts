export interface ApiFacultyAddData {
  id_org: number;
  s_faculty: string;
  faculty_ky: string;
  faculty_ru: string;
  faculty_en: string;
}

export interface ApiFacultyAddResponseData {
  data?: boolean;
  error?: boolean;
}
