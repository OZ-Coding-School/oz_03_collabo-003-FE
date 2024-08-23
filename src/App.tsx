import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import DetailedPage from './pages/DetailedPage';
import CategoryPage from './pages/CategoryPage';
import MyPage from './pages/MyPage';
import OwnerMyPage from './pages/OwnerMyPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import PasswordResetPage from './pages/PasswordResetPage';
import OwnerSiteDetailPage from './pages/OwnerSiteDetailPage';
import AnalystMyPage from './pages/AnalystMyPage';

import PrivateRoute from './components/specific/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/contents/:contentId' element={<DetailedPage />} />
        <Route path='/category/:categorySlug' element={<CategoryPage />} />
        <Route path='/category/:categorySlug/:subCategorySlug' element={<CategoryPage />} />
        <Route element={<PrivateRoute />}>{/* 이 안에 인증된 사용자만 접근할 수 있는 라우트를 넣어주세요! */}</Route>
        <Route path='/mypage' element={<MyPage />} />.
        <Route path='/mypage/owner' element={<OwnerMyPage />} />
        <Route path='/mypage/owner/:id' element={<OwnerSiteDetailPage />} />
        <Route path='/mypage/analyst' element={<AnalystMyPage />} />
      </Route>
      <Route path='/login' element={<LogInPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/password-reset' element={<PasswordResetPage />} />
    </Routes>
  );
}

export default App;
