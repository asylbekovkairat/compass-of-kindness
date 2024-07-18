import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useCollapsed, useSetCollapsed } from '~features/shared/collapse';

import { SetRegistrationView } from '~features/shared/locale';
import { Link, RoutesUrls } from '~shared/lib/router';

import { Header, MenuIcon, SiteLogo, useWindowInnerWidth } from '~shared/ui';

export interface SiteHeaderProps extends Partial<ComponentWithChild> {}

export const SiteHeader: FC<SiteHeaderProps> = () => {
  const { t } = useTranslation();
  const windoWidth = useWindowInnerWidth();
  const collapsed = useCollapsed();
  const setCollapsed = useSetCollapsed();

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const buttons = () => {
    if (windoWidth > 1024) {
      return (
        <>
          <div className="flex gap-8 items-center ">
            <Link to={RoutesUrls.allCharities}>{t('cm:routes.allCharities')}</Link>
            <Link to={RoutesUrls.needHelp}>{t('cm:routes.needHelp')}</Link>
            <Link to={RoutesUrls.aboutProject}>{t('cm:routes.aboutProject')}</Link>
            <Link to={RoutesUrls.helpProject}>{t('cm:routes.helpProject')}</Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <SetRegistrationView />
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <div onClick={handleCollapse} className="cursor-pointer flex items-center sm:flex">
          <MenuIcon />
        </div>
      </>
    );
  };

  return (
    <Header className="mx-auto flex justify-between items-center">
      <div className="flex justify-between items-center">
        <SiteLogo />
      </div>

      {buttons()}
    </Header>
  );
};
