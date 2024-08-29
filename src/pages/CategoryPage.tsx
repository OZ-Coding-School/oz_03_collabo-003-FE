import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Pagination from '../components/common/Pagination';
import categoriesData from '../data/categories.json';
import categoriesContentsData from '../data/categoriesContents.json';
import subCategoriesContentsData from '../data/subCategoriesContents.json';

interface ContentItem {
  id: number;
  title: string;
  link: string;
  image: string;
  summary: string;
}

const CategoryPage: React.FC = () => {
  const { categorySlug, subCategorySlug } = useParams<{ categorySlug: string; subCategorySlug?: string }>();
  const navigate = useNavigate();
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const [subCategoryName, setSubCategoryName] = useState<string>('');

  const [currentPage, setCurrentPage] = useState<number>(1);
  const cardsPerPage = 8;

  useEffect(() => {
    const selectedCategory = categoriesData.find((category) => category.slug === categorySlug);

    if (!selectedCategory) {
      navigate('/404');
      return;
    }

    setCategoryName(selectedCategory.categories);

    if (subCategorySlug) {
      const selectedSubCategory = selectedCategory.subCategories.find(
        (subCategory) => subCategory.slug === subCategorySlug
      );

      if (!selectedSubCategory) {
        navigate('/404');
        return;
      }

      setSubCategoryName(selectedSubCategory.label);

      const subCategoryContent = subCategoriesContentsData.find(
        (content) => content.categoryId === selectedCategory.id && content.subCategoryId === selectedSubCategory.id
      );

      setContents(subCategoryContent ? subCategoryContent.content : []);
    } else {
      const categoryContent = categoriesContentsData.find((content) => content.categoryId === selectedCategory.id);

      setContents(categoryContent ? categoryContent.content : []);
    }
  }, [categorySlug, subCategorySlug, navigate]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = contents.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(contents.length / cardsPerPage);

  return (
    <div className='flex min-h-[calc(100vh-70px)] flex-col'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-center'>
          <h2 className='my-[50px] text-[28px]'>
            {subCategoryName || categoryName}에 도움을 주는 사이트를 소개합니다.
          </h2>
        </div>
        {contents.length === 0 ? (
          <div className='flex items-center justify-center'>
            <p className='mt-[50px] text-center text-gray-75'>해당 카테고리에 대한 컨텐츠가 없습니다.</p>
          </div>
        ) : (
          <>
            <div className='flex w-full justify-center px-4'>
              <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm-md:grid-cols-1'>
                {currentCards.map((item) => (
                  <div
                    key={item.id}
                    className='w-full max-w-[330px] cursor-pointer overflow-hidden bg-white shadow-custom-light transition-shadow duration-300 hover:scale-105'
                    onClick={() => navigate(`/contents/${item.id}`)}
                  >
                    <img src={item.image} alt={item.title} className='h-48 w-full object-cover' />
                    <div className='p-4'>
                      <h3 className='mb-2 text-center text-[20px] font-semibold'>{item.title}</h3>
                      <p className='text-gray-75'>{item.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {totalPages > 0 && <Pagination totalPages={totalPages} paginate={paginate} currentPage={currentPage} />}
            <div className='h-5'></div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
