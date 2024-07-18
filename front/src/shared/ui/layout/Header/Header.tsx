import classNames from 'classnames';
import { FC } from 'react';

import useScrollListener from '~shared/lib/hooks/useScrollListener';

import styles from './header.module.scss';

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export const Header: FC<HeaderProps> = ({ children, className = '' }) => {
  const scroll = useScrollListener();

  const headerClass = classNames(
    styles.wrapper,
    scroll.y > 70 && scroll.y - scroll.lastY > 0 ? styles.sticky : '',
    className
  );

  return <header className={headerClass}>{children}</header>;
};
