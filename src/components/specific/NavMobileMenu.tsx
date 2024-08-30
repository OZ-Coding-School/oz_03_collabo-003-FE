import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

interface SubCategory {
  id: number;
  label: string;
  slug: string;
}

interface Category {
  id: number;
  categories: string;
  slug: string;
  subCategories: SubCategory[];
}

interface NavMenuProps {
  categories: Category[];
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
}

const NavMobileMenu: React.FC<NavMenuProps> = ({ categories, setIsMobileMenuOpen, isLoggedIn }) => {
  const navigate = useNavigate();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

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
    navigate(`/category/${categorySlug}`);
    handleMobileMenu();
  };

  const handleSubCategoryClick = (categorySlug: string, subCategorySlug: string) => {
    navigate(`/category/${categorySlug}/${subCategorySlug}`);
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

  const selectedCategory = categories.find((category) => category.id === selectedCategoryId);

  return (
    <div
      className={`h-[100vh] transform bg-white transition-transform duration-300 ${
        isAnimating ? 'translate-x-full' : isClosing ? 'translate-x-full' : 'translate-x-0'
      }`}
    >
      <nav className='flex h-[70px] w-full items-center justify-between border-b border-gray-dc px-[30px] sm:px-[50px]'>
        <div
          onClick={() => navigate('/')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
          role='button'
          tabIndex={0}
          className='flex cursor-pointer items-center'
        >
          <h1 className='text-[25px] font-bold text-blue-primary'>ALLTHE</h1>
        </div>
        <div>
          <IoMdClose className='cursor-pointer text-[25px]' onClick={handleMobileMenu} />
        </div>
      </nav>
      <div className='flex h-[calc(100%-70px)] max-w-[820px]'>
        <div className='w-[240px] border-r border-gray-dc bg-white-f9'>
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
        <div className='w-full pl-[30px]'>
          {selectedCategory && (
            <>
              <div
                className='flex h-[60px] cursor-pointer items-center text-lg font-bold hover:font-bold hover:text-blue-hover'
                onClick={() => handleMainCategoryClick(selectedCategory.slug)}
              >
                {selectedCategory.categories}
              </div>
              {selectedCategory.subCategories.map((subCategory) => (
                <div
                  key={subCategory.id}
                  className='flex h-[40px] cursor-pointer items-center hover:font-bold hover:text-blue-hover'
                  onClick={() => handleSubCategoryClick(selectedCategory.slug, subCategory.slug)}
                >
                  {subCategory.label}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavMobileMenu;
