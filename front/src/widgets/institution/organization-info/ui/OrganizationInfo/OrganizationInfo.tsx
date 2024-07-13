import { useEffect, useState } from 'react';

import { useOrganizationInfo, useSetOrganizationInfo } from '~entities/institution/organization';
import { useUser } from '~entities/shared/user';
import { OrganizationInfoEdit } from '~features/institution/organization/edit/ui';
import { Skeleton } from '~shared/ui';

export function OrganizationInfo() {
  const [loading, setLoading] = useState(false);
  const userInfo = useUser();
  const organizationInfo = useOrganizationInfo();
  const setOrganizationInfo = useSetOrganizationInfo();

  useEffect(() => {
    setLoading(true);

    fetchOrganizationInfo();

    setLoading(false);
  }, []);

  function fetchOrganizationInfo() {
    if (userInfo) {
      setOrganizationInfo({ org_okpo: userInfo.okpo || '', org_id: userInfo.org || 0 });
    }
  }

  if (loading && !organizationInfo && !userInfo) {
    return <Skeleton active />;
  }

  return (
    <OrganizationInfoEdit
      organizationInfo={organizationInfo}
      fetchOrganizationInfo={fetchOrganizationInfo}
    />
  );
}
