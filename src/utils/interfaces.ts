import { Dispatch } from 'react';

export interface filtersProps {
  setForm: Dispatch<object>;
}

export interface VacanciesProps {
  objects: ObjectProps;
  page: number;
  count: number;
}

export interface ObjectProps {
  profession: string;
  firm_name: string;
  town: {
    title: string;
  };
  type_of_work: {
    title: string;
  };
  payment_to: number;
  payment_from: number;
  currency: string;
}
