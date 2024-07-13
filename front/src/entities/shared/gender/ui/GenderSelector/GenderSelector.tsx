import { SelectProps } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { GenderItem } from '~entities/shared/gender/model';
import { DynamicLocaleType } from '~features/shared/locale/set-locale/model';

import { Select } from '~shared/ui';

export interface GenderSelectorProps extends SelectProps {
  value?: string;
  gendersList: GenderItem[] | null;
}

export const GenderSelector: FC<GenderSelectorProps> = ({ value, gendersList, ...props }) => {
  const { i18n } = useTranslation();

  return (
    <Select
      value={value}
      options={gendersList?.map((item) => {
        return {
          value: item.id_gender,
          label: item[`gender_${i18n.language as DynamicLocaleType}`],
        };
      })}
      {...props}
    />
  );
};
