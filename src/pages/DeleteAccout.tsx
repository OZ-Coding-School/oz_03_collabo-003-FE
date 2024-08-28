import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuthStore } from '../store/store';

interface FormValues {
  confirmation: string;
}

const DeleteAccountPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();
  const [isDeleting, setIsDeleting] = React.useState(false);

  // const baseUrl = import.meta.env.VITE_API_URL;

  const onSubmit = async (data: FormValues) => {
    if (data.confirmation === '위의 내용에 동의하며, 탈퇴하겠습니다.') {
      if (window.confirm('정말 탈퇴하시겠습니까?')) {
        setIsDeleting(true);

        try {
          await axios.delete('http://223.130.128.216:8000/accounts/account-delete/');
          // await axios.delete(`${baseUrl}/api/v1/accounts/account-delete`);
          alert('탈퇴가 완료되었습니다.');
          // 토큰 삭제 후 홈으로 리다이렉트
          useAuthStore.getState().logOut();
          window.location.href = '/';
        } catch (error) {
          console.error('탈퇴 중 오류 발생:', error);
          alert('탈퇴 처리 중 오류가 발생했습니다.');
        } finally {
          setIsDeleting(false);
        }
      }
    } else {
      setError('confirmation', {
        type: 'manual',
        message: '입력 내용이 올바르지 않습니다.',
      });
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <a href='/' className='mb-6 h-[50px] w-[150px] text-[40px] font-bold text-blue-primary'>
        ALLTHE
      </a>
      <div className='w-full max-w-lg rounded-lg p-8'>
        <h2 className='mb-6 text-xl font-bold'>회원 탈퇴</h2>
        <p className='mb-4'>
          <strong>탈퇴 시 회원에 대한 모든 정보가 삭제됩니다.</strong>
          <br />
          <br /> 위의 내용에 동의하시면
          <br />
          <strong> &apos;위의 내용에 동의하며, 탈퇴하겠습니다.&apos;</strong>를 입력해주세요.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className='mt-2 block h-[50px] w-full rounded-sm border border-gray-c4 px-4 py-[15px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary sm:text-sm'
            type='text'
            placeholder='위의 내용에 동의하며, 탈퇴하겠습니다.'
            {...register('confirmation', {
              required: '입력란을 비워둘 수 없습니다.',
              validate: (value) =>
                value === '위의 내용에 동의하며, 탈퇴하겠습니다.' || '입력 내용이 올바르지 않습니다.',
            })}
          />
          {errors.confirmation && <p className='mt-2 text-sm text-red'>{errors.confirmation.message}</p>}
          <button
            className={`mt-6 flex h-[50px] w-full items-center justify-center rounded-xl font-semibold text-white shadow-custom-light ${isDeleting ? 'bg-blue-hover' : 'bg-blue-primary hover:bg-blue-hover'} `}
            type='submit'
            disabled={isDeleting}
          >
            {isDeleting ? '탈퇴 처리 중...' : '회원 탈퇴'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccountPage;
