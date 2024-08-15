import React from 'react';
import userData from '../../data/users.json';
import BtnMypage from '../common/button/BtnMypage';

interface MypageOwnerInfoProps {
  onSelectedItem: (item: string) => void;
}

const MypageOwnerInfo: React.FC<MypageOwnerInfoProps> = ({ onSelectedItem }) => {
  const user = userData;

  const infoBox = 'flex gap-10';
  const infoKey = 'min-w-[140px] text-[18px] font-semibold';
  const infoValue = 'grow text-[18px]';
  const stateNumber = 'cursor-pointer text-[24px] font-semibold text-gray-46 underline underline-offset-4';

  return (
    <div className='mx-auto my-24 flex min-w-[480px] flex-col gap-6 sm:min-w-[580px] md:min-w-[680px]'>
      <div className='flex items-end justify-between border-b-2 border-b-gray-75 p-1'>
        <div className='flex gap-2'>
          <span className='text-[24px] text-gray-46'>환영합니다,</span>
          <span className='text-[24px] font-semibold'>{user.name} 님</span>
        </div>
        <div className='flex gap-1'>
          <span className='text-[20px] text-gray-46'>권한:</span>
          {user.role === 'client' && <span className='text-[20px] font-semibold'>의뢰자</span>}
        </div>
      </div>
      <div className='h-[150px] rounded-xl border border-gray-dc'>
        <div className='grid h-full grid-cols-3 grid-rows-1 p-6'>
          <div className='grid grid-cols-1 grid-rows-2 items-center border-r border-r-gray-75'>
            <span className='text-center text-[18px] font-semibold'>등록한 웹</span>
            <div className='flex items-center justify-center gap-1'>
              <span className={stateNumber} onClick={() => onSelectedItem('사이트 관리')}>
                0
              </span>
              <span className='text-center text-[18px] text-gray-46'>건</span>
            </div>
          </div>
          <div className='grid grid-cols-1 grid-rows-2 items-center border-r border-r-gray-75'>
            <span className='text-center text-[18px] font-semibold'>분석 의뢰</span>
            <div className='flex items-center justify-center gap-1'>
              <span className={stateNumber} onClick={() => alert('서비스 준비중입니다.')}>
                0
              </span>
              <span className='text-center text-[18px] text-gray-46'>건</span>
            </div>
          </div>
          <div className='grid grid-cols-1 grid-rows-2 items-center pl-6'>
            <span className='text-[18px] font-semibold'>결제 내역</span>
            <BtnMypage
              className='h-[32px] w-[120px] justify-self-end text-[12px] font-semibold md:w-[150px] md:text-[14px]'
              onClick={() => alert('서비스 준비중입니다.')}
            >
              결제내역 바로가기
            </BtnMypage>
          </div>
        </div>
      </div>
      <div className='grid h-[245px] grid-cols-1 grid-rows-4 items-center rounded-xl border border-gray-dc px-6 py-2'>
        <span className='text-[20px] font-semibold'>의뢰자 정보</span>
        <div className={infoBox}>
          <span className={infoKey}>사업자명</span>
          <span className={infoValue}>{user.businessName}</span>
        </div>
        <div className={infoBox}>
          <span className={infoKey}>사업자등록번호</span>
          <span className={infoValue}>{user.businessNumber}</span>
        </div>
        <div className={infoBox}>
          <span className={infoKey}>대표전화</span>
          <span className={infoValue}>{user.phoneNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default MypageOwnerInfo;
