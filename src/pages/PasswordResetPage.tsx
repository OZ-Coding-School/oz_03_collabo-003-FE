import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios, { isAxiosError } from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // 아이콘 임포트

interface PasswordResetInputs {
  email: string;
  password: string;
}

const PasswordResetPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 시각화 상태
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<PasswordResetInputs>();

  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();

  // URL에서 token과 email 쿼리 파라미터를 추출
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const emailFromQuery = queryParams.get('email');

  console.log('Token from URL:', token); // Token 확인용

  useEffect(() => {
    // 만약 토큰이 있고 이메일이 쿼리 파라미터로 있으면 이메일 필드를 채움
    if (token && emailFromQuery) {
      setValue('email', emailFromQuery);
      setIsEmailSent(true);
    }
  }, [token, emailFromQuery, setValue]);

  const sendPasswordResetEmail = async (email: string) => {
    return axios.post(`${baseUrl}/accounts/password-reset/`, { email });
  };
  const resetPassword = async (data: PasswordResetInputs) => {
    return axios.post(`${baseUrl}/accounts/password-reset/confirm/?token=${token}`, {
      password: data.password,
    });
  };
  const onSubmit: SubmitHandler<PasswordResetInputs> = async (data) => {
    setIsLoading(true);
    try {
      if (!isEmailSent) {
        // Step 1: 이메일 전송
        await sendPasswordResetEmail(data.email);
        setIsEmailSent(true); // 이메일 전송 성공 시, 다음 단계로 진행
        alert('비밀번호 재설정 이메일이 발송되었습니다.');
      } else {
        // Step 2: 비밀번호 재설정
        await resetPassword(data);
        alert('비밀번호 재설정이 완료되었습니다.');
        navigate('/login'); // 비밀번호 재설정 완료 후 로그인 페이지로 이동
      }
    } catch (error: any) {
      if (isAxiosError(error) && error.response) {
        const status = error.response.status;
        const detail = error.response.data.detail;

        if (status === 404 && detail === '해당 사용자를 찾을 수 없습니다.') {
          alert('해당 사용자를 찾을 수 없습니다.');
        } else if (status === 400 && detail === '토큰과 새 비밀번호가 필요합니다.') {
          alert('토큰과 새 비밀번호가 필요합니다.');
        } else if (status === 400 && detail === '토큰이 만료되었습니다.') {
          alert('비밀번호 재설정 링크가 만료되었습니다. 다시 요청해주세요.');
        } else if (status === 400 && detail === '유효하지 않은 토큰입니다.') {
          alert('유효하지 않은 토큰입니다. 다시 요청해주세요.');
        } else {
          alert('처리 중 오류가 발생했습니다.');
        }
      } else {
        console.error('오류 발생:', error);
        alert('처리 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <a href='/' className='mb-6 h-[50px] w-[150px] text-[40px] font-bold text-blue-primary'>
        ALLTHE
      </a>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-lg rounded-lg p-8'>
        {!isEmailSent ? (
          <div>
            <div className='mb-14'>
              <label htmlFor='email' className='block text-sm font-medium'>
                이메일
              </label>
              <input
                className='mt-2 block h-[50px] w-full rounded-[5px] border border-gray-c4 px-[15px] py-4 text-[16px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary'
                type='email'
                id='email'
                disabled={isLoading}
                placeholder='이메일을 입력하세요.'
                {...register('email', {
                  required: '이메일을 입력하세요.',
                  pattern: {
                    value: /^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: '잘못된 이메일 주소입니다.',
                  },
                })}
                value={watch('email') || ''}
              />
              {errors.email && <p className='mt-2 text-sm text-red'>{errors.email.message}</p>}
            </div>
            <button
              className={`flex h-[50px] w-full items-center justify-center rounded-xl font-semibold text-white shadow-custom-light ${
                isLoading ? 'bg-blue-hover' : 'bg-blue-primary hover:bg-blue-hover'
              }`}
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? '이메일 전송 중...' : '비밀번호 재설정 이메일 보내기'}
            </button>
          </div>
        ) : (
          <div>
            <div className='mb-6'>
              <label htmlFor='email' className='block text-sm font-medium'>
                이메일
              </label>
              <input
                className='mt-2 block h-[50px] w-full rounded-sm border border-gray-c4 px-4 py-[15px] shadow-custom-light focus:outline-none focus:ring-blue-primary sm:text-sm'
                type='email'
                id='email'
                value={watch('email')} // react-hook-form의 getValues로 이메일 값 가져오기
                readOnly
              />
            </div>
            <div className='mb-14'>
              <label htmlFor='password' className='block text-sm font-medium'>
                새 비밀번호
              </label>
              <div className='relative'>
                <input
                  className='mt-2 block h-[50px] w-full rounded-sm border border-gray-c4 px-4 py-[15px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary sm:text-sm'
                  type={showPassword ? 'text' : 'password'} // 비밀번호 표시 여부
                  id='password'
                  disabled={isLoading}
                  placeholder='새 비밀번호를 입력하세요.'
                  {...register('password', {
                    required: '비밀번호를 입력하세요.',
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/,
                      message: '비밀번호는 8-15자 영문/숫자 또는 특수문자 조합이어야 합니다.',
                    },
                  })}
                  value={watch('password') || ''}
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 flex items-center pr-4'
                  onClick={() => setShowPassword(!showPassword)} // 클릭 시 비밀번호 표시/숨김 전환
                >
                  {/* 비밀번호 표시 상태에 따라 아이콘 변경 */}
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.password && <p className='mt-2 text-sm text-red'>{errors.password.message}</p>}
            </div>
            <button
              className={`flex h-[50px] w-full items-center justify-center rounded-xl font-semibold text-white shadow-custom-light ${
                isLoading ? 'bg-blue-hover' : 'bg-blue-primary hover:bg-blue-hover'
              }`}
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? '비밀번호 재설정 중...' : '비밀번호 재설정 완료'}
            </button>
          </div>
        )}
      </form>
      <div className='mt-4 flex space-x-4'>
        <a href='/login' className='hover:text-blue-primary'>
          로그인으로 돌아가기
        </a>
      </div>
    </div>
  );
};
export default PasswordResetPage;
