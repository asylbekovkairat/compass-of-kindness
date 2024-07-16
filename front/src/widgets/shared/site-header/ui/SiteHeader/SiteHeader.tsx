import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { SetRegistrationView } from '~features/shared/locale';
import { Link } from '~shared/lib/router';

import { Header, SiteLogo } from '~shared/ui';

export interface SiteHeaderProps extends Partial<ComponentWithChild> {}

export const SiteHeader: FC<SiteHeaderProps> = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <Header className="mx-auto flex justify-between items-center">
      <div className="flex justify-between items-center">
        <SiteLogo />
      </div>

      <div className="flex gap-4">
        <Link to="">{t('cm:routes.allCharities')}</Link>
        <Link to="">{t('cm:routes.createCharities')}</Link>
        <Link to="">{t('cm:routes.aboutProject')}</Link>
        <Link to="">{t('cm:routes.helpProject')}</Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <SetRegistrationView />
        </div>
      </div>
    </Header>
  );
};
