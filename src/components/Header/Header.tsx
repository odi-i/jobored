import styles from './Header.module.scss';
import logo from '../../assets/unionLogo.svg';
import { NavLink } from 'react-router-dom';
import { Burger } from '@mantine/core';
import { useState } from 'react';

export default function Header() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const handleBurgerOnClick = () => {
    setIsOpened((v) => !v);
  };

  const handleNavLinkClick = () => {
    setIsOpened(false);
  };

  return (
    <>
      <header>
        <div className={styles.wrapper}>
          <NavLink to={'/'} className={styles.logo}>
            <img src={logo} />
            <h1 className={styles.text}>Jobored</h1>
          </NavLink>
          <Burger
            opened={isOpened}
            onClick={handleBurgerOnClick}
            className={styles.burger}
          />
          <div
            className={
              !isOpened
                ? styles.menu
                : [styles.menu, styles.menu_active].join(' ')
            }
          >
            <NavLink
              to="/"
              onClick={handleNavLinkClick}
              className={({ isActive }) =>
                isActive
                  ? ` ${styles['item']} ${styles['active']}`
                  : styles['item']
              }
            >
              Поиск Вакансий
            </NavLink>
            <NavLink
              to="/favorites"
              onClick={handleNavLinkClick}
              className={({ isActive }) =>
                isActive
                  ? ` ${styles['item']} ${styles['active']}`
                  : styles['item']
              }
            >
              Избранное
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
}
