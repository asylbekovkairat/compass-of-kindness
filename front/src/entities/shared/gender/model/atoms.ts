import { GendersList } from '~entities/shared/gender/model/types';
import { atom, atomWithDefault } from '~shared/lib/atom-state';

import { getGenders } from '../api';

export const gendersListAtom = atomWithDefault<GendersList | null>((_get) => null);

export const setGendersListAtom = atom<GendersList | null, undefined, Promise<void>>(
  (get) => get(gendersListAtom),
  async (_get, set) => {
    const response = await getGenders();

    if (response.data?.error) {
      set(gendersListAtom, null);
    } else if (response.data) {
      set(gendersListAtom, response.data);
    }
  }
);
