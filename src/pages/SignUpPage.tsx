import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface SignUpFormInputs {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const API_URL = import.meta.env.API_URL;

function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormInputs>();

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/v1/users/signup`, {
        nickname: data.nickname,
        email: data.email,
        password: data.password,
      });
      console.log(response.data);
      alert('회원가입이 완료되었습니다!');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>ALL THE</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='nickname'>닉네임</label>
          <input placeholder='닉네임을 입력하세요.' {...register('nickname', { required: '닉네임을 입력하세요.' })} />
          {errors.nickname && <p style={{ color: 'red' }}>{errors.nickname?.message}</p>}
        </div>

        <div>
          <label htmlFor='email'>이메일</label>
          <input
            placeholder='이메일을 입력하세요.'
            {...register('email', {
              required: '이메일을 입력하세요.',
              pattern: {
                value: /^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '유효한 이메일 주소를 입력하세요.',
              },
            })}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email?.message}</p>}
        </div>

        <div>
          <label htmlFor='password'>비밀번호 8-15자 영문/숫자 또는 특수문자 조합</label>
          <input
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
          {errors.password && <p style={{ color: 'red' }}>{errors.password?.message}</p>}
        </div>

        <div>
          <label htmlFor='confirmPassword'>비밀번호 확인</label>
          <input
            type='password'
            placeholder='비밀번호 확인을 입력하세요.'
            {...register('confirmPassword', {
              required: '비밀번호 확인을 입력하세요.',
              validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
            })}
          />
          {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword?.message}</p>}
        </div>

        <button type='submit' disabled={isLoading}>
          {isLoading ? '처리 중...' : '회원가입'}
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
