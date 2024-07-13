export interface IRegion {
  id_region: number;
  region: string;
}
export interface ApiRegionData {
  data?: IRegion[];
  error?: boolean;
}
