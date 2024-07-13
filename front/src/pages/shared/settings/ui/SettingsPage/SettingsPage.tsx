import { FC } from 'react';

import { i18n } from '~shared/lib/i18n';
import { SeoHelmet } from '~shared/lib/seo';
import { Box } from '~shared/ui';

import { LanguageSettings } from '~widgets/shared/language';
import { PasswordChange } from '~widgets/shared/password';

export interface SettingsPageProps {}

export const SettingsPage: FC<SettingsPageProps> = () => {
  const { t } = i18n;

  return (
    <>
      <SeoHelmet title={t('cm:routes.settings') || ''} />
      <div className="max-w-[700px] grid gap-[40px]">
        <Box>
          <LanguageSettings />
        </Box>
        <Box>
          <PasswordChange />
        </Box>
      </div>
    </>
  );
};
