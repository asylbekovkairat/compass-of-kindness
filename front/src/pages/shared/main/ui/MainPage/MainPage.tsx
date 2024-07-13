import { useTranslation } from 'react-i18next';

import { RoleType } from '~entities/shared/user';
import { withAccess } from '~shared/lib/router';
import { SeoHelmet } from '~shared/lib/seo';

function MainPageContent() {
  const { t } = useTranslation();

  return (
    <>
      <SeoHelmet title={t('cm:routes.main')} />
      <div className="flex flex-wrap gap-5 max-w-[1178px]">
        <h1>MAIN PAGE</h1>
      </div>
    </>
  );
}

export const MainPage = withAccess([
  RoleType.employee,
  RoleType.organization,
  RoleType.supervisor,
  RoleType.ministry,
])(MainPageContent);
