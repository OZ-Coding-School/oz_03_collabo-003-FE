import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className: string;
  disabled: boolean;
}

const DisabledBtn: React.FC<ButtonProps> = ({ onClick, children, disabled, className = '' }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={`rounded-[5px] text-white shadow-custom-dark ${disabled ? 'bg-blue-hover' : 'bg-blue-primary transition-colors duration-300 hover:bg-blue-hover'} ${className}`}
    >
      {children}
    </button>
  );
};

export default DisabledBtn;
