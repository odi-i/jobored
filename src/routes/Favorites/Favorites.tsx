import { useEffect, useState } from 'react';
import styles from './Favorites.module.scss';
import axios from 'axios';
import { API_PATH, DATA } from '../../utils/constValues';
import { VacancyResponseProps } from '../../utils/interfaces';
import SingleVacancy from '../../components/SingleVacancy/SingleVacancy';
import { Pagination } from '@mantine/core';
import notFound from '../../assets/notFound.svg';
import VacancySkeleton from '../../components/Skeleton/VacancySkeleton/VacancySkeleton';

export default function Favorites() {
  const [activePage, setPage] = useState(1);
  const [isFavoritesChange, setIsFavoritesChange] = useState(false);
  const [isRerender, setIsRerender] = useState(false);
  const [data, setData] = useState<VacancyResponseProps>({
    objects: [],
    total: 0,
  });
  const [favorites, setFavorites] = useState<number[]>(
    localStorage.getItem(DATA.localeFavor) == null
      ? []
      : JSON.parse(localStorage.getItem(DATA.localeFavor) || '[]')
  );

  useEffect(() => {
    setFavorites(
      localStorage.getItem(DATA.localeFavor) == null
        ? []
        : JSON.parse(localStorage.getItem(DATA.localeFavor) || '[]')
    );
  }, [isFavoritesChange]);

  useEffect(() => {
    setIsRerender(true);
    let idArr = '';
    favorites.forEach((item, index) => {
      if (index != 0) idArr += '&';
      idArr += `ids[]=${item}`;
    });

    axios
      .get(API_PATH.vacancies + `?` + idArr, {
        headers: {
          'Content-Type': 'application/json',
          'x-secret-key': DATA.secretKey,
          'X-Api-App-Id': DATA.appId,
          Authorization: DATA.auth,
        },
      })
      .then((res) => setData(res.data))
      .then(() => setIsRerender(false))
      .catch((err) => console.log(err));
  }, [favorites]);

  window.addEventListener('custom-storage-event-name', () =>
    setIsFavoritesChange((v) => !v)
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.cards}>
        {!isRerender
          ? data.objects.map((item, index) => {
              return (
                <SingleVacancy key={index} objects={data.objects[index]} />
              );
            })
          : favorites.map((item, index) => {
              return <VacancySkeleton key={index} />;
            })}
        {!data.objects.length && !isRerender && (
          <div className={styles.notFound}>
            <img src={notFound} />
            <div className={styles.text}>Упс, здесь еще ничего нет!</div>
          </div>
        )}
      </div>
      <Pagination
        className={styles.pagination}
        value={activePage > Math.ceil(data.total / 4) ? 1 : activePage}
        onChange={(value) => setPage(value)}
        total={data.total > 500 ? 125 : Math.ceil(data.total / 4)}
      />
    </div>
  );
}
