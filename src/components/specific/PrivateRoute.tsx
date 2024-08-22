import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie'; // 쿠키에서 토큰을 가져오기 위한 라이브러리

// PrivateRoute 컴포넌트
const PrivateRoute: React.FC = () => {
  // 쿠키에서 access_token 확인
  const token = Cookies.get('access_token');

  // 토큰이 없다면 로그인 페이지로 리다이렉트
  if (!token) {
    return <Navigate to='/login' />;
  }

  // 토큰이 있으면 자식 컴포넌트를 렌더링 (즉, 보호된 페이지로 이동)
  return <Outlet />;
};

export default PrivateRoute;
