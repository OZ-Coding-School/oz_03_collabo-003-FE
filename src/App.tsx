import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import OwnerMyPage from './pages/OwnerMyPage';
import LogInPage from './pages/LogInPage';
import OwnerSiteDetailPage from './pages/OwnerSiteDetailPage';
import AnalystMyPage from './pages/AnalystMyPage';

// import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/mypage' element={<MyPage />} />.
        <Route path='/mypage/owner' element={<OwnerMyPage />} />
        <Route path='/mypage/owner/:contentId' element={<OwnerSiteDetailPage />} />
        <Route path='/mypage/analyst' element={<AnalystMyPage />} />
      </Route>
      <Route path='/login' element={<LogInPage />} />
      {/* <Route path='/signup' element={<SignUpPage />} /> */}
    </Routes>
  );
}

export default App;
