export interface IGender {
  id_gender: number;
  gender_ky: string;
  gender_ru: string;
}
export interface ApiGendersData {
  data: IGender[];
}
