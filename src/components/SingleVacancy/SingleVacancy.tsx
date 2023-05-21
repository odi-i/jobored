import styles from './SingleVacancy.module.scss';
import { ObjectProps } from '../../utils/interfaces';
import dot from '../../assets/dot.svg';
import place from '../../assets/place.svg';
import star from '../../assets/star.svg';
import activeStar from '../../assets/activeStar.svg';
import { Dispatch } from 'react';

export default function SingleVacancy({
  objects,
  favorites,
  setFavorites,
}: {
  objects: ObjectProps;
  favorites: number[];
  setFavorites: Dispatch<React.SetStateAction<number[]>>;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.profession}>{objects.profession}</div>
        <div className={styles.conditions}>
          <div className={styles.money}>
            {!(objects.payment_to === 0)
              ? `з/п от ${objects.payment_to} ${objects.currency}`
              : 'з/п не указана'}
          </div>
          <img src={dot} />
          <div className={styles.type_of_work}>
            {objects.type_of_work?.title == undefined
              ? ''
              : objects.type_of_work.title}
          </div>
        </div>
        <div className={styles.place}>
          <img src={place} />
          <div className={styles.town}>
            {objects.town?.title == undefined ? '' : objects.town.title}
          </div>
        </div>
      </div>
      <img
        className={styles.star}
        src={favorites.includes(objects.id) ? activeStar : star}
        onClick={
          favorites.includes(objects.id)
            ? () =>
                setFavorites(favorites.filter((item) => item !== objects.id))
            : () => setFavorites([...favorites, objects.id])
        }
      />
    </div>
  );
}

// setFavorites((v: number[]) => v.filter(v > 0))
