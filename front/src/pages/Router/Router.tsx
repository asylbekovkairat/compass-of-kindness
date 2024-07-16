import { useRoutes } from 'react-router-dom';

import { SiteLayout } from '~pages/layouts';
import { LoginPage } from '~pages/shared/login';
import { NotFoundPage } from '~pages/shared/not-found';
import { RoutesUrls } from '~shared/lib/router';
import { lazyLoader } from '~shared/lib/utils';

const HomePage = lazyLoader(() =>
  import('~pages/shared/home').then((module) => ({
    default: module.HomePage,
  }))
);

const routes = [
  {
    path: RoutesUrls.root,
    element: <SiteLayout />,
    children: [
      { path: RoutesUrls.root, element: <HomePage /> },
      { path: RoutesUrls.login, element: <LoginPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  // {
  //   path: RoutesUrls.cabinet,
  //   element: <RequireAuth loginPath={RoutesUrls.login} />,
  //   children: [
  //     {
  //       element: <BaseLayout />,
  //       children: [{ path: RoutesUrls.logout, element: <LogoutPage /> }],
  //     },
  //   ],
  // },
];

export const Router = () => {
  const routeElement = useRoutes(routes);

  return routeElement;
};
