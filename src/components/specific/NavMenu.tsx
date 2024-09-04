import React, { useState } from 'react';
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
}

const NavMenu: React.FC<NavMenuProps> = ({ categories }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onLoading = (path: string) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(path);
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {isLoading && <Loading className='left-[-20px]' />}
      <div className='fixed left-[-20px] top-[66px] z-40 hidden w-screen animate-slideDown bg-white py-4 shadow-custom-light group-hover:block'>
        <div className='flex overflow-x-auto px-[110px]'>
          {categories.map((category) => (
            <div key={category.id} className='mr-[50px] flex flex-col space-y-1'>
              <button
                onClick={() => onLoading(`/category/${category.slug}`)}
                className='bg-transparent cursor-pointer border-none font-semibold text-black hover:text-blue-hover'
              >
                <h3>{category.categories}</h3>
              </button>
              {category.semiCategories.map((semiCategory) => (
                <button
                  key={semiCategory.id}
                  onClick={() => onLoading(`/category/${category.slug}/${semiCategory.slug}`)}
                  className='bg-transparent block cursor-pointer border-none px-1 py-1 text-sm text-black hover:font-bold hover:text-blue-hover'
                >
                  {semiCategory.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavMenu;
