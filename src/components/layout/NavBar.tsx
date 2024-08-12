import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BtnNav from '../common/button/BtnNav';
import DropdownMenu from '../DropdownMenu';
import { categoryData } from '../../Data/categoryData';
import { promoData } from '../../Data/promoData';
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

  return (
    <>
      <div
        className='flex h-[70px] w-full items-center justify-between border-b border-gray-dc px-[100px]'
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
            <div className='h-[30px] w-[30px] rounded-[5px] bg-blue-primary'></div>
            <h1 className='ml-[10px] text-[20px] font-bold text-blue-primary'>ALLTHE</h1>
          </div>
          <div className='ml-[30px] flex space-x-[20px]'>
            <button
              className='text-[14px] font-bold hover:text-blue-hover'
              onMouseEnter={() => handleMouseEnter(categoryData)}
            >
              카테고리
            </button>
            <button
              className='text-[14px] font-bold hover:text-blue-hover'
              onMouseEnter={() => handleMouseEnter(promoData)}
            >
              프로모
            </button>
          </div>
        </div>
        <div className='flex space-x-[10px]'>
          <BtnNav onClick={() => navigate('/login')} className='bg-white text-black hover:bg-white-f9'>
            로그인
          </BtnNav>
          <BtnNav onClick={() => navigate('/signup')} className='bg-blue-primary text-white hover:bg-blue-hover'>
            회원가입
          </BtnNav>
        </div>
      </div>
      <DropdownMenu
        data={dropdownContent}
        isVisible={isDropdownVisible}
        onMouseEnter={() => setDropdownVisible(true)}
        onMouseLeave={handleMouseLeave}
      />
    </>
  );
};

export default NavBar;
