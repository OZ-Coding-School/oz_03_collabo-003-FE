import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface PasswordResetInputs {
  email: string;
}

const PasswordResetPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetInputs>();

  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const sendPasswordResetEmail = async (data: PasswordResetInputs) => {
    return axios.post(`${baseUrl}/api/v1/accounts/password-reset`, data);
  };

  const onSubmit: SubmitHandler<PasswordResetInputs> = async (data) => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(data);
      alert('비밀번호 재설정 이메일이 발송되었습니다.');
      navigate('/'); // 이메일 발송 후 홈으로 리다이렉트
    } catch (error: any) {
      console.error('비밀번호 재설정 오류:', error);
      alert('이메일 발송 중 오류가 발생했습니다.');
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
        <div className='mb-6'>
          <label htmlFor='email' className='block text-sm font-medium'>
            이메일
          </label>
          <input
            className='mt-2 block h-[50px] w-full rounded-sm border border-gray-c4 px-4 py-[15px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary sm:text-sm'
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
