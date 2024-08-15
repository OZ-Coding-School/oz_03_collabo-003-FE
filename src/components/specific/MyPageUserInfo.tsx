import React from 'react';
import userData from '../../data/users.json';
import BtnMypage from '../common/button/BtnMypage';

const MyPageUserInfo = () => {
  const handleOnClick = () => {};
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <div className='shadow-md w-full max-w-4xl rounded-lg p-6'>
        <div className='flex items-center justify-between'>
          <span className='text-xl'>
            환영합니다, <strong>{userData.name}</strong>님
          </span>
          <span className='text-lg'>
            권한: <strong>이용자</strong>
          </span>
        </div>
        <div className='mt-8 rounded-lg p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <div className='mr-4 text-5xl'>
                <img src='/images/point-icon.png' alt='point-icon'></img>
              </div>
              <div>
                <p className='text-lg font-semibold'>포인트</p>
                <p className='text-xl font-bold'>50,000원</p>
              </div>
            </div>
            <BtnMypage onClick={handleOnClick} className='px-3 py-2 text-sm font-semibold'>
              적립내역 바로가기 &gt;
            </BtnMypage>
          </div>
        </div>

        <div className='mt-8 rounded-lg p-4'>
          <h2 className='mb-4 text-xl font-bold'>내 정보</h2>
          <div className='space-y-4'>
            <div className='flex items-center'>
              <span className='mr-10 text-lg font-semibold'>이메일</span>
              <span className='mr-10 flex-1'>example123@gmail.com</span>
              <span></span>
            </div>
            <div className='flex items-center'>
              <span className='mr-10 text-lg font-semibold'>닉네임</span>
              <span className='flex-1'>김아무개</span>
              <BtnMypage onClick={handleOnClick} className='px-3 py-2 text-sm font-semibold'>
                변경 &gt;
              </BtnMypage>
            </div>
            <div className='flex items-center'>
              <span className='mr-6 text-lg font-semibold'>패스워드</span>
              <span className='flex-1 text-gray-c4'>패스워드 변경을 원하시면 변경버튼을 눌러주세요</span>
              <BtnMypage onClick={handleOnClick} className='px-3 py-2 text-sm font-semibold'>
                변경 &gt;
              </BtnMypage>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageUserInfo;
