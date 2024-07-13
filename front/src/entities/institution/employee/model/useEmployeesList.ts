import { useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

import {
  employeeFacultiesList,
  employeesList,
  setEmployeeFacultiesList,
  setEmployeesList,
} from '~entities/institution/employee/model/atoms';

export const useEmployeesList = () => {
  return useAtomValue(employeesList);
};

export const useSetEmployeesList = () => {
  return useSetAtom(setEmployeesList);
};

export const useResetEmployeesList = () => {
  return useResetAtom(employeesList);
};

export const useEmployeeFacultiesList = () => {
  return useAtomValue(employeeFacultiesList);
};

export const useSetEmployeeFacultiesList = () => {
  return useSetAtom(setEmployeeFacultiesList);
};

export const useResetEmployeeFacultiesList = () => {
  return useResetAtom(employeeFacultiesList);
};
