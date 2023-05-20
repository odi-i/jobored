import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styles from './Layout.module.scss';

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
