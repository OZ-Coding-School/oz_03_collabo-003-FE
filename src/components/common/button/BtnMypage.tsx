import React from 'react';
import { ButtonProps } from '../../../types/type';

const BtnMypage: React.FC<ButtonProps> = ({ onClick, children, className = '' }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`rounded-[5px] bg-blue-primary text-center text-white shadow-custom-dark transition-colors duration-300 hover:bg-blue-hover ${className}`}
    >
      {children}
    </button>
  );
};

export default BtnMypage;
