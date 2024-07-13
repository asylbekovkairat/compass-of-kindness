import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUser } from '~entities/shared/user';
import { addFaculty } from '~features/institution/faculty/add/api';
import {
  Button,
  Form,
  Input,
  InputKy,
  Modal,
  Spin,
  SquarePlusIcon,
  useNotification,
} from '~shared/ui';

export interface iFacultyAddViewProps {
  refetchFacultiesList: any;
}

export const FacultyAddView: FC<iFacultyAddViewProps> = ({ refetchFacultiesList }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const userInfo = useUser();
  const notification = useNotification();

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const handleAddModal = () => {
    setModal(!modal);
    form.resetFields();
    setLoading(false);
  };

  const onFinish = async (fieldsData: any) => {
    if (!userInfo) {
      return null;
    }

    const data = {
      id_org: userInfo?.org || 0,
      s_faculty: fieldsData.s_faculty,
      faculty_ky: fieldsData.faculty_ky,
      faculty_ru: fieldsData.faculty_ru,
      faculty_en: fieldsData.faculty_en,
    };

    setLoading(true);

    const response = await addFaculty(data);

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
    handleAddModal();
  };

  const trimWhitespace = (data: any, value: string) => {
    const trimmedValue = value?.trimStart() || '';
    const sanitizedValue = trimmedValue.replace(/\d/g, '');
    form.setFieldValue(`${data.field}`, sanitizedValue);

    if (sanitizedValue.length === 0) {
      return Promise.reject(t('notify.full'));
    }

    return Promise.resolve(sanitizedValue);
  };

  const validateMessages = {
    required: t('notify.full'),
  };

  return (
    <>
      <Button
        onClick={handleAddModal}
        type="primary"
        className="flex gap-[6px] items-center px-2 stroke-white fill-white disabled:stroke-stroke disabled:fill-stroke disabled:border-transparent"
      >
        <SquarePlusIcon />
        {t('faculty:add')}
      </Button>
      <Modal open={modal} footer={null} width={580} onCancel={handleAddModal} centered>
        <div className="p-[20px_30px] grid gap-6 sm:p-[30px_0] sm:gap-5">
          <p className="text-center text-[20px]">{t('faculty:add')}</p>
          <Spin spinning={loading}>
            <Form
              autoComplete="off"
              onFinish={onFinish}
              validateMessages={validateMessages}
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
