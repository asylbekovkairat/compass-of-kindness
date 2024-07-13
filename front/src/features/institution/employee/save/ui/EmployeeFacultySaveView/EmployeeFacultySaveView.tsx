import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  IEmployeeFaculty,
  useEmployeesList,
  useSetEmployeesList,
} from '~entities/institution/employee';
import { EmployeesSelector } from '~entities/institution/employee/ui';
import { useFacultiesList, useSetFacultiesList } from '~entities/institution/faculty';
import { FacultySelector } from '~entities/institution/faculty/ui';
import { useUser } from '~entities/shared/user';
import {
  ApiEmployeeFacultySave,
  saveEmployeeFaculty,
} from '~features/institution/employee/save/api';
import { Button, Form, Modal, PencilIcon, Spin, SquarePlusIcon, useNotification } from '~shared/ui';

export interface IEmployeeFacultySaveViewProps {
  type: 'add' | 'edit';
  employeeFaculty?: IEmployeeFaculty | null;
  refetchEmployeeFacultiesList: any;
  disabled?: boolean;
}

export const EmployeeFacultySaveView: FC<IEmployeeFacultySaveViewProps> = ({
  type,
  employeeFaculty,
  refetchEmployeeFacultiesList,
  disabled,
}) => {
  const user = useUser();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const notification = useNotification();

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const employeesList = useEmployeesList();
  const setEmployeesList = useSetEmployeesList();

  const facultiesList = useFacultiesList();
  const setFacultiesList = useSetFacultiesList();

  useEffect(() => {
    if (type === 'edit' && employeeFaculty) {
      form.setFieldsValue({
        id_users: employeeFaculty.id_users,
        id_faculty: employeeFaculty.id_faculty,
      });
    }

    if (modal) {
      if (!employeesList) {
        setEmployeesList({});
      }

      if (!facultiesList) {
        setFacultiesList({ org_id: user?.org });
      }
    }
  }, [modal, employeeFaculty, type, form]);

  const handleSaveModal = () => {
    form.resetFields();
    setLoading(false);
    setModal(!modal);
  };

  const onFinish = async (fieldsData: ApiEmployeeFacultySave) => {
    const isAdd = type === 'add';
    setLoading(true);

    if (!isAdd && !employeeFaculty) {
      return null;
    }

    const userId = isAdd ? fieldsData.id_users : employeeFaculty?.id_users;

    const data = {
      id_users: userId || 0,
      id_faculty: fieldsData.id_faculty,
    };

    const response = await saveEmployeeFaculty(data);

    if (!response?.error) {
      notification.openNotification({
        message: response.data[0]?.sms ?? response.message ?? t('notify.succesSaved'),
        type: 'success',
      });

      refetchEmployeeFacultiesList();
      handleSaveModal();
    }

    if (response?.error) {
      notification.openNotification({
        message: response.message ?? t('notify.error'),
        type: 'error',
      });
    }

    setLoading(false);
  };

  const validateMessages = {
    required: t('notify.full'),
  };

  return (
    <>
      {notification.contextHolder}
      {type === 'add' ? (
        <Button
          onClick={handleSaveModal}
          disabled={disabled}
          type="primary"
          className="flex gap-[6px] items-center px-2 stroke-white fill-white disabled:stroke-stroke disabled:fill-stroke disabled:border-transparent"
        >
          <SquarePlusIcon />
          {t('employees:accessAdd')}
        </Button>
      ) : (
        <Button
          onClick={handleSaveModal}
          type="primary"
          size="small"
          className="grid place-items-center"
          icon={<PencilIcon className="fill-white" />}
        />
      )}
      <Modal open={modal} footer={null} width={580} onCancel={handleSaveModal} centered>
        <div className="p-[20px_30px] grid gap-6 sm:p-[30px_0] sm:gap-5">
          <p className="text-center text-[20px]">{t('employees:accessAdd')}</p>
          <Spin spinning={loading}>
            <Form
              autoComplete="off"
              onFinish={onFinish}
              validateMessages={validateMessages}
              form={form}
              className="grid gap-3.5"
            >
              <Form.Item name="id_users" rules={[{ required: true }]} className="m-0">
                <EmployeesSelector
                  employees={employeesList || []}
                  placeholder={t('employees:employee')}
                />
              </Form.Item>
              <Form.Item name="id_faculty" rules={[{ required: true }]} className="m-0">
                <FacultySelector faculties={facultiesList || []} placeholder={t('faculty:title')} />
              </Form.Item>
              <Button size="large" htmlType="submit" type="primary">
                {t('actions.save')}
              </Button>
            </Form>
          </Spin>
        </div>
      </Modal>
    </>
  );
};
