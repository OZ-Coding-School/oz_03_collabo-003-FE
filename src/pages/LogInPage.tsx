// src/pages/LogInPage.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import googleLogo from '../../public/images/google-logo.png';
import kakaoLogo from '../../public/images/kakao-logo.png';
import naverLogo from '../../public/images/naver-logo.png';

interface LogInInputs {
  email: string;
  password: string;
}

interface SocialLoginButtonProps {
  provider: string;
  logo: string;
  redirectUrl: string;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ provider, logo, redirectUrl }) => (
  <a href={redirectUrl} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
    <img src={logo} alt={`${provider} 로그인`} style={{ width: '40px', height: '40px' }} />
  </a>
);

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LogInInputs>();

  // 일반 로그인 처리 함수
  const loginUser = (data: LogInInputs) => {
    return axios.post('/api/v1/users/login', data);
  };

  const onSubmit: SubmitHandler<LogInInputs> = async (data) => {
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      console.log('로그인 성공:', response.data);
      // 로그인 성공 후 홈페이지로 리다이렉트
      window.location.href = '/';
    } catch (error: any) {
      if (error.response?.data?.message) {
        const errorMessage = error.response.data.message;
        // 백엔드에서 에러 메세지 설정. 현재는 "Invalid email", "Invalid password"
        if (errorMessage === 'Invalid email') {
          setError('email', {
            type: 'manual',
            message: '잘못된 이메일 주소입니다.',
          });
        } else if (errorMessage === 'Invalid password') {
          setError('password', {
            type: 'manual',
            message: '잘못된 비밀번호입니다.',
          });
        }
      } else {
        console.error('로그인 에러:', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const apiUrl = import.meta.env.API_URL || 'http://localhost:5173';

  return (
    <div>
      <h2>ALL THE</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='email'>이메일</label>
          <input
            type='email'
            id='email'
            placeholder='이메일을 입력하세요.'
            {...register('email', {
              required: '이메일을 입력하세요.',
              pattern: {
                value: /^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '잘못된 이메일 주소입니다.',
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor='password'>비밀번호</label>
          <input
            type='password'
            id='password'
            placeholder='비밀번호를 입력하세요.'
            {...register('password', {
              required: '비밀번호를 입력하세요.',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/,
                message: '비밀번호는 8-15자 영문/숫자 또는 특수문자 조합이어야 합니다.',
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type='submit' disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
      </form>
      <div>
        <h2>소셜 로그인</h2>
        <div>
          <SocialLoginButton
            provider='Google'
            logo={googleLogo}
            redirectUrl={`${apiUrl}/api/v1/users/login/google?redirect_uri=${window.location.origin}/accounts/google/login/callback/`}
          />
          <SocialLoginButton
            provider='Kakao'
            logo={kakaoLogo}
            redirectUrl={`${apiUrl}/api/v1/users/login/kakao?redirect_uri=${window.location.origin}/accounts/kakao/login/callback/`}
          />
          <SocialLoginButton
            provider='Naver'
            logo={naverLogo}
            redirectUrl={`${apiUrl}/api/v1/users/login/naver?redirect_uri=${window.location.origin}/accounts/naver/login/callback/`}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
