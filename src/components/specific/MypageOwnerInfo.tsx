import React from 'react';
import userData from '../../data/users.json';
import BtnMypage from '../common/button/BtnMypage';

interface MypageOwnerInfoProps {
  onSelectedItem: (item: string) => void;
}

const MypageOwnerInfo: React.FC<MypageOwnerInfoProps> = ({ onSelectedItem }) => {
  const user = userData;

  const businessNumberHandler = (businessNumber: number) => {
    const numStr = businessNumber.toString();

    const part1 = numStr.slice(0, 3);
    const part2 = numStr.slice(3, 5);
    const part3 = numStr.slice(5);

    const formattedBusinessNumber = `${part1}-${part2}-${part3}`;
    return formattedBusinessNumber;
  };

  const phoneNumberHandler = (phoneNumber: number) => {
    const numStr = phoneNumber.toString();

    switch (numStr.length) {
      case 11: {
        const part1 = numStr.slice(0, 3);
        const part2 = numStr.slice(3, 7);
        const part3 = numStr.slice(7);
        const formattedPhoneNumber11 = `${part1}-${part2}-${part3}`;
        return formattedPhoneNumber11;
      }
      case 10: {
        const part4 = numStr.slice(0, 2);
        const part5 = numStr.slice(2, 6);
        const part6 = numStr.slice(6);
        const formattedPhoneNumber10 = `${part4}-${part5}-${part6}`;
        return formattedPhoneNumber10;
      }
      case 9: {
        const part7 = numStr.slice(0, 2);
        const part8 = numStr.slice(2, 5);
        const part9 = numStr.slice(5);
        const formattedPhoneNumber9 = `${part7}-${part8}-${part9}`;
        return formattedPhoneNumber9;
      }
      default:
        return phoneNumber;
    }
  };

  const infoBox = 'flex gap-10';
  const infoKey = 'min-w-[140px] text-[18px] font-semibold';
  const infoValue = 'grow text-[18px]';
  const stateNumber = 'cursor-pointer text-[24px] font-semibold text-gray-46 underline underline-offset-4';

  return (
    <div className='mx-auto my-24 flex w-[480px] flex-col gap-6 sm:w-[580px] md:w-[680px]'>
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
      <div className='min-h-[150px] rounded-xl border border-gray-dc bg-white'>
        <div className='grid h-[150px] grid-cols-3 grid-rows-1 p-6'>
          <div className='grid grid-cols-1 grid-rows-2 items-center border-r border-r-gray-dc'>
            <span className='text-center text-[18px] font-semibold'>등록한 웹</span>
            <div className='flex items-center justify-center gap-1'>
              <span className={stateNumber} onClick={() => onSelectedItem('사이트 관리')}>
                0
              </span>
              <span className='text-center text-[18px] text-gray-46'>건</span>
            </div>
          </div>
          <div className='grid grid-cols-1 grid-rows-2 items-center border-r border-r-gray-dc'>
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
      <div className='grid min-h-[245px] grid-cols-1 grid-rows-4 items-center rounded-xl border border-gray-dc bg-white px-6 py-2'>
        <span className='text-[20px] font-semibold'>의뢰자 정보</span>
        <div className={infoBox}>
          <span className={infoKey}>사업자명</span>
          <span className={infoValue}>{user.businessName}</span>
        </div>
        <div className={infoBox}>
          <span className={infoKey}>사업자등록번호</span>
          <span className={infoValue}>{businessNumberHandler(user.businessNumber)}</span>
        </div>
        <div className={infoBox}>
          <span className={infoKey}>대표전화</span>
          <span className={infoValue}>{phoneNumberHandler(user.phoneNumber)}</span>
        </div>
      </div>
    </div>
  );
};

export default MypageOwnerInfo;
