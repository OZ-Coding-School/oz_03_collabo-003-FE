import React, { useState } from 'react';
import { GoHeartFill, GoHeart } from 'react-icons/go';

interface BtnHeartProps {
  className?: string;
  isBookmarked?: boolean;
}

const BtnHeart: React.FC<BtnHeartProps> = ({ className = '', isBookmarked }) => {
  const [isToggled, setIsToggled] = useState(isBookmarked);
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <button onClick={handleToggle} className={`${className}`}>
      {isToggled ? <GoHeartFill className='text-blue-primary' /> : <GoHeart />}
    </button>
  );
};

export default BtnHeart;
