import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import MyPageOwner from './pages/MyPageOwner';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/mypage/owner' element={<MyPageOwner />} />
      </Route>
    </Routes>
  );
}

export default App;
