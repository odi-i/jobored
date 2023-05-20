import { Routes, Route } from 'react-router-dom';
import Layout from './routes/Layout/Layout';
import Search from './routes/Search/Search';

function App() {
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
