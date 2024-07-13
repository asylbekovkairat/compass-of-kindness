import { useTranslation } from 'react-i18next';

import { IFaculty } from '~entities/institution/faculty/model';
import { DynamicLocaleType } from '~features/shared/locale/set-locale/model';
import { Table, TableColumnsType } from '~shared/ui';

interface IFacultiesView {
  loading: boolean;
  faculties: IFaculty[];
  actionsSlot?: any;
  setFaculty: any;
}

export const FacultiesView = ({ loading, faculties, actionsSlot, setFaculty }: IFacultiesView) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as DynamicLocaleType;

  const columns: TableColumnsType<IFaculty> = [
    {
      title: '№',
      render: (_value, row, idx) => idx + 1,
      align: 'center',
      width: '55px',
    },
    {
      title: t('faculty:short_title'),
      dataIndex: 's_faculty',
      key: 's_faculty',
      render: (_value) => (
        <div className="text-left flex justify-between items-center gap-1 pr-1">
          <p>{_value}</p>
        </div>
      ),
      align: 'center',
      width: '216px',
    },
    {
      title: t('faculty:title'),
      dataIndex: `faculty_${currentLanguage}`,
      key: `faculty_${currentLanguage}`,
      render: (_value) => (
        <div className="text-left flex justify-between items-center gap-1 pr-1">
          <p>{_value}</p>
        </div>
      ),
      align: 'center',
    },

    {
      title: t('actions.actions'),
      dataIndex: 'operation',
      align: 'center',
      render: (_value, row, _index) => (
        <div onClick={() => setFaculty(row)} className="flex justify-center items-center gap-4">
          {actionsSlot}
        </div>
      ),
      width: '100px',
    },
  ];

  return (
    <>
      <Table
        bordered
        size="small"
        dataSource={faculties}
        columns={columns}
        rowClassName="editable-row"
        pagination={false}
        scroll={{ y: 'calc(100vh - 214px)' }}
        rowKey={(obj) => obj.id_faculty}
        loading={loading}
      />
    </>
  );
};
