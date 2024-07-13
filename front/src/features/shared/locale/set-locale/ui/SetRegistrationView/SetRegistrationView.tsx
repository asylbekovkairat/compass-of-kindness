import { useTranslation } from '~shared/lib/i18n';
import { dayjs } from '~shared/lib/time';
import { Button } from '~shared/ui';

import { LocaleCodes } from '../../model';

export interface SetRegistrationViewProps {}

export const SetRegistrationView: React.FC<SetRegistrationViewProps> = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const handleLocaleChange = (payload: string | number) => {
    i18n.changeLanguage(payload as string);
    dayjs.locale(payload as string);
  };

  return (
    <>
      <Button
        shape="round"
        className={lang === 'ru' ? 'border-primary' : ''}
        type={lang === 'ru' ? 'default' : 'text'}
        onClick={() => handleLocaleChange(LocaleCodes.RUSSIAN)}
      >
        {t('auth:buttons.ru')}
      </Button>
      <Button
        shape="round"
        className={lang === 'ky' ? 'border-primary' : ''}
        type={lang === 'ky' ? 'default' : 'text'}
        onClick={() => handleLocaleChange(LocaleCodes.KYRGYZ)}
      >
        {t('auth:buttons.ky')}
      </Button>
    </>
  );
};
