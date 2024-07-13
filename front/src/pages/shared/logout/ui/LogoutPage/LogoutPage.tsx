import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { useSetUser } from '~entities/shared/user';
// import { useResetUser, useSetUser } from '~entities/user';

import { SignOutView, SignOutViewProps } from '~features/auth/sign-out';
import { RoutesUrls } from '~shared/lib/router';

export interface LogoutPageProps {}

export const LogoutPage: React.FC<LogoutPageProps> = () => {
  const navigate = useNavigate();
  const setUser = useSetUser();

  const handleSignOut: SignOutViewProps['onSignOut'] = useCallback(() => {
    localStorage.removeItem('image');
    setUser({ authState: null });

    navigate(RoutesUrls.root, { replace: true });
  }, [navigate]);

  return <SignOutView onSignOut={handleSignOut} />;
};
