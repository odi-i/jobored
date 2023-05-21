import styles from './Search.module.scss';
import { useState } from 'react';
import Filters from '../../components/Filters/Filters';
import SearchBar from '../../components/SearchBar/SearchBar';
import Vacancies from '../../components/Vacancies/Vacancies';

export default function Search() {
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState({});

  return (
    <>
      <div className={styles.wrapper}>
        <Filters setForm={setFilters} />
        <div className={styles.main}>
          <SearchBar setSearch={setSearch} />
          <Vacancies filterValue={filters} searchValue={search} />
        </div>
      </div>
    </>
  );
}
