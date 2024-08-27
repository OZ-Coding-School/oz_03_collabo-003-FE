import React from 'react';
import { useNavigate } from 'react-router-dom';
import categories from '../../data/categories.json';
import NavBtn from '../common/button/NavBtn';
import NavMenu from '../specific/NavMenu';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='relative'>
      <nav className='z-40 flex h-[70px] w-full items-center justify-between border-b border-gray-dc bg-white px-[100px]'>
        <div className='flex w-full items-center'>
          <div
            onClick={() => navigate('/')}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
            role='button'
            tabIndex={0}
            className='flex cursor-pointer items-center'
          >
            <h1 className='ml-[10px] text-[25px] font-bold text-blue-primary'>ALLTHE</h1>
          </div>
          <div className='group relative ml-10 flex h-[70px] space-x-5'>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigate(`/category/${category.slug}`)}
                className='font-semibold text-black hover:text-blue-hover'
              >
                {category.categories}
              </button>
            ))}
            <NavMenu categories={categories} />
          </div>
        </div>
        <div className='flex space-x-2'>
          <NavBtn onClick={() => navigate('/login')} className='bg-white text-black hover:bg-white-f9'>
            로그인
          </NavBtn>
          <NavBtn onClick={() => navigate('/signup')} className='bg-blue-primary text-white hover:bg-blue-hover'>
            회원가입
          </NavBtn>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
