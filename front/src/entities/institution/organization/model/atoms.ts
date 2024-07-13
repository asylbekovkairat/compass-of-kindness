import {
  ApiOrganizationInfoRequest,
  getOrganizationInfo,
} from '~entities/institution/organization/api';
import { IOrganizationInfo } from '~entities/institution/organization/model/types';
import { atom, atomWithDefault } from '~shared/lib/atom-state';

export const organizationInfo = atomWithDefault<IOrganizationInfo | null>((_get) => null);

export const setOrganizationInfo = atom<
  IOrganizationInfo | null,
  ApiOrganizationInfoRequest,
  Promise<void>
>(
  (get) => get(organizationInfo),
  async (_get, set, { org_id, org_okpo }) => {
    const response = await getOrganizationInfo({ org_id, org_okpo });
    const data = response.data;
    set(organizationInfo, data[0]);
  }
);
