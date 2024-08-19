import React from 'react';
import { Category } from '../../types/type';

interface NavMenuProps {
  menuItems: { label: string; data: Category[] }[];
  onMenuItemMouseEnter: (data: Category[]) => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ menuItems, onMenuItemMouseEnter }) => {
  return (
    <div className='ml-[30px] flex space-x-[20px]'>
      {menuItems.map((item, index) => (
        <button
          key={index}
          className='text-[14px] hover:font-bold hover:text-blue-hover'
          onMouseEnter={() => onMenuItemMouseEnter(item.data)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default NavMenu;
