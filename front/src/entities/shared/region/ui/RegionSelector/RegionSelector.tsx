import { SelectProps } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { DynamicLocaleType } from '~features/shared/locale/set-locale/model';
import { Select } from '~shared/ui';

import { RegionItem } from '../../model';

export interface RegionSelectorProps extends SelectProps {
  value?: any | string;
  regionList: RegionItem[];
}

export const RegionSelector: FC<RegionSelectorProps> = ({ value, regionList, ...props }) => {
  const { i18n } = useTranslation();

  return (
    <Select
      value={value}
      options={regionList.map((item) => {
        return {
          value: item.id_region,
          label: item[`region_${i18n.language as DynamicLocaleType}`],
        };
      })}
      {...props}
    />
  );
};
