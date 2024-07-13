import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { RoutesUrls } from '~shared/lib/router';
import { SeoHelmet } from '~shared/lib/seo';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <SeoHelmet title={t('undefined.label') || ''} />
      <div className="grid place-items-center lg:max-h-[100vh] min-h-[calc(100vh-228px)]">
        <div className="text-center">
          NOT FOUND
          {/* <NotFoundCard className="max-w-[250px]" /> */}
          <p className="mt-4">
            {t('undefined.label')} <br /> {t('undefined.to')}{' '}
            <Link to={RoutesUrls.root} className="text-primary hover:underline">
              {t('undefined.main')}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
