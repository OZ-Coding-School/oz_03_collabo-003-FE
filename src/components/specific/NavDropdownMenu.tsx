import React from 'react';
import { DropdownMenuProps } from '../../types/type';

const NavDropdownMenu: React.FC<DropdownMenuProps> = ({ data, isVisible, onMouseEnter, onMouseLeave }) => {
  if (!isVisible) return null;

  return (
    <div
      className={`absolute left-0 top-[70px] z-30 w-full bg-white pl-[205px] shadow-custom-down transition-all duration-300 ${
        isVisible ? 'animate-slideDown' : 'hidden'
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className='flex overflow-x-auto'>
        {data.map((category, index) => (
          <div key={index} className='min-w-[200px] p-4'>
            <a href={category.href} className='block px-4 py-2 text-[14px] font-bold hover:text-blue-hover'>
              {category.title}
            </a>
            <div>
              {category.items.map((item, itemIndex) => (
                <a
                  key={itemIndex}
                  href={item.href}
                  className='block px-4 py-[5px] text-[12px] text-gray-75 hover:text-blue-hover'
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavDropdownMenu;
