import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IOrganizationInfo } from '~entities/institution/organization';
import { useUser } from '~entities/shared/user';
import { editOrganizationInfo } from '~features/institution/organization/edit/api';
import { Button, Form, InputKy, SaveIcon, Spin, useNotification } from '~shared/ui';

interface IOrganizationInfoEdit {
  organizationInfo: IOrganizationInfo | null;
  fetchOrganizationInfo: any;
}

interface IRowData {
  label: string;
  name: string;
  placeholder: string;
  disabled: boolean;
}

export function OrganizationInfoEdit({
  organizationInfo,
  fetchOrganizationInfo,
}: IOrganizationInfoEdit) {
  const { t } = useTranslation();
  const notification = useNotification();
  const user = useUser();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (organizationInfo && user) {
      const { okpo, ...dataOrganization } = organizationInfo;

      form.setFieldsValue({
        okpo: (user.okpo || okpo) ?? '',
        ...dataOrganization,
      });

      setIsLoading(false);
    }
  }, [organizationInfo, user]);

  const rows: IRowData[] = [
    {
      label: t('organization:table.okpo'),
      name: 'okpo',
      placeholder: '',
      disabled: true,
    },
    {
      label: t('organization:table.shortName'),
      name: 's_org',
      placeholder: '',
      disabled: false,
    },
    {
      label: t('organization:table.nameKy'),
      name: 'org_ky',
      placeholder: '',
      disabled: false,
    },
    {
      label: t('organization:table.nameRu'),
      name: 'org_ru',
      placeholder: '',
      disabled: false,
    },
    {
      label: t('organization:table.nameEn'),
      name: 'org_en',
      placeholder: '',
      disabled: false,
    },
    {
      label: t('organization:table.longitude'),
      name: 'longitude',
      placeholder: '',
      disabled: false,
    },
    {
      label: t('organization:table.latitude'),
      name: 'latitude',
      placeholder: '',
      disabled: false,
    },
  ];

  const onFinish = (fieldsData: any) => {
    setIsLoading(true);

    const data = {
      id_org: user?.org || 0,
      okpo: organizationInfo?.okpo || '',
      s_org: fieldsData.s_org,
      org_ru: fieldsData.org_ru,
      org_ky: fieldsData.org_ky,
      org_en: fieldsData.org_en,
      id_region: organizationInfo?.id_region || 0,
      id_district: organizationInfo?.id_district || 0,
      id_org_type: organizationInfo?.id_org_type || 0,
      longitude: fieldsData?.longitude || '',
      latitude: fieldsData?.latitude || '',
    };

    editOrganizationInfo(data)
      .then(() => {
        notification.openNotification({
          message: t('cm:notify.succesSaved'),
          type: 'success',
        });
      })
      .catch(() => {
        notification.openNotification({
          message: t('cm:notify.error'),
          type: 'error',
        });
      })
      .finally(() => {
        fetchOrganizationInfo();
        setIsLoading(false);
        setIsFormChanged(false);
      });
  };

  const onFormValuesChange = (data: any, values: IOrganizationInfo) => {
    if (!organizationInfo) {
      return null;
    }

    const key = Object.keys(data)[0];
    const value = Object.values(data)[0] as string;

    form.setFieldValue(key, value.toUpperCase());

    const { id_organization, ...dataOrganization } = organizationInfo as any;

    setIsFormChanged(
      Object.entries(values).some(([key, value]) => dataOrganization[key] !== value)
    );
  };

  return (
    <>
      {notification.contextHolder}
      <Form
        autoComplete="off"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={onFormValuesChange}
      >
        <Spin spinning={isLoading}>
          {rows.map((row) => (
            <div key={row.name} className="flex sm-[320px]:flex-wrap items-center mb-3">
              <p className="w-[130px] sm:mb-1 sm:ml-6">{row.label}</p>
              <div className="w-full min-w-[320px]">
                <Form.Item name={row.name} className="m-0">
                  <InputKy
                    displayButtons={row.name.endsWith('ky')}
                    placeholder={row.placeholder}
                    size="large"
                    disabled={row.disabled || isLoading}
                  />
                </Form.Item>
              </div>
            </div>
          ))}
        </Spin>
        <Button
          size="large"
          htmlType="submit"
          type="primary"
          className="float-right flex gap-1 items-center stroke-white fill-white disabled:stroke-stroke disabled:fill-stroke disabled:border-transparent"
          disabled={!isFormChanged}
        >
          <SaveIcon />
          {t('actions.save')}
        </Button>
      </Form>
    </>
  );
}
