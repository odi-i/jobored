import styles from './Vacancies.module.scss';
import { VacanciesProps, VacancyResponseProps } from '../../utils/interfaces';
import { API_PATH, DATA } from '../../utils/constValues';
import { useEffect, useState, useSyncExternalStore } from 'react';
import axios from 'axios';
import SingleVacancy from '../SingleVacancy/SingleVacancy';
import { Pagination } from '@mantine/core';

export default function Vacancies(props: VacanciesProps) {
  const [activePage, setPage] = useState(1);

  //   window.addEventListener('custom-storage-event-name', () => console.log(1));

  const [data, setData] = useState<VacancyResponseProps>({
    objects: [],
    total: 0,
  });

  useEffect(() => {
    axios
      .get(API_PATH.vacancies + `?page=${activePage - 1}&count=4&published=1`, {
        headers: {
          'Content-Type': 'application/json',
          'x-secret-key': DATA.secretKey,
          'X-Api-App-Id': DATA.appId,
          Authorization: DATA.auth,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [activePage]);

  return (
    <div className={styles.wrapper}>
      {data.objects.map((item, index) => {
        return <SingleVacancy key={index} objects={data.objects[index]} />;
      })}
      <Pagination
        className={styles.pagination}
        value={activePage}
        onChange={(value) => setPage(value)}
        total={data.total > 500 ? 125 : Math.ceil(data.total / 4)}
      />
    </div>
  );
}
