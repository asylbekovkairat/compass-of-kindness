import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { SetRegistrationView } from '~features/shared/locale';
import { RoutesUrls } from '~shared/lib/router';

import { Header, SiteLogo } from '~shared/ui';

export interface SiteHeaderProps extends Partial<ComponentWithChild> {}

export const SiteHeader: FC<SiteHeaderProps> = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <Header className="mx-auto">
      <div className="flex justify-between w-full items-center">
        <SiteLogo />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <SetRegistrationView />
        </div>
        {RoutesUrls.root === pathname ? (
          <Link
            to={RoutesUrls.login}
            className="text-black hover:text-[#4f679b] w-16 inline-block text-center"
          >
            {t('routes.login')}
          </Link>
        ) : (
          <Link
            to={RoutesUrls.root}
            className="text-black hover:text-[#4f679b] w-16 inline-block text-center"
          >
            {t('routes.main')}
          </Link>
        )}
      </div>
    </Header>
  );
};
