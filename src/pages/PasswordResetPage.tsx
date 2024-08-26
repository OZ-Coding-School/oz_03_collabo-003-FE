import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface PasswordResetInputs {
  email: string;
  password?: string;
}

const PasswordResetPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    getValues, // 이메일 값을 가져오기 위해 추가
    formState: { errors },
  } = useForm<PasswordResetInputs>();

  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const sendPasswordResetEmail = async (email: string) => {
    return axios.post(`${baseUrl}/api/v1/accounts/password-reset`, { email });
  };

  const resetPassword = async (data: PasswordResetInputs) => {
    return axios.post(`${baseUrl}/api/v1/accounts/password-reset/confirm`, data);
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
      console.error('오류 발생:', error);
      alert('처리 중 오류가 발생했습니다.');
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
            <div className='mb-6'>
              <label htmlFor='email' className='block text-sm font-medium'>
                이메일
              </label>
              <input
                className='mt-2 block h-[50px] w-full rounded-sm border border-gray-c4 px-4 py-[15px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary sm:text-sm'
                type='email'
                id='email'
                value={getValues('email')} // react-hook-form의 getValues로 이메일 값 가져오기
                readOnly
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='password' className='block text-sm font-medium'>
                새 비밀번호
              </label>
              <input
                className='mt-2 block h-[50px] w-full rounded-sm border border-gray-c4 px-4 py-[15px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary sm:text-sm'
                type='password'
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
              />
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
        ) : (
          <div>
            <div className='mb-6'>
              <label htmlFor='email' className='block text-sm font-medium'>
                이메일
              </label>
              <input
                className='mt-2 block h-[50px] w-full rounded-sm border border-gray-c4 px-4 py-[15px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary sm:text-sm'
                type='email'
                id='email'
                value={getValues('email')} // react-hook-form의 getValues로 이메일 값 가져오기
                readOnly
              />
            </div>
            <div className='mb-14'>
              <label htmlFor='password' className='block text-sm font-medium'>
                새 비밀번호
              </label>
              <input
                className='mt-2 block h-[50px] w-full rounded-sm border border-gray-c4 px-4 py-[15px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary sm:text-sm'
                type='password'
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
              />
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
    </div>
  );
};

export default PasswordResetPage;
