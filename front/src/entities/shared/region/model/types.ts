export type IRegionType = number;

export interface RegionItem {
  id_region: IRegionType;
  region_ky: string;
  region_ru: string;
}

export interface RegionList extends Array<RegionItem> {}
