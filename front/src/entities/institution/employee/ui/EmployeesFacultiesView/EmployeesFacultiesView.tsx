import { useTranslation } from 'react-i18next';

import { IEmployeeFaculty } from '~entities/institution/employee/model';
import { Table, TableColumnsType, useWindowInnerWidth } from '~shared/ui';

interface IEmployeesFacultiesView {
  loading: boolean;
  employeeFaculties: IEmployeeFaculty[];
  actionsSlot?: any;
  setEmployeeFaculty: any;
}

export const EmployeesFacultiesView = ({
  loading,
  employeeFaculties,
  actionsSlot,
  setEmployeeFaculty,
}: IEmployeesFacultiesView) => {
  const { t } = useTranslation();
  const windowWidth = useWindowInnerWidth();

  const columns: TableColumnsType<IEmployeeFaculty> = [
    {
      title: '№',
      render: (_value, row, idx) => idx + 1,
      align: 'center',
      width: '55px',
      fixed: 'left',
    },
    {
      title: t('employees:fio'),
      render: (_, row) => <p className="text-start">{row.fio_emp}</p>,
      align: 'center',
      fixed: 'left',
      width: windowWidth < 900 ? '200px' : 'auto',
    },
    {
      title: t('faculty:title'),
      render: (_, row) => <p className="text-start">{row.faculty}</p>,
      align: 'center',
      fixed: 'left',
    },
    {
      title: t('actions.actions'),
      dataIndex: 'operation',
      align: 'center',
      render: (_value, row, _index) => (
        <div
          onClick={() => setEmployeeFaculty(row)}
          className="flex justify-center items-center gap-4"
        >
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
        dataSource={employeeFaculties}
        columns={columns}
        rowClassName="editable-row"
        pagination={false}
        scroll={{ y: 'calc(100vh - 284px)' }}
        rowKey={(obj) => obj.id_users_faculty as number}
        loading={loading}
      />
    </>
  );
};
