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

      alert('소셜로그인에 성공하였습니다. 홈으로 이동합니다.');
      // alert가 사용자의 화면에 표시된 후에 홈으로 리다이렉트
      setTimeout(() => {
        navigate('/');
      }, 100); // 짧은 지연시간을 주어 alert이 화면에 표시될 시간을 확보
    } else {
      console.error('로그인 데이터가 부족합니다.');
      alert('소셜로그인에 실패하였습니다. 로그인 페이지로 이동합니다.');
      // alert가 사용자의 화면에 표시된 후에 로그인 페이지로 리다이렉트
      setTimeout(() => {
        navigate('/login');
      }, 100); // 짧은 지연시간을 주어 alert이 화면에 표시될 시간을 확보
    }
  }, [navigate, logIn]);

  return <div>로그인 처리 중...</div>;
};

export default RedirectHandlerPage;
