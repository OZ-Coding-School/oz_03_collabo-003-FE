import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';

const RedirectHandlerPage: React.FC = () => {
  const navigate = useNavigate();
  const { logIn } = useAuthStore((state) => ({ logIn: state.logIn }));

  useEffect(() => {
    // URL에서 쿼리 파라미터 추출
    const params = new URLSearchParams(window.location.search);
    const userId = parseInt(params.get('userId') || '', 10);
    const username = params.get('username') || '';
    const email = params.get('email') || '';

    if (userId && username && email) {
      // Zustand 스토어에 사용자 데이터 저장
      logIn(userId, username, email);
      alert('소셜로그인이 성공하였습니다. 홈으로 이동하시겠습니까?');
      // 로그인 성공 후 홈으로 리다이렉트
      navigate('/');
    } else {
      console.error('로그인 데이터가 부족합니다.');
      alert('소셜로그인에 실패하였습니다. 로그인 페이지로 이동합니다.');
      navigate('/login'); // 로그인 페이지로 리다이렉트
    }
  }, [navigate, logIn]);

  return <div>로그인 처리 중...</div>;
};

export default RedirectHandlerPage;
