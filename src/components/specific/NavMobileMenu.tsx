import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../common/Loading';

interface SemiCategory {
  id: number;
  label: string;
  slug: string;
}

interface Category {
  id: number;
  categories: string;
  slug: string;
  semiCategories: SemiCategory[];
}

interface NavMenuProps {
  categories: Category[];
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  logOut: () => void;
}

const NavMobileMenu: React.FC<NavMenuProps> = ({ categories, setIsMobileMenuOpen, isLoggedIn, logOut }) => {
  const navigate = useNavigate();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onLoading = (path: string) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(path);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategoryId(categories[0].id);
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 10);
  }, [categories]);

  const handleMobileMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 300);
  };

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const handleMainCategoryClick = (categorySlug: string) => {
    onLoading(`/category/${categorySlug}`);
    handleMobileMenu();
  };

  const handleSemiCategoryClick = (categorySlug: string, semiCategorySlug: string) => {
    onLoading(`/category/${categorySlug}/${semiCategorySlug}`);
    handleMobileMenu();
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      navigate('/mypage');
    } else {
      navigate('/login');
    }
    handleMobileMenu();
  };

  const handleLogoutClick = () => {
    logOut();
    navigate('/');
    handleMobileMenu();
  };

  const selectedCategory = categories.find((category) => category.id === selectedCategoryId);

  return (
    <>
      {isLoading && <Loading />}
      <nav
        className={`h-screen transform bg-white transition-transform duration-300 ${
          isAnimating ? 'translate-x-full' : isClosing ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className='flex h-[calc(100%-70px)] max-w-[820px]'>
          <div className='flex w-[240px] flex-col justify-between border-r border-gray-dc bg-white-f9'>
            <div>
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`flex h-[60px] cursor-pointer items-center pl-[30px] hover:bg-white hover:font-bold hover:shadow-custom-light ${
                    selectedCategoryId === category.id ? 'bg-white font-bold shadow-custom-light' : ''
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.categories}
                </div>
              ))}
              <div
                className='flex h-[60px] cursor-pointer items-center pl-[30px] hover:bg-white hover:font-bold hover:shadow-custom-light'
                onClick={handleAuthClick}
              >
                {isLoggedIn ? '마이페이지' : '로그인'}
              </div>
            </div>
            {isLoggedIn && (
              <div>
                <div
                  className='flex h-[60px] cursor-pointer items-center pl-[30px] hover:bg-white hover:font-bold hover:shadow-custom-light'
                  onClick={handleLogoutClick}
                >
                  로그아웃
                </div>
              </div>
            )}
          </div>
          <div className='w-full pl-[30px]'>
            {selectedCategory && (
              <>
                <div
                  className='flex h-[60px] cursor-pointer items-center text-lg font-bold hover:font-bold hover:text-blue-hover'
                  onClick={() => handleMainCategoryClick(selectedCategory.slug)}
                >
                  {selectedCategory.categories}
                </div>
                {selectedCategory.semiCategories.map((semiCategory) => (
                  <div
                    key={semiCategory.id}
                    className='flex h-[40px] cursor-pointer items-center hover:font-bold hover:text-blue-hover'
                    onClick={() => handleSemiCategoryClick(selectedCategory.slug, semiCategory.slug)}
                  >
                    {semiCategory.label}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavMobileMenu;
