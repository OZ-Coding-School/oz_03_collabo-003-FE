import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface LogInInputs {
  email: string;
  password: string;
}

interface SocialLoginButtonProps {
  provider: string;
  logo: string;
  redirectUrl: string;
}

const baseUrl = import.meta.env.VITE_API_URL;

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ provider, logo, redirectUrl }) => (
  <a href={redirectUrl} className='mx-6 inline-block transform hover:scale-110'>
    <img src={logo} alt={`${provider} 로그인`} style={{ width: '50px', height: '50px' }} />
  </a>
);

const LogInPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 시각화 상태
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LogInInputs>();
  const navigate = useNavigate();
  const { logIn } = useAuthStore((state) => ({ logIn: state.logIn }));

  const loginUser = (data: LogInInputs) => {
    return axios.post(`${baseUrl}/accounts/login/`, data, { withCredentials: true });
  };

  const handleLoginSuccess = (userId: number, username: string, email: string) => {
    logIn(userId, username, email);
    console.log('Login successful!');
    navigate('/');
  };

  const onSubmit: SubmitHandler<LogInInputs> = async (data: LogInInputs) => {
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      console.log('로그인 성공:', response.data);
      const { userId, username, email } = response.data;
      handleLoginSuccess(userId, username, email);
    } catch (error: any) {
      if (error.response?.data?.message) {
        const errorMessage = error.response.data.message;
        switch (errorMessage) {
          case 'Invalid email':
            setError('email', {
              type: 'manual',
              message: '잘못된 이메일 주소입니다.',
            });
            break;
          case 'Invalid password':
            setError('password', {
              type: 'manual',
              message: '잘못된 비밀번호입니다.',
            });
            break;
          default:
            console.error('알 수 없는 에러:', errorMessage);
            break;
        }
      } else {
        console.error('로그인 에러:', error.message || '알 수 없는 에러');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 소셜 로그인 버튼의 리다이렉트 URL 설정
  const googleLoginUrl = `${baseUrl}/accounts/google/login/`;
  // const kakaoLoginUrl = 'http://127.0.0.1:8000/accounts/kakao/login';
  const kakaoLoginUrl = `${baseUrl}/accounts/kakao/login/`;
  const naverLoginUrl = `${baseUrl}/accounts/naver/login/`;

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <a href='/' className='mb-6 h-[50px] w-[150px] text-[40px] font-bold text-blue-primary'>
        ALLTHE
      </a>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-lg rounded-lg p-8'>
        <div className='mb-6'>
          <label htmlFor='email' className='block text-sm font-medium'>
            이메일
          </label>
          <input
            className='mt-2 block h-[50px] w-full rounded-[5px] border border-gray-c4 px-[15px] py-4 text-[16px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary'
            type='email'
            id='email'
            disabled={isLoading} // 로딩 중일 때 비활성화
            placeholder='이메일을 입력하세요.'
            {...register('email', {
              required: '이메일을 입력하세요.',
              pattern: {
                value: /^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '잘못된 이메일 주소입니다.',
              },
            })}
          />
          {errors.email && <p className='mt-2 text-sm text-red'>{errors.email.message}</p>}
        </div>
        <div className='mb-14'>
          <label htmlFor='password' className='block text-sm font-medium'>
            비밀번호
          </label>
          <div className='relative'>
            <input
              className='mt-2 block h-[50px] w-full rounded-[5px] border border-gray-c4 px-[15px] py-4 text-[16px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary'
              type={showPassword ? 'text' : 'password'} // 비밀번호 표시 여부
              id='password'
              disabled={isLoading} // 로딩 중일 때 비활성화
              placeholder='비밀번호를 입력하세요.'
              {...register('password', {
                required: '비밀번호를 입력하세요.',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/,
                  message: '비밀번호는 8-15자 영문/숫자 또는 특수문자 조합이어야 합니다.',
                },
              })}
            />
            <button
              type='button'
              className='absolute inset-y-0 right-0 flex items-center pr-3'
              onClick={() => setShowPassword(!showPassword)} // 클릭 시 비밀번호 표시/숨김 전환
            >
              {/* 비밀번호 표시 상태에 따라 아이콘 변경 */}
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className='mt-2 text-sm text-red'>{errors.password.message}</p>}
        </div>

        <button
          className={`flex h-[50px] w-full items-center justify-center rounded-xl font-semibold text-white shadow-custom-light ${isLoading ? 'bg-blue-hover' : 'bg-blue-primary hover:bg-blue-hover'} `}
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
      </form>
      <div className='mb-8 mt-4 text-center'>
        <h2 className='text-l mb-4 font-bold'>소셜 로그인</h2>
        <div className='flex justify-center'>
          <SocialLoginButton provider='Google' logo='/images/google-logo.png' redirectUrl={googleLoginUrl} />
          <SocialLoginButton provider='Kakao' logo='/images/kakao-logo.png' redirectUrl={kakaoLoginUrl} />
          <SocialLoginButton provider='Naver' logo='/images/naver-logo.png' redirectUrl={naverLoginUrl} />
        </div>
      </div>
      <div className='mt-4 flex space-x-4'>
        <a href='/signup' className='hover:text-blue-primary'>
          이메일로 회원가입하기
        </a>
        <span>|</span>
        <a href='/password-reset' className='hover:text-blue-primary'>
          비밀번호 찾기
        </a>
      </div>
    </div>
  );
};

export default LogInPage;
