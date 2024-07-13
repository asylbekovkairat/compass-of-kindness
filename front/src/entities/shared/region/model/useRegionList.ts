import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { regionListAtom, setRegionListAtom } from './atoms';

export const useRegionList = () => {
  return useAtomValue(regionListAtom);
};

export const useSetRegionList = () => {
  return useSetAtom(setRegionListAtom);
};

export const useResetRegionList = () => {
  return useResetAtom(regionListAtom);
};
