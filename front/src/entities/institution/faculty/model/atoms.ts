import { ApiFacultiesRequest, getFaculties } from '~entities/institution/faculty/api';
import { IFaculty } from '~entities/institution/faculty/model/types';
import { atom, atomWithDefault } from '~shared/lib/atom-state';

export const facultiesList = atomWithDefault<IFaculty[] | null>((_get) => null);

export const setFacultiesList = atom<IFaculty[] | null, ApiFacultiesRequest, Promise<void>>(
  (get) => get(facultiesList),
  async (_get, set, { org_id }) => {
    const response = await getFaculties({ org_id });
    const data = response.data;
    set(facultiesList, data);
  }
);
