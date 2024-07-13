import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';

import { useSetSettings } from '~entities/shared/settings';
import { useSetUser, useUser } from '~entities/shared/user';

interface RequireAuthProps {
  loginPath: string;
}

export const RequireAuth: React.FunctionComponent<RequireAuthProps> = ({ loginPath }) => {
  const user = useUser();
  const setUser = useSetUser();
  const location = useLocation();

  const setSettings = useSetSettings();

  const [isUserReady, setUserReady] = useState(false);

  useEffect(() => {
    if (user) {
      setUserReady(true);
    }
  }, [user]);

  const isAuth = () => {
    if (isUserReady) {
      if (user) {
        setSettings();

        return true;
      }

      if (!user) {
        setUser({ authState: null });
      }
    }

    return false;
  };

  if (!isAuth()) {
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
