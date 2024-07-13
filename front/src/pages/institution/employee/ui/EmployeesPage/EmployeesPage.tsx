import { useTranslation } from 'react-i18next';

import { RoleType } from '~entities/shared/user';
import { withAccess } from '~shared/lib/router';
import { SeoHelmet } from '~shared/lib/seo';
import { EmployeesList } from '~widgets/institution/employee';

function EmployeesPageContent() {
  const { t } = useTranslation();

  return (
    <>
      <SeoHelmet title={t('cm:routes.employees') || ''} />
      <EmployeesList />
    </>
  );
}

export const EmployeesPage = withAccess([
  RoleType.employee,
  RoleType.organization,
  RoleType.supervisor,
])(EmployeesPageContent);
