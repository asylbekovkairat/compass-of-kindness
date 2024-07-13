import { useTranslation } from 'react-i18next';

import { IEmployee } from '~entities/institution/employee/model';
import { timezoneDayjs } from '~shared/lib/utils';
import { Table, TableColumnsType, useWindowInnerWidth } from '~shared/ui';

interface IEmployeesView {
  loading: boolean;
  employees: IEmployee[];
  actionsSlot?: any;
  setEmployee: any;
}

export const EmployeesView = ({ loading, employees, actionsSlot, setEmployee }: IEmployeesView) => {
  const { t } = useTranslation();
  const windowWidth = useWindowInnerWidth();

  const columns: TableColumnsType<IEmployee> = [
    {
      title: '№',
      render: (_value, row, idx) => idx + 1,
      align: 'center',
      width: '55px',
      fixed: 'left',
    },
    {
      title: t('employees:fio'),
      render: (_, row) => (
        <p className="text-start">
          {row.surname} {row.name} {row.patronymic}
        </p>
      ),
      align: 'center',
      fixed: 'left',
      width: windowWidth < 900 ? '200px' : 'auto',
    },
    {
      title: t('employees:birthday'),
      dataIndex: 'birth_date',
      key: 'birth_date',
      render: (_value) => timezoneDayjs(_value).format('DD.MM.YYYY'),
      align: 'center',
      width: '110px',
    },
    {
      title: t('employees:pin'),
      dataIndex: 'pin',
      key: 'pin',
      align: 'center',
      width: '156px',
    },
    {
      title: t('employees:phone'),
      key: 'telephone',
      dataIndex: 'telephone',
      render: (_value) => <a href={`tel:${_value}`}>{_value}</a>,
      align: 'center',
      width: '146px',
    },
    {
      title: t('employees:email'),
      key: 'email',
      dataIndex: 'email',
      render: (_value) => <a href={`mailto:${_value}`}>{_value}</a>,
      align: 'center',
      width: '200px',
    },
    {
      title: t('actions.actions'),
      dataIndex: 'operation',
      align: 'center',
      render: (_value, row, _index) => (
        <div onClick={() => setEmployee(row)} className="flex justify-center items-center gap-4">
          {actionsSlot}
        </div>
      ),
      width: '100px',
      fixed: 'right',
    },
  ];

  return (
    <>
      <Table
        bordered
        size="small"
        dataSource={employees}
        columns={columns}
        rowClassName="editable-row"
        pagination={false}
        scroll={{ y: 'calc(100vh - 284px)' }}
        rowKey={(obj) => obj.patronymic}
        loading={loading}
      />
    </>
  );
};
