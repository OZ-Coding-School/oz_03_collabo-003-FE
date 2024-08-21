import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import DetailedPage from './pages/DetailedPage';
import MyPage from './pages/MyPage';
import OwnerMyPage from './pages/OwnerMyPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import PasswordResetPage from './pages/PasswordResetPage';
import OwnerSiteDetailPage from './pages/OwnerSiteDetailPage';
import AnalystMyPage from './pages/AnalystMyPage';

import SiteRegistrationPage from './pages/SiteRegistrationPage';
import AnalyzePayMain from './components/specific/AnalyzePayMain';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/contents/:contentId' element={<DetailedPage />} />
        <Route path='/mypage' element={<MyPage />} />.
        <Route path='/mypage/owner' element={<OwnerMyPage />} />
        <Route path='/register' element={<SiteRegistrationPage />} />
        <Route path='/analyze' element={<AnalyzePayMain />} />
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
