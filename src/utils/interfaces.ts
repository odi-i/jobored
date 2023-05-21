import { Dispatch } from 'react';

export interface filtersProps {
  setForm: Dispatch<object>;
}
export interface searchBarProps {
  setSearch: Dispatch<object>;
}
export interface VacanciesProps {
  filterValue: object;
  searchValue: object;
}

export interface VacancyResponseProps {
  objects: ObjectProps[];
  total: number;
}

export interface ObjectProps {
  id: number;
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
