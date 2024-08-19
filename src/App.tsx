import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import MyPageOwner from './pages/MyPageOwner';
import LogInPage from './pages/LogInPage';
import DetailedPage from './pages/DetailedPage';
// import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/mypage/owner' element={<MyPageOwner />} />
        <Route path='/contents' element={<DetailedPage />}></Route>
      </Route>
      <Route path='/login' element={<LogInPage />} />
      {/* <Route path='/signup' element={<SignUpPage />} /> */}
    </Routes>
  );
}

export default App;
