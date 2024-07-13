import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IFaculty, useFacultiesList, useSetFacultiesList } from '~entities/institution/faculty';
import { FacultiesView } from '~entities/institution/faculty/ui';

import { useUser } from '~entities/shared/user';
import { FacultyAddView } from '~features/institution/faculty/add';
import { FacultyDeleteView } from '~features/institution/faculty/delete';
import { FacultyEditView } from '~features/institution/faculty/edit';

interface IFacultiesList {}

export function FacultiesList({}: IFacultiesList) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();

  const [activeFaculty, setActiveFaculty] = useState<IFaculty | null>(null);

  const facultiesList = useFacultiesList();
  const setFacultiesList = useSetFacultiesList();

  useEffect(() => {
    fetchFacultiesList();
  }, []);

  const fetchFacultiesList = () => {
    setIsLoading(true);
    setFacultiesList({ org_id: user?.org || 0 }).finally(() => setIsLoading(false));
  };

  return (
    <div className="grid gap-5">
      <div className="flex justify-end items-center">
        <FacultyAddView refetchFacultiesList={fetchFacultiesList} />
      </div>
      <FacultiesView
        faculties={facultiesList || []}
        setFaculty={setActiveFaculty}
        loading={isLoading}
        actionsSlot={
          <>
            <FacultyEditView refetchFacultiesList={fetchFacultiesList} faculty={activeFaculty} />
            <FacultyDeleteView refetchFacultiesList={fetchFacultiesList} faculty={activeFaculty} />
          </>
        }
      />
    </div>
  );
}
