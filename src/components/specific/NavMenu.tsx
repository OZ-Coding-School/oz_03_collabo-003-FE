import React from 'react';

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
}

const NavMenu: React.FC<NavMenuProps> = ({ categories }) => {
  return (
    <div className='fixed left-[-20px] top-[66px] z-40 hidden w-[100vw] animate-slideDown bg-white py-4 shadow-custom-light group-hover:block'>
      <div className='flex overflow-x-auto px-[110px]'>
        {categories.map((category) => (
          <div key={category.id} className='mr-[50px] flex flex-col space-y-1'>
            <a href={`/category/${category.slug}`} className='font-semibold text-black hover:text-blue-hover'>
              <h3>{category.categories}</h3>
            </a>
            {category.subCategories.map((subCategory) => (
              <a
                key={subCategory.id}
                href={`/category/${category.slug}/${subCategory.slug}`}
                className='block px-1 py-1 text-sm text-black hover:font-bold hover:text-blue-hover'
              >
                {subCategory.label}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavMenu;
