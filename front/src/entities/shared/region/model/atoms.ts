import { atom, atomWithDefault } from '~shared/lib/atom-state';

import { getRegion } from '../api';

import { IRegionType, RegionList } from './types';

export const regionAtom = atomWithDefault<IRegionType | null>((_get) => null);
export const regionListAtom = atomWithDefault<RegionList | null>((_get) => null);

export const setRegionAtom = atom<IRegionType | null, { region: IRegionType }, Promise<void>>(
  (get) => get(regionAtom),
  async (_get, set, { region }) => set(regionAtom, region)
);

export const setRegionListAtom = atom<RegionList | null, undefined, Promise<void>>(
  (get) => get(regionListAtom),
  async (_get, set) => {
    const response = await getRegion();

    if (response.data?.error) {
      set(regionListAtom, null);
    } else if (response.data) {
      set(regionListAtom, response.data);
    }
  }
);
