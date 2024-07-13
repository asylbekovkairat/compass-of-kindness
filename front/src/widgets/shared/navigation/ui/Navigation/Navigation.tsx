import { FC, useEffect } from 'react';

import { RoleType, SiderUser, useUser } from '~entities/shared/user';
import { useCollapsed, useSetCollapsed } from '~features/shared/collapse';
import { useTranslation } from '~shared/lib/i18n';
import { RoutesUrls } from '~shared/lib/router';
import {
  LogoutIcon,
  SN,
  SettingsIcon,
  Sider,
  SiderButton,
  SiderSettingsButton,
  UsersIcon,
  useWindowInnerWidth,
} from '~shared/ui';
import { INavTabItem } from '~widgets/shared/navigation/ui/types';

export interface NavigationProps {}

export const Navigation: FC<NavigationProps> = () => {
  const { t } = useTranslation();
  const collapsedAtom = useCollapsed();
  const setCollapsed = useSetCollapsed();
  const user = useUser();
  const windowWidth = useWindowInnerWidth();

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
      title: t('cm:routes.employees'),
      path: RoutesUrls.employees,
      icon: <UsersIcon />,
      isTabBar: true,
      show: [RoleType.employee, RoleType.organization, RoleType.supervisor],
    },
  ];

  const settingsRoutes: INavTabItem[] = [
    {
      title: t('cm:routes.settings'),
      path: RoutesUrls.settings,
      icon: <SettingsIcon />,
      isBlank: false,
    },
    {
      title: t('cm:bottomLinks.logout'),
      path: RoutesUrls.logout,
      icon: <LogoutIcon />,
      isBlank: false,
    },
  ];

  const handleClickButton = () => {
    if (windowWidth <= 768) {
      setCollapsed(!collapsedAtom);
    }
  };

  return (
    <>
      <Sider
        user={
          <SiderUser
            fio={`${user?.s} ${user?.n?.charAt(-0)}. ${user?.p ? user?.p.charAt(0) + '.' : ''}`}
            role={t(`cm:role.${user?.role}`)}
            onError={<SN surname={user?.s || ''} name={user?.n || ''} size={18} />}
          />
        }
        routes={routes
          .filter((x) => x.show?.some((y) => user!.role.includes(y as RoleType)))
          .map((item) => {
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
        settings={settingsRoutes?.map((item) => {
          return (
            <SiderSettingsButton
              key={item.path}
              path={item.path}
              title={item.title}
              icon={item.icon}
              isBlank={item.isBlank}
              collapsed={collapsedAtom}
            />
          );
        })}
        collapsed={collapsedAtom}
      />
    </>
  );
};
