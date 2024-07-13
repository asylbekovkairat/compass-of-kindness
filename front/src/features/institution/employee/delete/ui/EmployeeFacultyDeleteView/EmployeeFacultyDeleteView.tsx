import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IEmployeeFaculty } from '~entities/institution/employee';
import { deleteEmployeeFaculty } from '~features/institution/employee/delete/api';

import { Button, DeleteIcon, Modal, useNotification } from '~shared/ui';

interface IEmployeeFacultyDeleteView {
  refetchEmployeeFacultiesList: () => void;
  employeeFaculty: IEmployeeFaculty | null;
}

export function EmployeeFacultyDeleteView({
  refetchEmployeeFacultiesList,
  employeeFaculty,
}: IEmployeeFacultyDeleteView) {
  const { t } = useTranslation();
  const notification = useNotification();

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  const handleDelete = async () => {
    if (!employeeFaculty) {
      return null;
    }

    const response = await deleteEmployeeFaculty({
      id_users: employeeFaculty.id_users,
      id_faculty: employeeFaculty.id_faculty,
    });

    if (!response?.error) {
      notification.openNotification({
        type: 'success',
        message: response.data[0]?.sms ?? t('notify.succesDeleted'),
      });

      setLoading(false);
      setModal(false);
      refetchEmployeeFacultiesList();
    }

    if (response?.error) {
      notification.openNotification({
        type: 'error',
        message: response.data[0]?.sms ?? response.message ?? t('notify.error'),
      });

      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <>
      {notification.contextHolder}
      <Button
        onClick={handleModal}
        type="primary"
        size="small"
        danger
        className="grid place-items-center bg-red-700"
        icon={<DeleteIcon stroke="white" />}
      />

      <Modal open={modal} footer={null} width={460} onCancel={handleModal}>
        <div className="p-[20px_30px] grid gap-6 sm:p-[30px_0] sm:gap-5 justify-center">
          <p className="text-center text-[20px]"> {t('actions.delete') || ''}</p>
          <p className="text-center">{t('notify.deleteConfirm')}</p>
          <p
            style={{ borderTop: '1px solid var(--gray)', borderBottom: '1px solid var(--gray)' }}
            className="text-center text-[18px] p-[20px_0]"
          >
            {employeeFaculty?.faculty} <br />
            {employeeFaculty?.fio_emp}
          </p>
          <div className="flex justify-between gap-9">
            <Button
              danger
              size="large"
              type="primary"
              className="w-full"
              onClick={handleDelete}
              loading={loading}
            >
              {t('actions.delete')}
            </Button>
            <Button
              size="large"
              type="default"
              onClick={handleModal}
              className="w-full"
              loading={loading}
            >
              {t('actions.no')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
