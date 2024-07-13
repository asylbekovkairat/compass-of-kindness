import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useEmployeeFacultiesList,
  useEmployeesList,
  useSetEmployeeFacultiesList,
  useSetEmployeesList,
} from '~entities/institution/employee';
import { EmployeesView } from '~entities/institution/employee/ui';
import { EmployeesFacultiesView } from '~entities/institution/employee/ui/EmployeesFacultiesView';
import { EmployeesSelector } from '~entities/institution/employee/ui/EmployeesSelector';
import {
  EmployeeDeleteView,
  EmployeeFacultyDeleteView,
} from '~features/institution/employee/delete';
import { EmployeeSaveView } from '~features/institution/employee/save';
import { EmployeeFacultySaveView } from '~features/institution/employee/save/ui/EmployeeFacultySaveView';
import { Segmented } from '~shared/ui';

enum EmployeesListTabs {
  EMPLOYEES = 'employees',
  FACULTIES = 'faculties',
}

export function EmployeesList() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<EmployeesListTabs>(EmployeesListTabs.EMPLOYEES);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [activeEmployee, setActiveEmployee] = useState(null);

  const employeesList = useEmployeesList();
  const setEmployeesList = useSetEmployeesList();

  const employeeFacultiesList = useEmployeeFacultiesList();
  const setEmployeeFacultiesList = useSetEmployeeFacultiesList();

  useEffect(() => {
    if (activeTab === EmployeesListTabs.EMPLOYEES) {
      refetchEmployeesList();
    }

    if (activeTab === EmployeesListTabs.FACULTIES) {
      refetchEmployeeFacultiesList();
    }
  }, [activeTab]);

  function refetchEmployeesList() {
    setIsLoading(true);
    setEmployeesList({}).finally(() => setIsLoading(false));
  }

  function refetchEmployeeFacultiesList() {
    setIsLoading(true);
    setEmployeeFacultiesList({}).finally(() => setIsLoading(false));
  }

  return (
    <div className="grid gap-5">
      <div className="w-full flex justify-between items-center gap-2">
        <div className="flex sm:gap-4 gap-6 items-center w-full">
          <Segmented
            size="large"
            onChange={setActiveTab}
            options={[
              { label: t('employees:employees'), value: EmployeesListTabs.EMPLOYEES },
              { label: t('employees:accessEmployees'), value: EmployeesListTabs.FACULTIES },
            ]}
          />
        </div>
        <div className="flex sm:gap-4 gap-6 items-center justify-end w-full">
          {activeTab === EmployeesListTabs.EMPLOYEES ? (
            <EmployeeSaveView type="add" refetchEmployeesList={refetchEmployeesList} />
          ) : null}
          {activeTab === EmployeesListTabs.FACULTIES ? (
            <>
              <EmployeesSelector
                allowClear
                placeholder={t('employees:employee')}
                onSelect={setSelectedEmployeeId}
                employees={employeesList || []}
                className="w-full"
              />
              <EmployeeFacultySaveView
                type="add"
                refetchEmployeeFacultiesList={refetchEmployeeFacultiesList}
              />
            </>
          ) : null}
        </div>
      </div>
      {activeTab === EmployeesListTabs.EMPLOYEES ? (
        <EmployeesView
          employees={employeesList || []}
          setEmployee={setActiveEmployee}
          loading={isLoading}
          actionsSlot={
            <>
              <EmployeeSaveView
                type="edit"
                refetchEmployeesList={refetchEmployeesList}
                employee={activeEmployee}
              />
              <EmployeeDeleteView
                refetchEmployeesList={refetchEmployeesList}
                employee={activeEmployee}
              />
            </>
          }
        />
      ) : null}
      {activeTab === EmployeesListTabs.FACULTIES ? (
        <EmployeesFacultiesView
          employeeFaculties={
            employeeFacultiesList
              ? employeeFacultiesList.filter(
                  (emp) => selectedEmployeeId !== null && emp.id_users === selectedEmployeeId
                )
              : []
          }
          setEmployeeFaculty={setActiveEmployee}
          loading={isLoading}
          actionsSlot={
            <>
              {/* <EmployeeFacultySaveView
                type="edit"
                employeeFaculty={activeEmployee}
                refetchEmployeeFacultiesList={refetchEmployeeFacultiesList}
              /> */}
              <EmployeeFacultyDeleteView
                refetchEmployeeFacultiesList={refetchEmployeeFacultiesList}
                employeeFaculty={activeEmployee}
              />
            </>
          }
        />
      ) : null}
    </div>
  );
}
