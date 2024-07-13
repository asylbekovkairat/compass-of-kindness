import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IFaculty } from '~entities/institution/faculty';
import { deleteFaculty } from '~features/institution/faculty/delete/api';
import { DynamicLocaleType } from '~features/shared/locale/set-locale/model';

import { Button, DeleteIcon, Modal, useNotification } from '~shared/ui';

interface IFacultyDeleteView {
  refetchFacultiesList: () => void;
  faculty: IFaculty | null;
}

export function FacultyDeleteView({ refetchFacultiesList, faculty }: IFacultyDeleteView) {
  const { t, i18n } = useTranslation();
  const notification = useNotification();

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  const handleDelete = async () => {
    if (!faculty) {
      return null;
    }

    const response = await deleteFaculty({
      id_faculty: faculty?.id_faculty,
    });

    if (!response?.error) {
      notification.openNotification({
        type: 'success',
        message: response.data[0]?.sms ?? t('notify.succesDeleted'),
      });

      setLoading(false);
      setModal(false);
      refetchFacultiesList();
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
          <p className="text-center text-[20px]"> {t('faculty:delete') || ''}</p>
          <p className="text-center">{t('notify.deleteConfirm')}</p>
          <p
            style={{ borderTop: '1px solid var(--gray)', borderBottom: '1px solid var(--gray)' }}
            className="text-center text-[18px] p-[20px_0]"
          >
            {faculty?.[`faculty_${i18n.language as DynamicLocaleType}`]}
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
