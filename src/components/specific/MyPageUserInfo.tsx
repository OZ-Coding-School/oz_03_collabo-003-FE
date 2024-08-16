import { useState } from 'react';
import userData from '../../data/users.json';
import BtnMypage from '../common/button/BtnMypage';

// 유효성 검사 추후 추가

const MyPageUserInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userData.name);
  const [password, setPassword] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const inputBox = 'flex-1 placeholder:text-gray-c4';
  const grayRounded = 'rounded-lg border border-gray-dc bg-white p-4';

  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <div className='w-full max-w-4xl p-6'>
        <div className='mb-10 flex items-center justify-between border-b-2 p-1'>
          <span className='text-xl'>
            환영합니다, <strong>{userData.name}</strong>님
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
                  <img src='/images/point-icon.png' alt='point-icon'></img>
                </div>
                <div>
                  <p className='text-lg font-semibold'>포인트</p>
                  <p className='text-xl font-bold'>50,000원</p>
                </div>
              </div>
              <hr className='h-auto w-[1px] flex-none border border-gray-dc' />
              <div className='relative ml-7 grow'>
                <p className='text-lg font-semibold'>포인트 적립 내역</p>
                <BtnMypage onClick={() => {}} className='absolute right-0 px-3 py-2 text-sm font-semibold'>
                  적립내역 바로가기 &gt;
                </BtnMypage>
              </div>
            </div>
          </div>
        </div>
        <div className={`${grayRounded} mt-8`}>
          <h2 className='mb-4 text-xl font-bold'>내 정보</h2>
          <div className='space-y-4'>
            <div className='flex items-center'>
              <span className='mr-10 text-lg font-semibold'>이메일</span>
              <span className='mr-10 flex-1'>example123@gmail.com</span>
              <span></span>
            </div>
            <div className='flex items-center'>
              <span className='mr-10 text-lg font-semibold'>닉네임</span>
              {isEditing ? (
                <input
                  className={inputBox}
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='특수문자, 공백을 제외한 6자 이내의 새 닉네임을 입력해주세요'
                />
              ) : (
                <span className='flex-1'>{name || '닉네임을 등록해주세요'}</span>
              )}
              {isEditing ? (
                <BtnMypage onClick={handleSaveClick} className='px-3 py-2 text-sm font-semibold'>
                  수정완료 &gt;
                </BtnMypage>
              ) : (
                <BtnMypage onClick={handleEditClick} className='px-3 py-2 text-sm font-semibold'>
                  변경 &gt;
                </BtnMypage>
              )}
            </div>
            <div className='flex items-center'>
              <span className='mr-6 text-lg font-semibold'>패스워드</span>
              {isEditing ? (
                <input
                  className={inputBox}
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='숫자, 영어를 포함한 새 비밀번호를 입력해주세요'
                />
              ) : (
                <span className='flex-1 text-gray-c4'>패스워드 변경을 원하시면 변경버튼을 눌러주세요</span>
              )}
              {isEditing ? (
                <BtnMypage onClick={handleSaveClick} className='px-3 py-2 text-sm font-semibold'>
                  수정완료 &gt;
                </BtnMypage>
              ) : (
                <BtnMypage onClick={handleEditClick} className='px-3 py-2 text-sm font-semibold'>
                  변경 &gt;
                </BtnMypage>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageUserInfo;
