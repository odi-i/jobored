import { useEffect, useState } from 'react';
import styles from './Favorites.module.scss';
import { API_PATH, DATA } from '../../utils/constValues';
import { VacancyResponseProps } from '../../utils/interfaces';
import SingleVacancy from '../../components/SingleVacancy/SingleVacancy';
import { Pagination } from '@mantine/core';
import notFound from '../../assets/notFound.svg';
import VacancySkeleton from '../../components/Skeleton/VacancySkeleton/VacancySkeleton';
import $api from '../../utils/http/axios';

export default function Favorites() {
  const [activePage, setPage] = useState(1);
  const [isFavoritesChange, setIsFavoritesChange] = useState<boolean>(false);
  const [isRerender, setIsRerender] = useState(false);
  const [data, setData] = useState<VacancyResponseProps>({
    objects: [],
    total: 0,
  });

  useEffect(() => {
    const newFavor =
      localStorage.getItem(DATA.localeFavor) == null
        ? []
        : JSON.parse(localStorage.getItem(DATA.localeFavor) || '[]');

    if (data.objects.length && newFavor.length <= (activePage - 1) * 4)
      setPage((v) => v - 1);

    const newData = { ...data };
    newData.objects = data.objects.filter((item) => newFavor.includes(item.id));
    newData.total = newData.objects.length;

    setData(newData);
  }, [isFavoritesChange]);

  useEffect(() => {
    setIsRerender(true);
    const newFavor: number[] =
      localStorage.getItem(DATA.localeFavor) == null
        ? []
        : JSON.parse(localStorage.getItem(DATA.localeFavor) || '[]');
    if (newFavor.length) {
      let idArr = '';
      newFavor.forEach((item, index) => {
        if (index != 0) idArr += '&';
        idArr += `ids[]=${item}`;
      });

      $api
        .get(API_PATH.vacancies + `?published=1&` + idArr)
        .then((res) => setData(res.data))
        .then(() => setIsRerender(false))
        .catch((err) => console.log(err));
    } else {
      setIsRerender(false);
      setData({ objects: [], total: 0 });
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.cards}>
        {!isRerender
          ? data.objects
              .slice(4 * (activePage - 1), 4 * activePage)
              .map((item) => {
                return (
                  <SingleVacancy
                    key={item.id}
                    setIsHandleStar={setIsFavoritesChange}
                    objects={item}
                  />
                );
              })
          : (data.objects.length
              ? data.objects.slice(4 * (activePage - 1), 4 * activePage)
              : [0, 0, 0, 0]
            ).map((_item, index) => {
              return <VacancySkeleton key={index} />;
            })}
        {!data.objects.length && !isRerender && (
          <div className={styles.notFound}>
            <img alt={'Не найдено'} className={styles.img} src={notFound} />
            <div className={styles.text}>Упс, здесь еще ничего нет!</div>
          </div>
        )}
      </div>
      <Pagination
        className={styles.pagination}
        value={activePage}
        onChange={(value) => setPage(value)}
        total={Math.ceil(data.total / 4)}
      />
    </div>
  );
}
