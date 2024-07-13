import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import { RoutesUrls } from '~shared/lib/router';

import SiteLogotype from '../assets/logo.svg';

import styles from './Logo.module.scss';

export function SiteLogo() {
  const { t, i18n } = useTranslation();

  const titleClassName = `${styles.title} ${i18n.language === 'ru' ? 'w-[260px]' : 'w-[280px]'}`;

  return (
    <Link to={RoutesUrls.mon} target="_blank" className={styles.wrapper}>
      <img className={styles.logo} src={SiteLogotype} alt="logo" />
      <h2 className={titleClassName}>{t('mainSiteName')}</h2>
    </Link>
  );
}
