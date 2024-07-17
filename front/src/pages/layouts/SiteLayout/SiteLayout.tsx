import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { SiteFooter } from '~widgets/shared/site-footer';
import { SiteHeader } from '~widgets/shared/site-header';

import { PageLayout } from '~shared/ui';
import { Navigation } from '~widgets/shared/navigation';

import styles from './site-layout.module.scss';

export interface SiteLayoutProps extends Partial<ComponentWithChildren> {}

export const SiteLayout: FC<SiteLayoutProps> = () => {
  return (
    <PageLayout navigation={<Navigation />} header={<SiteHeader />}>
      <section className={styles.wrapper}>
        <Outlet />
      </section>
      <SiteFooter />
    </PageLayout>
  );
};
