import React from 'react';
import { PaymentBtnProps } from '../../../types/type';

const PaymentBtn: React.FC<PaymentBtnProps> = ({ methodId, imgSrc, name, isSelected, onClick }) => {
  return (
    <button
      className={`h-[65px] w-[127px] rounded-[5px] border ${
        isSelected ? 'border-blue-primary bg-white-f9 duration-500' : 'border-gray-dc'
      } cursor-pointer`}
      onClick={() => onClick(methodId)}
    >
      <img src={imgSrc} alt={name} className='h-full w-full' />
    </button>
  );
};

export default PaymentBtn;
