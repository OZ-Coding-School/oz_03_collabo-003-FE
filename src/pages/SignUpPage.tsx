import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface SignUpFormInputs {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const baseUrl = import.meta.env.VITE_API_URL;

const SignUpPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isNicknameVerified, setIsNicknameVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setError,
  } = useForm<SignUpFormInputs>();

  const verifyNickname = async () => {
    const nickname = getValues('nickname');

    if (!nickname) {
      setError('nickname', { type: 'manual', message: '닉네임을 입력하세요.' });
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/api/v1/users/verify-nickname`, { nickname });
      if (response.data.success) {
        setIsNicknameVerified(true);
        alert('닉네임 인증이 완료되었습니다.');
      } else {
        setIsNicknameVerified(false);
        alert('이미 사용 중인 닉네임입니다.');
      }
    } catch (error) {
      console.error('닉네임 인증 실패:', error);
      alert('닉네임 인증에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const verifyEmail = async () => {
    const email = getValues('email');

    if (!email) {
      setError('email', { type: 'manual', message: '이메일을 입력하세요.' });
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/api/v1/users/verify-email`, { email });
      if (response.data.success) {
        setIsEmailVerified(true);
        alert('이메일 인증이 완료되었습니다.');
      } else {
        setIsEmailVerified(false);
        alert('이메일 인증에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('이메일 인증 실패:', error);
      alert('이메일 인증에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    if (!isNicknameVerified) {
      alert('닉네임 인증을 완료해주세요.');
      return;
    }

    if (!isEmailVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/api/v1/users/signup`, {
        nickname: data.nickname,
        email: data.email,
        password: data.password,
      });
      console.log(response.data);
      alert('회원가입이 완료되었습니다!');
      window.location.href = '/login';
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
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
          <label htmlFor='nickname' className='block text-sm font-medium'>
            닉네임
          </label>
          <div className='flex'>
            <input
              className='mt-2 block h-[50px] w-full rounded-sm border border-gray-c4 px-4 py-[15px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary sm:text-sm'
              placeholder='닉네임을 입력하세요.'
              {...register('nickname', { required: '닉네임을 입력하세요.' })}
            />
            <button
              type='button'
              className={`ml-2 mt-2 flex h-[50px] items-center justify-center rounded-xl px-4 py-2 font-semibold text-white shadow-custom-light ${isNicknameVerified ? 'bg-gray-c4' : 'bg-blue-primary hover:bg-blue-hover'}`}
              onClick={verifyNickname}
              disabled={isNicknameVerified}
            >
              {isNicknameVerified ? '인증 완료' : '닉네임 인증'}
            </button>
          </div>
          {errors.nickname && <p className='mt-2 text-sm text-red'>{errors.nickname?.message}</p>}
        </div>

        <div className='mb-6'>
          <label htmlFor='email' className='block text-sm font-medium'>
            이메일
          </label>
          <div className='flex'>
            <input
              className='mt-2 block h-[50px] w-full rounded-sm border border-gray-c4 px-4 py-[15px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary sm:text-sm'
              placeholder='이메일을 입력하세요.'
              {...register('email', {
                required: '이메일을 입력하세요.',
                pattern: {
                  value: /^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '잘못된 이메일 주소입니다.',
                },
              })}
            />
            <button
              type='button'
              className={`ml-2 mt-2 flex h-[50px] items-center justify-center rounded-xl px-4 py-2 font-semibold text-white shadow-custom-light ${isEmailVerified ? 'bg-gray-c4' : 'bg-blue-primary hover:bg-blue-hover'}`}
              onClick={verifyEmail}
              disabled={isEmailVerified}
            >
              {isEmailVerified ? '인증 완료' : '이메일 인증'}
            </button>
          </div>
          {errors.email && <p className='mt-2 text-sm text-red'>{errors.email?.message}</p>}
        </div>

        <div className='mb-6'>
          <label htmlFor='password' className='block text-sm font-medium'>
            비밀번호 8-15자 영문/숫자 또는 특수문자 조합
          </label>
          <input
            className='mt-2 block h-[50px] w-full rounded-sm border border-gray-c4 px-4 py-[15px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary sm:text-sm'
            type='password'
            placeholder='비밀번호를 입력하세요.'
            {...register('password', {
              required: '비밀번호를 입력하세요.',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/,
                message: '비밀번호는 8-15자 영문/숫자 또는 특수문자 조합이어야 합니다.',
              },
            })}
          />
          {errors.password && <p className='mt-2 text-sm text-red'>{errors.password?.message}</p>}
        </div>

        <div className='mb-14'>
          <label htmlFor='confirmPassword' className='block text-sm font-medium'>
            비밀번호 확인
          </label>
          <input
            className='mt-2 block h-[50px] w-full rounded-sm border border-gray-c4 px-4 py-[15px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary sm:text-sm'
            type='password'
            placeholder='비밀번호 확인을 입력하세요.'
            {...register('confirmPassword', {
              required: '비밀번호 확인을 입력하세요.',
              validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
            })}
          />
          {errors.confirmPassword && <p className='mt-2 text-sm text-red'>{errors.confirmPassword?.message}</p>}
        </div>

        <button
          className={`flex h-[50px] w-full items-center justify-center rounded-xl font-semibold text-white shadow-custom-light ${isLoading ? 'bg-blue-hover' : 'bg-blue-primary hover:bg-blue-hover'} `}
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? '처리 중...' : '회원가입'}
        </button>
      </form>
      <div className='mt-4 text-center'>
        <a href='/login' className='hover:text-blue-primary'>
          이미 회원이신가요? 로그인
        </a>
      </div>
    </div>
  );
};

export default SignUpPage;
