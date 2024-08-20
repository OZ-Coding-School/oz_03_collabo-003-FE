import React from 'react';
import { ButtonProps } from '../../../types/type';

const WhiteBtn: React.FC<ButtonProps> = ({ onClick, children, className = '' }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`rounded-[5px] bg-white px-2 py-1 shadow-custom-light transition-colors duration-300 hover:bg-white-f9 ${className}`}
    >
      {children}
    </button>
  );
};

export default WhiteBtn;
