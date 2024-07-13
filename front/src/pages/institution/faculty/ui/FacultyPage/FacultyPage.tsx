import { useTranslation } from 'react-i18next';

import { RoleType } from '~entities/shared/user';
import { withAccess } from '~shared/lib/router';
import { SeoHelmet } from '~shared/lib/seo';
import { FacultiesList } from '~widgets/institution/faculties';

interface IFacultyPage {}

function FacultyPageContent({}: IFacultyPage) {
  const { t } = useTranslation();

  return (
    <>
      <SeoHelmet title={t('cm:routes.faculty') || ''} />
      <FacultiesList />
    </>
  );
}

export const FacultyPage = withAccess([
  RoleType.employee,
  RoleType.organization,
  RoleType.supervisor,
])(FacultyPageContent);
