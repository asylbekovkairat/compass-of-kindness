import { SelectProps } from 'antd';

import { IEmployee } from '~entities/institution/employee/model';
import { Select } from '~shared/ui';

interface IEmployeesSelector extends SelectProps {
  value?: number | null;
  employees: IEmployee[];
}

export function EmployeesSelector({ value, employees, ...props }: IEmployeesSelector) {
  return (
    <Select
      value={value}
      options={employees
        .sort((a, b) =>
          `${a.surname} ${a.name} ${a.patronymic}`.localeCompare(
            `${b.surname} ${b.name} ${b.patronymic}`
          )
        )
        .map((item) => {
          return {
            value: item.id_users,
            label: `${item.surname} ${item.name} ${item.patronymic}`.trim(),
          };
        })}
      {...props}
    />
  );
}
