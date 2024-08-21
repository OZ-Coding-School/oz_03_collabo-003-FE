import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface PasswordResetInputs {
  email: string;
}

const PasswordResetPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetInputs>();

  const baseUrl = import.meta.env.VITE_API_URL;

  const resetPassword = (data: PasswordResetInputs) => {
    return axios.post(`${baseUrl}/api/v1/users/password/reset`, data);
  };

  const onSubmit: SubmitHandler<PasswordResetInputs> = async (data: PasswordResetInputs) => {
    setIsLoading(true);
    setMessage(null);
    try {
      const response = await resetPassword(data);
      setMessage('비밀번호 재설정 이메일을 보냈습니다. 이메일을 확인하세요.');
      console.log('비밀번호 재설정 성공:', response.data);
    } catch (error: any) {
      console.error('비밀번호 재설정 실패:', error.message);
      setMessage('비밀번호 재설정에 실패했습니다. 다시 시도하세요.');
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
          {isLoading ? '요청 중...' : '비밀번호 재설정 링크 보내기'}
        </button>
      </form>
      {message && <p className='mt-4 text-center text-sm text-blue-primary'>{message}</p>}
      <a href='/login' className='mt-4 hover:text-blue-primary'>
        로그인 페이지로 돌아가기
      </a>
    </div>
  );
};

export default PasswordResetPage;
