import styles from './Vacancies.module.scss';
import { VacanciesProps, VacancyResponseProps } from '../../utils/interfaces';
import { API_PATH, DATA } from '../../utils/constValues';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SingleVacancy from '../SingleVacancy/SingleVacancy';
import { Pagination } from '@mantine/core';

export default function Vacancies(props: VacanciesProps) {
  const [activePage, setPage] = useState(1);
  const [favorites, setFavorites] = useState<number[]>(
    localStorage.getItem(DATA.localeFavor) == null
      ? []
      : JSON.parse(localStorage.getItem(DATA.localeFavor) || '[]')
  );

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

  useEffect(() => {
    if (favorites.length !== 0) {
      localStorage.setItem(DATA.localeFavor, JSON.stringify(favorites));
    } 
  }, [favorites]);

  return (
    <div className={styles.wrapper}>
      {data.objects.map((item, index) => {
        return (
          <SingleVacancy
            key={index}
            objects={data.objects[index]}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        );
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
