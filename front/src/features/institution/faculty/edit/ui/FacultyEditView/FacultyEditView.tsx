import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IFaculty } from '~entities/institution/faculty';
import { useUser } from '~entities/shared/user';
import { ApiFacultyAddData } from '~features/institution/faculty/add/api';
import { editFaculty } from '~features/institution/faculty/edit/api';
import { Button, Form, Input, InputKy, Modal, PencilIcon, Spin, useNotification } from '~shared/ui';

export interface iFacultyEditViewProps {
  refetchFacultiesList: any;
  faculty: IFaculty | null;
}

export const FacultyEditView: FC<iFacultyEditViewProps> = ({ refetchFacultiesList, faculty }) => {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const userInfo = useUser();
  const notification = useNotification();

  const [facultyInitial, setFacultyInitial] = useState<any>();
  const [isFormChanged, setIsFormChanged] = useState(false);

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (faculty && modal) {
      const data = {
        s_faculty: faculty.s_faculty,
        faculty_ky: faculty.faculty_ky,
        faculty_ru: faculty.faculty_ru,
        faculty_en: faculty.faculty_en,
      };

      form.setFieldsValue(data);
      setFacultyInitial(data);
      setLoading(false);
    }
  }, [faculty, modal]);

  const handleEditModal = () => {
    setModal(!modal);
  };

  const onFinish = async (fieldsData: ApiFacultyAddData) => {
    if (!userInfo || !faculty) {
      return null;
    }

    const data = {
      id_org: userInfo?.org || 0,
      id_faculty: faculty.id_faculty,
      s_faculty: fieldsData.s_faculty,
      faculty_ky: fieldsData.faculty_ky,
      faculty_ru: fieldsData.faculty_ru,
      faculty_en: fieldsData.faculty_en,
    };

    setLoading(true);

    const response = await editFaculty(data);

    if (response?.data[0]?.id > 0) {
      notification.openNotification({
        message: t('notify.succesSaved'),
        type: 'success',
      });

      setLoading(false);
      setModal(false);
      refetchFacultiesList();
    }

    if (response?.data[0]?.id === null) {
      notification.openNotification({
        message: response.data[0]?.sms ?? response.message,
        type: 'warning',
      });

      setLoading(false);
    }

    if (response?.error) {
      notification.openNotification({
        message: response.message ?? t('notify.error'),
        type: 'error',
      });

      setLoading(false);
    }

    setLoading(false);
    handleEditModal();
  };

  const onFormValuesChange = (_: any, values: any) => {
    if (!faculty) {
      return null;
    }

    setIsFormChanged(
      Object.entries(values).some(([key, value]) => (facultyInitial as any)[key] !== value)
    );
  };

  const trimWhitespace = (data: any, value: string) => {
    const trimmedValue = value?.trimStart() || '';
    form.setFieldValue(`${data.field}`, trimmedValue);

    if (trimmedValue.length === 0) {
      return Promise.reject(t('notify.full'));
    }

    return Promise.resolve(trimmedValue);
  };

  const validateMessages = {
    required: t('notify.full'),
  };

  return (
    <>
      <Button
        onClick={handleEditModal}
        type="primary"
        size="small"
        className="grid place-items-center"
        icon={<PencilIcon className="fill-white" />}
      />
      <Modal open={modal} footer={null} width={580} onCancel={handleEditModal} centered>
        <div className="p-[20px_30px] grid gap-6 sm:p-[30px_0] sm:gap-5">
          <p className="text-center text-[20px]">{t('faculty:title')}</p>
          <Spin spinning={loading}>
            <Form
              autoComplete="off"
              onFinish={onFinish}
              validateMessages={validateMessages}
              onValuesChange={onFormValuesChange}
              form={form}
              className="grid gap-3.5"
            >
              <Form.Item
                name="s_faculty"
                rules={[{ required: true, validator: trimWhitespace }]}
                className="m-0"
              >
                <Input placeholder={t('faculty:short_title') ?? ''} />
              </Form.Item>
              <Form.Item
                name="faculty_ky"
                rules={[{ required: true, validator: trimWhitespace }]}
                className="m-0"
              >
                <InputKy placeholder={t('faculty:title_ky') ?? ''} />
              </Form.Item>
              <Form.Item
                name="faculty_ru"
                rules={[{ required: true, validator: trimWhitespace }]}
                className="m-0"
              >
                <Input placeholder={t('faculty:title_ru') ?? ''} />
              </Form.Item>
              <Form.Item
                name="faculty_en"
                rules={[{ required: true, validator: trimWhitespace }]}
                className="m-0"
              >
                <Input placeholder={t('faculty:title_en') ?? ''} />
              </Form.Item>
              <Button size="large" htmlType="submit" type="primary" disabled={!isFormChanged}>
                {t('actions.save')}
              </Button>
            </Form>
          </Spin>
        </div>
      </Modal>
    </>
  );
};
