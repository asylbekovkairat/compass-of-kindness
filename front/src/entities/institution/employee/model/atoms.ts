import {
  ApiEmployeeFacultiesRequest,
  ApiEmployeesRequest,
  getEmployeeFaculties,
  getEmployees,
} from '~entities/institution/employee/api';
import { IEmployee, IEmployeeFaculty } from '~entities/institution/employee/model/types';
import { atom, atomWithDefault } from '~shared/lib/atom-state';

export const employeesList = atomWithDefault<IEmployee[] | null>((_get) => null);
export const employeeFacultiesList = atomWithDefault<IEmployeeFaculty[] | null>((_get) => null);

export const setEmployeesList = atom<IEmployee[] | null, ApiEmployeesRequest, Promise<void>>(
  (get) => get(employeesList),
  async (_get, set, { id_org }) => {
    const response = await getEmployees({ id_org });
    const data = response.data;
    set(employeesList, data);
  }
);

export const setEmployeeFacultiesList = atom<
  IEmployeeFaculty[] | null,
  ApiEmployeeFacultiesRequest,
  Promise<void>
>(
  (get) => get(employeeFacultiesList),
  async (_get, set, { id_org }) => {
    const response = await getEmployeeFaculties({ id_org });
    const data = response.data;
    set(employeeFacultiesList, data);
  }
);
