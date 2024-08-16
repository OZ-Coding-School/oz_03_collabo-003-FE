import React, { ReactNode } from 'react';
import BtnMypage from './button/BtnMypage';

interface ModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

const ModalContainer: React.FC<ModalContainerProps> = ({ isOpen, onClose, onSubmit, title, children, className }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-75 bg-opacity-50 ${className}`}>
      <div className='w-full max-w-lg rounded-lg bg-white p-6 shadow-custom-light'>
        <div className='flex items-center justify-center pb-3'>
          <h2 className='flex-1 text-center text-xl font-semibold'>{title}</h2>
          <button onClick={onClose} className='justify-self-end bg-white text-gray-75'>
            X
          </button>
        </div>
        <div className='mt-4'>{children}</div>
        <div className='mt-2 flex justify-center'>
          <BtnMypage onClick={onSubmit} className='w-1/3 p-2'>
            신청하기
          </BtnMypage>
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
