import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import MyPageOwner from './pages/MyPageOwner';
import LogInPage from './pages/LogInPage';
import MyPageOwnerSiteDetail from './pages/MyPageOwnerSiteDetail';
// import SignUpPage from './pages/SignUpPage';
import SiteRegistrationPage from './pages/SiteRegistrationPage';
import AnalyzePayMain from './components/specific/AnalyzePayMain';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/mypage/owner' element={<MyPageOwner />} />
        <Route path='/register' element={<SiteRegistrationPage />} />
        <Route path='/analyze' element={<AnalyzePayMain />} />
        <Route path='/mypage/owner/:contentId' element={<MyPageOwnerSiteDetail />} />
      </Route>
      <Route path='/login' element={<LogInPage />} />
      {/* <Route path='/signup' element={<SignUpPage />} /> */}
    </Routes>
  );
}

export default App;
