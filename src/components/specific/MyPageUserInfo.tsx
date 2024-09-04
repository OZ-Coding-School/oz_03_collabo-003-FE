import { useState, useEffect } from 'react';
import userData from '../../data/users.json';
import BtnMypage from '../common/button/BtnMypage';
import { useForm } from 'react-hook-form';
import WhiteBtn from '../common/button/WhiteBtn';

interface UserFormData {
  nickName: string;
  password: string;
}

const MyPageUserInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [naming, setNaming] = useState(userData.username);
  const [password, setPassword] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm<UserFormData>();

  useEffect(() => {
    if (!isEditing) {
      clearErrors();
    }
  }, [isEditing, clearErrors]);

  const onSubmit = (data: UserFormData) => {
    console.log(data);
    setNaming(data.nickName);
    setPassword(data.password || '');
    setIsEditing(false);
    console.log(password); // 임시 코드
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setValue('nickName', naming);
  };

  const handleCloseClick = () => {
    setIsEditing(false);
  };

  const inputBox = 'flex-1 placeholder:text-gray-c4';
  const grayRounded = 'rounded-lg border border-gray-dc bg-white px-6 py-4';
  const fixedBtn = 'absolute right-0 px-3 py-1 text-sm font-semibold';
  const errorMessage = 'text-red text-sm ml-[90px]';
  const nickNameExp = /^[가-힣a-zA-Z0-9]+$/;
  const passwordExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/;

  return (
    <div className='h-[calc(100vh-70px)] w-full overflow-auto'>
      <div className='mx-auto my-24 flex min-h-[480px] w-[700px] flex-col p-6'>
        <div className='mb-10 flex items-center justify-between border-b-2 p-1'>
          <span className='text-xl'>
            환영합니다, <strong>{userData.username}</strong>님
          </span>
          <span className='text-lg'>
            권한: <strong>이용자</strong>
          </span>
        </div>
        <div className={grayRounded}>
          <div className='p-4'>
            <div className='flex'>
              <div className='flex grow items-center'>
                <div className='mr-4 text-5xl'>
                  <img src='/images/point-icon.png' alt='point-icon' className='ml-[-10px]'></img>
                </div>
                <div className='relative w-full'>
                  <p className='absolute bottom-[10px] text-lg font-semibold'>포인트</p>
                  <p className='absolute right-6 text-xl font-bold text-gray-75'>
                    50,000<span className='font-medium'>원</span>
                  </p>
                </div>
              </div>
              <hr className='h-auto w-[1px] flex-none border border-gray-dc' />
              <div className='relative mb-8 ml-7 grow'>
                <p className='mb-4 text-lg font-semibold'>포인트 적립 내역</p>
                <BtnMypage
                  onClick={() => {}}
                  className='absolute bottom-[-30px] right-0 mt-1 px-3 py-1 text-sm font-semibold'
                >
                  적립내역 바로가기 &gt;
                </BtnMypage>
              </div>
            </div>
          </div>
        </div>
        <div className={`${grayRounded} mt-8`}>
          <div className='relative flex'>
            <h2 className='mb-4 inline-block text-xl font-bold'>내 정보</h2>
            {isEditing ? (
              <div>
                <WhiteBtn onClick={handleCloseClick} className='absolute bottom-[13px] right-[90px]'>
                  취소
                </WhiteBtn>
                <BtnMypage onClick={handleSubmit(onSubmit)} className={fixedBtn}>
                  수정완료
                </BtnMypage>
              </div>
            ) : (
              <BtnMypage onClick={handleEditClick} className={fixedBtn}>
                수정 &gt;
              </BtnMypage>
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              <div className='flex items-center'>
                <p className='mr-10 text-lg font-semibold'>이메일</p>
                <span className='mr-10 flex-1'>example123@gmail.com</span>
                <span></span>
              </div>
              <div className='relative flex items-center'>
                <p className='mr-10 text-lg font-semibold'>닉네임</p>
                {isEditing ? (
                  <input
                    className={`${inputBox} font-bold placeholder:font-normal`}
                    type='text'
                    placeholder='특수문자, 공백을 제외한 6자 이내의 닉네임을 입력해주세요'
                    {...register('nickName', {
                      required: '닉네임은 필수 입력 항목입니다.',
                      pattern: {
                        value: nickNameExp,
                        message: '특수문자 및 공백은 포함할 수 없습니다.',
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
                  />
                ) : (
                  <span className='flex-1'>{naming || '닉네임을 등록하시려면 수정 버튼을 눌러주세요'}</span>
                )}
              </div>
              {isEditing && errors.nickName && <p className={`${errorMessage}`}>{errors.nickName.message}</p>}
              <div className='flex items-center'>
                <p className='mr-6 text-lg font-semibold'>패스워드</p>
                {isEditing ? (
                  <input
                    className={inputBox}
                    type='password'
                    placeholder='숫자, 영어, 특수문자를 포함한 새 비밀번호를 입력해주세요'
                    {...register('password', {
                      pattern: {
                        value: passwordExp,
                        message: '숫자, 영어, 특수문자 모두 포함되어야 합니다.',
                      },
                      minLength: {
                        value: 8,
                        message: '비밀번호는 최소 8자 이상이어야 합니다.',
                      },
                      maxLength: {
                        value: 15,
                        message: '비밀번호는 최대 15자 이내여야 합니다.',
                      },
                    })}
                  />
                ) : (
                  <span className='flex-1 text-gray-c4'>패스워드 변경을 원하시면 수정 버튼을 눌러주세요</span>
                )}
              </div>
              {isEditing && errors.password && <p className={errorMessage}>{errors.password.message}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyPageUserInfo;
