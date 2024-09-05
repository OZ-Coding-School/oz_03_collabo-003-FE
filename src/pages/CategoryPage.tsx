import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Pagination from '../components/common/Pagination';
import { categoryContentService } from '../apis/services/categoryContentService';
import { categoryService } from '../apis/services/categoryService';

interface ContentItem {
  id: number;
  title: string;
  thumbnail: string;
  siteDescription: string;
}

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { categorySlug, semiCategorySlug } = useParams<{ categorySlug: string; semiCategorySlug?: string }>();

  const [contents, setContents] = useState<ContentItem[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const [semiCategoryName, setSemiCategoryName] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const cardsPerPage = 8;

  useEffect(() => {
    setCategoryName('');
    setSemiCategoryName('');
    setContents([]);

    const fetchCategoryData = async () => {
      try {
        const categories = await categoryService.getCategories();
        const selectedCategory = categories.find((category) => category.slug === categorySlug);

        if (!selectedCategory) {
          navigate('/404');
          return;
        }

        setCategoryName(selectedCategory.categories);

        if (semiCategorySlug) {
          const selectedSemiCategory = selectedCategory.semiCategories.find(
            (semiCategory) => semiCategory.slug === semiCategorySlug
          );

          if (!selectedSemiCategory) {
            navigate('/404');
            return;
          }

          setSemiCategoryName(selectedSemiCategory.label);

          const semiCategoryContents = await categoryContentService.getSemiCategoryContents();
          const filteredContents = semiCategoryContents.filter(
            (content) =>
              content.main_category === selectedCategory.id && content.semi_category === selectedSemiCategory.id
          );

          setContents(
            filteredContents.map((content) => ({
              id: content.contentId,
              title: content.title,
              thumbnail: content.thumbnail,
              siteDescription: content.siteDescription || '',
            }))
          );
        } else {
          const mainCategoryContents = await categoryContentService.getMainCategoryContents(selectedCategory.id);

          setContents(
            mainCategoryContents.map((content) => ({
              id: content.contentId,
              title: content.title,
              thumbnail: content.thumbnail,
              siteDescription: content.siteDescription || '',
            }))
          );
        }
      } catch (error) {
        console.error('카테고리 데이터를 가져오는 동안 오류가 발생했습니다:', error);
        navigate('/404');
      }
    };

    fetchCategoryData();
  }, [categorySlug, semiCategorySlug, navigate]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = contents.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(contents.length / cardsPerPage);

  return (
    <div className='flex min-h-[calc(100vh-70px)] flex-col'>
      <div className='container mx-auto w-full px-4'>
        <div className='flex justify-center'>
          <h2 className='my-[50px] text-center text-[20px] md:text-[28px]'>
            <span className='block sm:inline'>{semiCategoryName || categoryName}에</span>
            <span className='block sm:inline'>도움을 주는 사이트를 소개합니다.</span>
          </h2>
        </div>
        {contents.length === 0 ? (
          <div className='flex items-center justify-center'>
            <p className='mt-[50px] text-center text-gray-75'>해당 카테고리에 대한 콘텐츠가 없습니다.</p>
          </div>
        ) : (
          <>
            <div className='flex w-full justify-center px-4'>
              <div className='md-lg:w-[710px] md-lg:grid-cols-2 lg-xl:grid-cols-3 container grid max-w-full gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm-md:grid-cols-1'>
                {currentCards.map((item) => (
                  <div
                    key={item.id}
                    className='w-full min-w-[330px] max-w-[330px] cursor-pointer overflow-hidden bg-white shadow-custom-light transition-shadow duration-300 hover:scale-105'
                    onClick={() => navigate(`/contents/${item.id}`)}
                  >
                    <img src={item.thumbnail} alt={item.title} className='h-48 w-full object-cover' />
                    <div className='p-4'>
                      <h3 className='mb-2 text-center text-[20px] font-semibold'>{item.title}</h3>
                      <p className='text-gray-75'>{item.siteDescription}</p>
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
