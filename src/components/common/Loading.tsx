import React from 'react';
import { BeatLoader } from 'react-spinners';

interface LoadingProps {
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ className }) => (
  <div
    className={`fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-dc bg-opacity-60 ${className}`}
  >
    <div className='relative'>
      <BeatLoader color='#4169E1' margin={8} size={16} speedMultiplier={1} />
    </div>
  </div>
);

export default Loading;
