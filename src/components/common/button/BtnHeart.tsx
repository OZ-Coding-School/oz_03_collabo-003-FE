import React, { useState } from 'react';
import { GoHeartFill, GoHeart } from 'react-icons/go';

const BtnHeart: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <button onClick={handleToggle} className='text-2xl text-blue-primary'>
      {isToggled ? <GoHeartFill /> : <GoHeart />}
    </button>
  );
};

export default BtnHeart;
