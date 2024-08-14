import React from 'react';
import { ButtonProps } from '../../../types/type';

const BtnMypageRole: React.FC<ButtonProps> = ({ onClick, children, className = '' }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`rounded-[5px] bg-blue-primary text-white shadow-custom-dark transition-colors duration-300 hover:bg-blue-hover ${className}`}
    >
      {children}
    </button>
  );
};

export default BtnMypageRole;
