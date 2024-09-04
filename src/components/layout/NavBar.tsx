import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/store';
import NavBtn from '../common/button/NavBtn';
import NavMenu from '../specific/NavMenu';
import NavMobileMenu from '../specific/NavMobileMenu';
import { FiMenu } from 'react-icons/fi';
import Loading from '../common/Loading';
import { categoryService } from '../../apis/services/categoryService';
import { Category } from '../../types/type';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, username, logOut } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    username: state.username,
    logOut: state.logOut,
  }));

  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 820);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    if (isMobileMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      document.documentElement.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const fetchedCategories = await categoryService.getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('카테고리 fetch에러', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = () => {
    logOut();
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/');
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const onLoading = (path: string) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(path);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className='relative'>
      {isLoading && <Loading />}
      <nav className='z-40 flex h-[70px] w-full items-center justify-between border-b border-gray-dc bg-white px-[30px] sm:px-[50px] lg:px-[100px]'>
        <div className='flex items-center'>
          <button onClick={() => navigate('/')} tabIndex={0} className='flex cursor-pointer items-center'>
            <h1 className='text-[25px] font-bold text-blue-primary'>ALLTHE</h1>
          </button>

          {!isMobile && (
            <div className='group relative ml-5 flex h-[70px] space-x-5 sm:ml-10'>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onLoading(`/category/${category.slug}`)}
                  className='font-semibold text-black hover:text-blue-hover'
                >
                  {category.categories}
                </button>
              ))}
              <NavMenu categories={categories} />
            </div>
          )}
        </div>

        {!isMobile && (
          <div className='ml-auto flex items-center space-x-2'>
            {isLoggedIn ? (
              <>
                <p
                  onClick={() => onLoading('/mypage')}
                  className='mr-1 cursor-pointer whitespace-nowrap text-[12px] hover:font-bold hover:text-blue-hover hover:underline sm:text-[16px]'
                >
                  {username ?? '올디유저001'}
                </p>
                <NavBtn onClick={handleLogout} className='bg-white text-black hover:bg-white-f9'>
                  로그아웃
                </NavBtn>
              </>
            ) : (
              <>
                <NavBtn onClick={() => navigate('/login')} className='bg-white text-black hover:bg-white-f9'>
                  로그인
                </NavBtn>
                <NavBtn onClick={() => navigate('/signup')} className='bg-blue-primary text-white hover:bg-blue-hover'>
                  회원가입
                </NavBtn>
              </>
            )}
          </div>
        )}

        {isMobile && (
          <div className='ml-auto'>
            <FiMenu className='cursor-pointer text-[30px]' onClick={toggleMobileMenu} />
          </div>
        )}
      </nav>
      {isMobileMenuOpen && (
        <div className='absolute left-0 top-0 z-50 h-full w-full bg-white'>
          <NavMobileMenu
            categories={categories}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            isLoggedIn={isLoggedIn}
            logOut={handleLogout}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
