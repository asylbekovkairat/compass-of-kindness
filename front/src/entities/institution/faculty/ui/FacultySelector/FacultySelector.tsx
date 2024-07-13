import { SelectProps } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { IFaculty } from '~entities/institution/faculty/model';
import { DynamicLocaleType } from '~features/shared/locale/set-locale/model';
import { Select } from '~shared/ui';

interface FacultySelectorProps extends SelectProps {
  value?: number;
  faculties: IFaculty[];
}

export const FacultySelector: FC<FacultySelectorProps> = ({ value, faculties, ...props }) => {
  const { i18n } = useTranslation();

  return (
    <Select
      showSearch
      filterOption={(input, option) =>
        `${option?.label}`.toLowerCase().includes(input.toLowerCase())
      }
      value={value}
      options={faculties.map((item) => {
        return {
          value: item.id_faculty,
          label: item[`faculty_${i18n.language as DynamicLocaleType}`],
        };
      })}
      {...props}
    />
  );
};
