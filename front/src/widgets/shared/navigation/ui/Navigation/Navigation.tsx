import { FC, useEffect } from 'react';

import { useUser } from '~entities/shared/user';
import { useCollapsed, useSetCollapsed } from '~features/shared/collapse';
import { SetRegistrationView } from '~features/shared/locale';
import { useTranslation } from '~shared/lib/i18n';
import { RoutesUrls } from '~shared/lib/router';
import { BookIcon, Sider, SiderButton, SiderSettingsButton, useWindowInnerWidth } from '~shared/ui';
import { INavTabItem } from '~widgets/shared/navigation/ui/types';

export interface NavigationProps {}

export const Navigation: FC<NavigationProps> = () => {
  const { t } = useTranslation();
  const collapsedAtom = useCollapsed();
  const windowWidth = useWindowInnerWidth();
  const setCollapsed = useSetCollapsed();

  useEffect(() => {
    if (windowWidth <= 768) {
      if (collapsedAtom) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }
  }, [collapsedAtom, windowWidth]);

  const routes: INavTabItem[] = [
    {
      title: t('cm:routes.allCharities'),
      isTabBar: true,
      path: RoutesUrls.allCharities,
      icon: <BookIcon />,
    },
    {
      title: t('cm:routes.aboutProject'),
      isTabBar: true,
      path: RoutesUrls.aboutProject,
      icon: <BookIcon />,
    },
    {
      title: t('cm:routes.helpProject'),
      isTabBar: true,
      path: RoutesUrls.helpProject,
      icon: <BookIcon />,
    },
    {
      title: t('cm:routes.needHelp'),
      isTabBar: true,
      path: RoutesUrls.needHelp,
      icon: <BookIcon />,
    },
  ];

  const settingsRoutes: INavTabItem[] = [];

  const handleClickButton = () => {
    if (windowWidth <= 768) {
      setCollapsed(!collapsedAtom);
    }
  };

  return (
    <>
      {windowWidth <= 1024 ? (
        <Sider
          user={<></>}
          routes={routes.map((item) => {
            return (
              <SiderButton
                key={item.path}
                path={item.path}
                title={item.title}
                icon={item.icon}
                collapsed={collapsedAtom}
                onClick={handleClickButton}
              />
            );
          })}
          links={null}
          settings={
            <div className="flex justify-center">
              <SetRegistrationView />
            </div>
          }
        />
      ) : null}
    </>
  );
};
