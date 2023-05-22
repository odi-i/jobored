import { Routes, Route } from 'react-router-dom';
import Layout from './routes/Layout/Layout';
import Search from './routes/Search/Search';
import axios from 'axios';
import { useEffect } from 'react';
import { API_PATH, DATA } from './utils/constValues';
import FullVacancy from './components/FullVacancy/FullVacancy';
import { SkeletonTheme } from 'react-loading-skeleton';
import Favorites from './routes/Favorites/Favorites';

function App() {
  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem(DATA.localeAuth) || '{}').ttl <
        Date.now() / 1000 ||
      !localStorage.getItem(DATA.localeAuth)
    ) {
      axios
        .get(API_PATH.authorization, {
          headers: {
            'Content-Type': 'application/json',
            'x-secret-key': DATA.secretKey,
            'X-Api-App-Id': DATA.appId,
          },
        })
        .then((res) =>
          localStorage.setItem(
            DATA.localeAuth,
            JSON.stringify({
              access_token: res.data.access_token,
              ttl: res.data.ttl,
            })
          )
        )
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <SkeletonTheme>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" Component={Search}></Route>
            <Route path="/vacancy/:id" Component={FullVacancy}></Route>
            <Route path="/favorites" Component={Favorites}></Route>
          </Route>
        </Routes>
      </SkeletonTheme>
    </>
  );
}

export default App;
