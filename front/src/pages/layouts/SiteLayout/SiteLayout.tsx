import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { SiteFooter } from '~widgets/shared/site-footer';
import { SiteHeader } from '~widgets/shared/site-header';

import styles from './site-layout.module.scss';

export interface SiteLayoutProps extends Partial<ComponentWithChildren> {}

export const SiteLayout: FC<SiteLayoutProps> = () => {
  return (
    <>
      <SiteHeader />
      <section className={styles.wrapper}>
        <Outlet />
      </section>
      <SiteFooter />
    </>
  );
};
