import styles from './Header.module.scss';
import logo from '../../assets/Unionlogo.svg';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <header>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <img src={logo} />
            <h1 className={styles.text}>Jobored</h1>
          </div>
          <div className={styles.menu}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? ` ${styles['item']} ${styles['active']}`
                  : styles['item']
              }
              //   className={styles.item}
            >
              Поиск Вакансий
            </NavLink>
            <NavLink to="/favorites" className={styles.item}>
              Избранное
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
}
