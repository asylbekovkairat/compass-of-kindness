export interface ApiFacultyEditData {
  id_org: number;
  id_faculty: number;
  s_faculty: string;
  faculty_ky: string;
  faculty_ru: string;
  faculty_en: string;
}

export interface ApiFacultyEditResponseData {
  data?: boolean;
  error?: boolean;
}
