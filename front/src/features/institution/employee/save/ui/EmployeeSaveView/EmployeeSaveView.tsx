import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IEmployee } from '~entities/institution/employee';
import { ApiEmployeeSave, saveEmployee } from '~features/institution/employee/save/api';
import { timezoneDayjs } from '~shared/lib/utils';
import { checkIsNumber, checkPins } from '~shared/lib/validation';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputKy,
  Modal,
  PencilIcon,
  Spin,
  SquarePlusIcon,
  useNotification,
} from '~shared/ui';

const phonePrefix = '996';

export interface iEmployeeSaveViewProps {
  type: 'add' | 'edit';
  employee?: IEmployee | null;
  refetchEmployeesList: any;
  disabled?: boolean;
}

export const EmployeeSaveView: FC<iEmployeeSaveViewProps> = ({
  type,
  employee,
  refetchEmployeesList,
  disabled,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const notification = useNotification();

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (type === 'edit' && employee) {
      let phoneNumber = employee.telephone || '';

      if (phoneNumber.startsWith('+996')) {
        phoneNumber = phoneNumber.slice(4);
      }

      if (phoneNumber.startsWith('996')) {
        phoneNumber = phoneNumber.slice(3);
      }

      if (phoneNumber.startsWith('0')) {
        phoneNumber = phoneNumber.slice(1);
      }

      form.setFieldsValue({
        pin: employee.pin,
        birth_date: timezoneDayjs(employee.birth_date),
        email: employee.email,
        name: employee.name,
        surname: employee.surname,
        patronymic: employee.patronymic,
        telephone: phoneNumber,
      });
    }
  }, [modal, employee, type, form]);

  const handleSaveModal = () => {
    form.resetFields();
    setLoading(false);
    setModal(!modal);
  };

  const onFinish = async (fieldsData: ApiEmployeeSave) => {
    const isAdd = type === 'add';
    setLoading(true);

    if (!isAdd && !employee) {
      return null;
    }

    const userId = isAdd ? 0 : employee?.id_users;

    const data = {
      id_users: userId,
      surname: fieldsData.surname,
      name: fieldsData.name,
      patronymic: fieldsData.patronymic,
      birth_date: timezoneDayjs(fieldsData.birth_date).format('YYYY-MM-DD'),
      pin: Number(fieldsData.pin),
      active: fieldsData.active,
      okpo: fieldsData.okpo,
      email: fieldsData.email,
      telephone: Number(`${phonePrefix}${fieldsData.telephone}`),
    };

    const response = await saveEmployee(data);

    if (!response?.error) {
      notification.openNotification({
        message: response.data[0]?.sms ?? response.message ?? t('notify.succesSaved'),
        type: 'success',
      });

      refetchEmployeesList();
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

  const onSetBirthDate = (e: ChangeEvent<HTMLInputElement>) => {
    const pin = e.target.value;

    if (pin.length !== 14) {
      return null;
    }

    const day = pin.substr(1, 2);
    const month = pin.substr(3, 2);
    const birthYear = pin.substr(5, 4);
    const formattedBirthDate = timezoneDayjs(`${birthYear}-${month}-${day}`, 'YYYY-MM-DD');

    form.setFieldValue('birth_date', formattedBirthDate);
  };

  const onSetPin = (date: any) => {
    const pin = form.getFieldValue('pin') as string;
    const formattedBirthDate = timezoneDayjs(date);
    const birthday = formattedBirthDate.format('DDMMYYYY');

    if (date === null || !pin) {
      return null;
    }

    form.setFieldValue('pin', `${pin[0] ?? 1}${birthday}${pin.substr(9, 5)}`);
  };

  const checkPin = (_: any, value: string) => {
    const number = checkIsNumber(value);
    const checkedPin = checkPins(number);

    form.setFieldValue('pin', checkedPin);

    if (!number || number.length < 14) {
      return Promise.reject(new Error(t('notify.pinLength') || ''));
    }

    return Promise.resolve();
  };

  const trimWhitespace = (data: any, value: string) => {
    const trimmedValue = value?.trim() || '';
    form.setFieldValue(`${data.field}`, trimmedValue);

    if (trimmedValue.length === 0) {
      return Promise.reject(t('notify.full'));
    }

    return Promise.resolve(trimmedValue);
  };

  const validatePhone = (data: any, value: string) => {
    const number = checkIsNumber(value);
    const inputOrigin = String(number?.slice(0, 9));
    let input = inputOrigin;
    const arrInput = input.split('');

    if (['0']?.indexOf(arrInput[0]) === 0) {
      input = input?.slice(1, 11);
      form.setFieldValue([data.field], input);
    } else {
      form.setFieldValue([data.field], inputOrigin);
    }

    if (!number || number.length < 9) {
      return Promise.reject(new Error());
    }

    return Promise.resolve();
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
          {t('employees:employeeAdd')}
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
          <p className="text-center text-[20px]">{t('employees:employeeAdd')}</p>
          <Spin spinning={loading}>
            <Form
              autoComplete="off"
              onFinish={onFinish}
              validateMessages={validateMessages}
              form={form}
              className="grid gap-3.5"
            >
              <Form.Item
                name="surname"
                rules={[{ required: true, validator: trimWhitespace }]}
                className="m-0"
              >
                <Input placeholder={t('employees:surname') ?? ''} />
              </Form.Item>
              <Form.Item
                name="name"
                rules={[{ required: true, validator: trimWhitespace }]}
                className="m-0"
              >
                <InputKy placeholder={t('employees:name') ?? ''} />
              </Form.Item>
              <Form.Item
                name="patronymic"
                rules={[{ required: true, validator: trimWhitespace }]}
                className="m-0"
              >
                <Input placeholder={t('employees:patronymic') ?? ''} />
              </Form.Item>
              <Form.Item
                name="pin"
                rules={[{ required: true, validator: checkPin }]}
                className="m-0"
              >
                <Input
                  placeholder={t('employees:pin') ?? ''}
                  onChange={onSetBirthDate}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </Form.Item>
              <Form.Item name="birth_date" rules={[{ required: true }]} className="m-0">
                <DatePicker
                  placeholder={t('employees:birthday') ?? ''}
                  onChange={onSetPin}
                  format="DD.MM.YYYY"
                  className="w-full"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[{ required: true, validator: trimWhitespace }]}
                className="m-0"
              >
                <Input placeholder={t('employees:email') ?? ''} />
              </Form.Item>
              <Form.Item
                name="telephone"
                rules={[{ required: true, validator: validatePhone }]}
                className="m-0"
              >
                <Input
                  addonBefore="996"
                  placeholder={t('employees:phone') ?? ''}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
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
