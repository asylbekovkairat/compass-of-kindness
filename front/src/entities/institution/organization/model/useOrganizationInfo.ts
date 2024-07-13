import { useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

import {
  organizationInfo,
  setOrganizationInfo,
} from '~entities/institution/organization/model/atoms';

export const useOrganizationInfo = () => {
  return useAtomValue(organizationInfo);
};

export const useSetOrganizationInfo = () => {
  return useSetAtom(setOrganizationInfo);
};

export const useResetOrganizationInfo = () => {
  return useResetAtom(organizationInfo);
};
