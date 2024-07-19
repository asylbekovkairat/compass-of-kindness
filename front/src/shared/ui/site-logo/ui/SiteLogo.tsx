import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import { RoutesUrls } from '~shared/lib/router';

import { HeartHandsIcon } from '~shared/ui/Icons';

import styles from './Logo.module.scss';

export function SiteLogo() {
  const { t } = useTranslation();

  const titleClassName = `${styles.title} w-auto`;

  return (
    <Link to={RoutesUrls.root} className={styles.wrapper}>
      <HeartHandsIcon className={styles.logo} />
      <h2 className={titleClassName}>{t('mainSiteName')}</h2>
    </Link>
  );
}
