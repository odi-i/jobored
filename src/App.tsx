import { Routes, Route } from 'react-router-dom';
import Layout from './routes/Layout/Layout';
import Search from './routes/Search/Search';
import axios from 'axios';
import { useEffect } from 'react';
import { API_PATH, DATA } from './utils/constValues';

function App() {
  useEffect(() => {
    axios
      .get(API_PATH.authorization, {
        headers: {
          'Content-Type': 'application/json',
          'x-secret-key': DATA.secretKey,
          'X-Api-App-Id': DATA.appId,
        },
      })
      .then((res) =>
        localStorage.setItem(DATA.localeAuth, res.data.access_token)
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" Component={Search}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
