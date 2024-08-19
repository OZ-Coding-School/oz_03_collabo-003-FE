import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBtn from '../common/button/NavBtn';
import NavDropdownMenu from '../specific/NavDropdownMenu';
import NavMenu from '../specific/NavMenu';
import { categoryData } from '../../data/categoryData';
import { userGuideData } from '../../data/userGuideData';
import { Category } from '../../types/type';

const NavBar = () => {
  const navigate = useNavigate();
  const [dropdownContent, setDropdownContent] = useState<Category[]>([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = (content: Category[]) => {
    setDropdownContent(content);
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const menuItems = [
    { label: '이용안내', data: userGuideData },
    { label: '업무 툴', data: categoryData },
    { label: 'AI 툴', data: categoryData },
    { label: '정보 플랫폼', data: categoryData },
    { label: '정부지원', data: categoryData },
  ];

  return (
    <>
      <div
        className='z-30 flex h-[70px] w-full items-center justify-between border-b border-gray-dc bg-white px-[100px]'
        onMouseLeave={handleMouseLeave}
      >
        <div className='flex items-center'>
          <div
            onClick={() => navigate('/')}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
            role='button'
            tabIndex={0}
            className='flex cursor-pointer items-center'
          >
            <h1 className='ml-[10px] text-[25px] font-bold text-blue-primary'>ALLTHE</h1>
          </div>
          <NavMenu menuItems={menuItems} onMenuItemMouseEnter={handleMouseEnter} />
        </div>
        <div className='flex space-x-[10px]'>
          <NavBtn onClick={() => navigate('/login')} className='bg-white text-black hover:bg-white-f9'>
            로그인
          </NavBtn>
          <NavBtn onClick={() => navigate('/signup')} className='bg-blue-primary text-white hover:bg-blue-hover'>
            회원가입
          </NavBtn>
        </div>
      </div>
      <NavDropdownMenu
        data={dropdownContent}
        isVisible={isDropdownVisible}
        onMouseEnter={() => setDropdownVisible(true)}
        onMouseLeave={handleMouseLeave}
      />
    </>
  );
};

export default NavBar;
