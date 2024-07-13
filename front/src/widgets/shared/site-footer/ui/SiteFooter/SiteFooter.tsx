import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from '~shared/lib/i18n';

export interface SiteFooterProps extends Partial<ComponentWithChild> {}

export const SiteFooter: FC<SiteFooterProps> = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-[#f4f4f4]">
      <div className="m-[0_auto] max-w-[1352px] p-[30px_15px]">
        <ul className="flex flex-wrap list-none justify-center px-0">
          <li className="px-5">
            <Link to="" className="whitespace-nowrap text-[#646464] hover:underline">
              {t('site:links.agreement')}
            </Link>
          </li>
          <li className="px-5 border-solid border-[#646464] border-0 border-l xs:border-0">
            <Link to="" className="whitespace-nowrap text-[#646464] hover:underline">
              {t('site:links.privacyPolicy')}
            </Link>
          </li>
        </ul>
        <div className="flex flex-col justify-center items-center text-[#2B2B2B] mt-7 px-[30px] text-center">
          <p className="text-[12px] ">{t('site:copyright')}</p>
          <p className="text-[12px] ">{t('site:createdBy')}</p>
        </div>
      </div>
    </div>
  );
};
