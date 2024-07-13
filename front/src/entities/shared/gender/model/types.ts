export interface GenderItem {
  id_gender: number;
  gender_ky: string;
  gender_ru: string;
}

export interface GendersList extends Array<GenderItem> {}
