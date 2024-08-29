import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/store'; // useAuthStore를 가져옵니다.
import NavBtn from '../common/button/NavBtn';
import NavMenu from '../specific/NavMenu';
import categories from '../../data/categories.json';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const { isLoggedIn, nickname, logOut } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    nickname: state.nickname,
    logOut: state.logOut,
  }));

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 810);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logOut();

    // 쿠키에서 토큰 삭제
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    navigate('/');
  };

  return (
    <div className='relative'>
      <nav className='z-40 flex h-[70px] w-full items-center justify-between border-b border-gray-dc bg-white px-[30px] sm:px-[50px] lg:px-[100px]'>
        <div className='flex w-full items-center'>
          <div
            onClick={() => navigate('/')}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
            role='button'
            tabIndex={0}
            className='flex cursor-pointer items-center'
          >
            <h1 className='text-[20px] font-bold text-blue-primary sm:text-[25px]'>ALLTHE</h1>
          </div>
          <div className='group relative ml-5 flex h-[70px] space-x-5 sm:ml-10'>
            {isMobile ? (
              <button className='text-[14px] font-semibold text-black hover:text-blue-hover lg:text-base'>
                카테고리
              </button>
            ) : (
              categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => navigate(`/category/${category.slug}`)}
                  className='font-semibold text-black hover:text-blue-hover'
                >
                  {category.categories}
                </button>
              ))
            )}
            <NavMenu categories={categories} />
          </div>
        </div>
        {isLoggedIn ? (
          <div className='flex items-center space-x-2'>
            <p
              onClick={() => navigate('/mypage')}
              className='mr-1 cursor-pointer whitespace-nowrap text-[12px] hover:font-bold hover:text-blue-hover hover:underline sm:text-[16px]'
            >
              {nickname}
            </p>
            <NavBtn onClick={handleLogout} className='bg-white text-black hover:bg-white-f9'>
              로그아웃
            </NavBtn>
          </div>
        ) : (
          <div className='flex space-x-2'>
            <NavBtn onClick={() => navigate('/login')} className='bg-white text-black hover:bg-white-f9'>
              로그인
            </NavBtn>
            <NavBtn onClick={() => navigate('/signup')} className='bg-blue-primary text-white hover:bg-blue-hover'>
              회원가입
            </NavBtn>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
