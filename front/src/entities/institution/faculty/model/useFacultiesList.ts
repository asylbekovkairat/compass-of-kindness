import { useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

import { facultiesList, setFacultiesList } from '~entities/institution/faculty/model/atoms';

export const useFacultiesList = () => {
  return useAtomValue(facultiesList);
};

export const useSetFacultiesList = () => {
  return useSetAtom(setFacultiesList);
};

export const useResetFacultiesList = () => {
  return useResetAtom(facultiesList);
};
