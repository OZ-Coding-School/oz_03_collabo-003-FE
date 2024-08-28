import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import DetailedPage from './pages/DetailedPage';
import CategoryPage from './pages/CategoryPage';
import MyPage from './pages/MyPage';
import OwnerMyPage from './pages/OwnerMyPage';
import LogInPage from './pages/LogInPage';
import OwnerSiteDetailPage from './pages/OwnerSiteDetailPage';
import AnalystMyPage from './pages/AnalystMyPage';
import SignUpPage from './pages/SignUpPage';
import PasswordResetPage from './pages/PasswordResetPage';
import SiteRegistrationPage from './pages/SiteRegistrationPage';
import AnalystRequestPage from './pages/AnalystRequestPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/contents/:contentId' element={<DetailedPage />} />
        <Route path='/category/:categorySlug' element={<CategoryPage />} />
        <Route path='/category/:categorySlug/:subCategorySlug' element={<CategoryPage />} />
        {/* <Route path='/contents/:contentId' element={<DetailedPage />} /> */}
        <Route path='/mypage' element={<MyPage />} />.
        <Route path='/mypage/owner' element={<OwnerMyPage />} />
        <Route path='/mypage/owner/:id' element={<OwnerSiteDetailPage />} />
        <Route path='/mypage/analyst' element={<AnalystMyPage />} />
        <Route path='/register' element={<SiteRegistrationPage />} />
        <Route path='/analyze' element={<AnalystRequestPage />} />
      </Route>
      <Route path='/login' element={<LogInPage />} />
      <Route path='/redirect' element={<RedirectHandlerPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/password-reset' element={<PasswordResetPage />} />
    </Routes>
  );
}

export default App;
