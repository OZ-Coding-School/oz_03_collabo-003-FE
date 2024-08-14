import React, { useState } from 'react';
import userData from '../../data/users.json';
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import BtnMypage from './button/BtnMypage';
import { useLocation, useNavigate } from 'react-router-dom';

interface SideBarProps {
  items: string[];
  selectedItem: string;
  onSelectedItem: (item: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ items, selectedItem, onSelectedItem }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = userData;

  const itemStyle = 'flex h-[60px] items-center border-b border-b-gray-dc p-4 text-[18px] cursor-pointer';
  const activeItemStyle = 'text-blue-primary font-semibold';
  const InActiveItemStyle = 'text-black';
  const arrowLocation = isOpen ? 'left-[292px]' : 'left-0';

  return (
    <div className='relative flex'>
      {isOpen && (
        <div className='relative flex h-[calc(100vh-70px)] min-w-[292px] flex-col border-r border-r-gray-dc'>
          <span className='flex min-h-[90px] items-center justify-center border-b border-b-gray-dc text-[18px] font-semibold'>
            {user.name} 님
          </span>
          <ul className='flex grow flex-col'>
            {items.map((item, index) => (
              <li
                className={`${itemStyle} ${selectedItem === item ? activeItemStyle : InActiveItemStyle}`}
                key={index}
                onClick={() => onSelectedItem(item)}
              >
                {item}
              </li>
            ))}
          </ul>
          {user.role === 'client' && pathname === '/mypage/owner' && (
            <BtnMypage
              onClick={() => navigate('/mypage')}
              className='mb-[50px] min-h-[44px] min-w-[170px] self-center text-[16px]'
            >
              이용자로 돌아가기
            </BtnMypage>
          )}
        </div>
      )}
      <button
        className={`absolute flex h-[35px] w-[40px] items-center justify-center border-b border-r border-b-gray-dc border-r-gray-dc ${arrowLocation}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <MdOutlineKeyboardDoubleArrowLeft className='text-2xl text-gray-75' />
        ) : (
          <MdOutlineKeyboardDoubleArrowRight className='text-2xl text-gray-75' />
        )}
      </button>
    </div>
  );
};

export default SideBar;