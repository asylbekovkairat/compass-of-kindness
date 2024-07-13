import { useTranslation } from 'react-i18next';

import { RoleType } from '~entities/shared/user';
import { withAccess } from '~shared/lib/router';
import { SeoHelmet } from '~shared/lib/seo';
import { OrganizationInfo } from '~widgets/institution/organization-info';

function OrganizationPageContent() {
  const { t } = useTranslation();

  return (
    <>
      <SeoHelmet title={t('cm:routes.organization') || ''} />
      <div className="max-w-[1178px]">
        <OrganizationInfo />
      </div>
    </>
  );
}

export const OrganizationPage = withAccess([
  RoleType.employee,
  RoleType.organization,
  RoleType.supervisor,
])(OrganizationPageContent);
