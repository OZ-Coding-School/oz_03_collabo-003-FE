import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/store'; // zustand 스토어 import

const PrivateRoute: React.FC = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // 로그인이 안 되어 있다면 로그인 페이지로 리다이렉트
  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }

  // 로그인이 되어 있다면 자식 컴포넌트 렌더링
  return <Outlet />;
};

export default PrivateRoute;
