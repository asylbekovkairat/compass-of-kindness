import { useAtomValue, useResetAtom, useSetAtom } from '~shared/lib/atom-state';

import { regionAtom, setRegionAtom } from './atoms';

export const useRegion = () => {
  return useAtomValue(regionAtom);
};

export const useSetRegion = () => {
  return useSetAtom(setRegionAtom);
};

export const useResetRegion = () => {
  return useResetAtom(regionAtom);
};
