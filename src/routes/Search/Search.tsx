import { useEffect, useState } from 'react';
import Filters from '../../components/Filters/Filters';
import styles from './Search.module.scss';
import axios from 'axios';
import { API_PATH, DATA } from '../../utils/constValues';

export default function Search() {
  const [form, setForm] = useState({});
  console.log(form);

  useEffect(() => {
    axios
      .get(API_PATH.authorization, {
        headers: {
          'Content-Type': 'application/json',
          'x-secret-key': DATA.secretKey,
          'X-Api-App-Id': DATA.appId,
        },
      })
      .then((res) => localStorage.setItem(DATA.locale, res.data.access_token))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <Filters setForm={setForm} />
      </div>
    </>
  );
}
