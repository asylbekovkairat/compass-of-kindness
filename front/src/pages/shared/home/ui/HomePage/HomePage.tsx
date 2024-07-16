import { useTranslation } from 'react-i18next';

import { SeoHelmet } from '~shared/lib/seo';
import { RandomCharityContent } from '~widgets/random-charity';

interface IHomePage {}

export function HomePage({}: IHomePage) {
  const { t } = useTranslation();

  return (
    <>
      <SeoHelmet title={t('seo:defaultTitle') || ''} />
      <RandomCharityContent />
    </>
  );
}
