import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { gendersListAtom, setGendersListAtom } from './atoms';

export const useGendersList = () => {
  return useAtomValue(gendersListAtom);
};

export const useSetGendersList = () => {
  return useSetAtom(setGendersListAtom);
};

export const useResetGendersList = () => {
  return useResetAtom(gendersListAtom);
};
