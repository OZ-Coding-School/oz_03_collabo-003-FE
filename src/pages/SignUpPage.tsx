import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios, { isAxiosError } from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface SignUpFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
}

const baseUrl = import.meta.env.VITE_API_URL;

const SignUpPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUsernameVerified, setIsUsernameVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 여부 상태 추가
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 비밀번호 확인 표시 여부 상태 추가

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setError,
    clearErrors,
  } = useForm<SignUpFormInputs>();

  const verifyUsername = async () => {
    const username = getValues('username');

    if (!username) {
      setError('username', { type: 'manual', message: '닉네임을 입력하세요.' });
      return;
    }

    // 프론트엔드에서 추가 검증, 제출 시가 아닌 인증 시 유효성 검사를 할 수 있도록
    if (username.length < 2 || username.length > 6) {
      setError('username', { type: 'manual', message: '닉네임은 2자 이상 6자 이내여야 합니다.' });
      return;
    }

    if (!/^[가-힣a-zA-Z0-9]+$/.test(username)) {
      setError('username', { type: 'manual', message: '닉네임은 한글, 영문, 숫자만 사용할 수 있습니다.' });
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/accounts/check-username/`, { username });

      if (response.status === 200) {
        setIsUsernameVerified(true);
        alert('닉네임 인증이 완료되었습니다.');
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        setIsUsernameVerified(false);
        alert('이미 사용 중인 닉네임입니다.');
      } else {
        console.error('닉네임 인증 실패:', error);
        alert('닉네임 인증에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const requestVerificationCode = async () => {
    const email = getValues('email');

    if (!email) {
      setError('email', { type: 'manual', message: '이메일을 입력하세요.' });
      return;
    }

    try {
      clearErrors('email');

      const emailCheckResponse = await axios.post(`${baseUrl}/accounts/check-email/`, { email });

      if (emailCheckResponse.status === 200) {
        const response = await axios.post(`${baseUrl}/accounts/send-verification-code/`, { email });

        if (response.status === 200) {
          setIsVerificationCodeSent(true);
          alert('인증 코드가 이메일로 전송되었습니다.');
        }
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        setError('email', { type: 'manual', message: '이미 존재하는 이메일입니다. 다른 이메일을 입력하세요.' });
      } else {
        console.error('이메일 확인 또는 인증 코드 요청 실패:', error);
        alert('이메일 확인 또는 인증 코드 요청에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const verifyCode = async () => {
    const email = getValues('email');
    const verificationCode = getValues('verificationCode');

    if (!email || !verificationCode) {
      setError('verificationCode', { type: 'manual', message: '인증 코드를 입력하세요.' });
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/accounts/verify-code/`, {
        email,
        verification_code: verificationCode,
      });

      if (response.status === 200) {
        setIsEmailVerified(true);
        alert('이메일 인증이 완료되었습니다.');
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        alert('인증 코드가 일치하지 않거나 만료되었습니다.');
      } else {
        console.error('이메일 인증 실패:', error);
        alert('이메일 인증에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    if (!isUsernameVerified) {
      alert('닉네임 인증을 완료해주세요.');
      return;
    }

    if (!isEmailVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/accounts/register/`, {
        email: data.email,
        username: data.username,
        verification_code: data.verificationCode,
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
        {/* Username Field */}
        <div className='mb-6'>
          <label htmlFor='username' className='block text-sm font-medium'>
            닉네임
          </label>
          <div className='flex'>
            <input
              className='mt-2 block h-[50px] w-full rounded-[5px] border border-gray-c4 px-[15px] py-4 text-[16px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary'
              placeholder='닉네임을 입력하세요.'
              {...register('username', {
                required: '닉네임을 입력하세요.',
                pattern: {
                  value: /^[가-힣a-zA-Z0-9]+$/,
                  message: '닉네임은 한글, 영문, 숫자만 사용할 수 있습니다.',
                },
                minLength: {
                  value: 2,
                  message: '닉네임은 최소 2자 이상이어야 합니다.',
                },
                maxLength: {
                  value: 6,
                  message: '닉네임은 최대 6자 이내여야 합니다.',
                },
              })}
              disabled={isUsernameVerified}
            />
            <button
              type='button'
              className={`ml-2 mt-2 flex h-[50px] items-center justify-center whitespace-nowrap rounded-xl px-4 py-2 font-semibold text-white shadow-custom-light ${isUsernameVerified ? 'bg-gray-db' : 'bg-blue-primary hover:bg-blue-hover'}`}
              onClick={verifyUsername}
              disabled={isUsernameVerified}
            >
              {isUsernameVerified ? '인증 완료' : '중복 인증'}
            </button>
          </div>
          {errors.username && <p className='mt-2 text-sm text-red'>{errors.username?.message}</p>}
        </div>

        {/* Email Field */}
        <div className='mb-6'>
          <label htmlFor='email' className='block text-sm font-medium'>
            이메일
          </label>
          <div className='flex'>
            <input
              className='mt-2 block h-[50px] w-full rounded-[5px] border border-gray-c4 px-[15px] py-4 text-[16px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary'
              placeholder='이메일을 입력하세요.'
              {...register('email', {
                required: '이메일을 입력하세요.',
                pattern: {
                  value: /^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '잘못된 이메일 주소입니다.',
                },
              })}
              disabled={isVerificationCodeSent}
            />
            <button
              type='button'
              className={`ml-2 mt-2 flex h-[50px] items-center justify-center whitespace-nowrap rounded-xl px-4 py-2 font-semibold text-white shadow-custom-light ${isVerificationCodeSent ? 'bg-gray-db' : 'bg-blue-primary hover:bg-blue-hover'}`}
              onClick={requestVerificationCode}
              disabled={isVerificationCodeSent}
            >
              {isVerificationCodeSent ? '발송 완료' : '코드 요청'}
            </button>
          </div>
          {errors.email && <p className='mt-2 text-sm text-red'>{errors.email?.message}</p>}
        </div>

        {/* Verification Code Field */}
        {isVerificationCodeSent && (
          <div className='mb-6'>
            <label htmlFor='verificationCode' className='block text-sm font-medium'>
              인증 코드
            </label>
            <div className='flex'>
              <input
                className='mt-2 block h-[50px] w-full rounded-[5px] border border-gray-c4 px-[15px] py-4 text-[16px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary'
                placeholder='이메일로 받은 인증 코드를 입력하세요.'
                {...register('verificationCode', { required: '인증 코드를 입력하세요.' })}
                disabled={isEmailVerified}
              />
              <button
                type='button'
                className={`ml-2 mt-2 flex h-[50px] items-center justify-center whitespace-nowrap rounded-xl px-4 py-2 font-semibold text-white shadow-custom-light ${isEmailVerified ? 'bg-gray-db' : 'bg-blue-primary hover:bg-blue-hover'}`}
                onClick={verifyCode}
                disabled={isEmailVerified}
              >
                {isEmailVerified ? '인증 완료' : '인증 확인'}
              </button>
            </div>
            {errors.verificationCode && <p className='mt-2 text-sm text-red'>{errors.verificationCode?.message}</p>}
          </div>
        )}

        {/* Password Fields */}
        <div className='mb-6'>
          <label htmlFor='password' className='block text-sm font-medium'>
            비밀번호 8-15자 영문/숫자 또는 특수문자 조합
          </label>
          <div className='relative'>
            <input
              className='mt-2 block h-[50px] w-full rounded-[5px] border border-gray-c4 px-[15px] py-4 text-[16px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary'
              type={showPassword ? 'text' : 'password'} // 입력 타입을 상태에 따라 변경
              placeholder='비밀번호를 입력하세요.'
              {...register('password', {
                required: '비밀번호를 입력하세요.',
                minLength: {
                  value: 8,
                  message: '비밀번호는 최소 8자 이상이어야 합니다.',
                },
                maxLength: {
                  value: 15,
                  message: '비밀번호는 최대 15자 이내여야 합니다.',
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
                  message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
                },
              })}
            />
            <button
              type='button'
              className='absolute inset-y-0 right-0 flex items-center pr-4'
              onClick={() => setShowPassword(!showPassword)} // 클릭 시 상태 변경
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />} {/* 아이콘 표시 */}
            </button>
          </div>
          {errors.password && <p className='mt-2 text-sm text-red'>{errors.password?.message}</p>}
        </div>

        <div className='mb-14'>
          <label htmlFor='confirmPassword' className='block text-sm font-medium'>
            비밀번호 확인
          </label>
          <div className='relative'>
            <input
              className='mt-2 block h-[50px] w-full rounded-[5px] border border-gray-c4 px-[15px] py-4 text-[16px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary'
              type={showConfirmPassword ? 'text' : 'password'} // 입력 타입을 상태에 따라 변경
              placeholder='비밀번호 확인을 입력하세요.'
              {...register('confirmPassword', {
                required: '비밀번호 확인을 입력하세요.',
                validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
              })}
            />
            <button
              type='button'
              className='absolute inset-y-0 right-0 flex items-center pr-4'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} // 클릭 시 상태 변경
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />} {/* 아이콘 표시 */}
            </button>
          </div>
          {errors.confirmPassword && <p className='mt-2 text-sm text-red'>{errors.confirmPassword?.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          className={`flex h-[50px] w-full items-center justify-center rounded-xl font-semibold text-white shadow-custom-light ${isLoading ? 'bg-blue-hover' : 'bg-blue-primary hover:bg-blue-hover'}`}
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
