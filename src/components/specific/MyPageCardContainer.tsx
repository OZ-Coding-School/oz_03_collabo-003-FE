import React, { useState } from 'react';
import MyPageImgCard from './MyPageImgCard';
import Pagination from '../common/Pagination';
import allCards from '../../data/contents.json';
import BtnMypage from '../common/button/BtnMypage';
import { useNavigate } from 'react-router-dom';

interface MyPageCardContainerProps {
  layout: 'user' | 'client'; // user = 찜 하트 활성화, client = 찜 하트 비활성화
}

const myCards = allCards.filter((card) => card.user_id === 1);
const ownerCards = myCards.filter((card) => card.is_analyzed === true);

const MyPageCardContainer: React.FC<MyPageCardContainerProps> = ({ layout }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = (layout === 'user' ? myCards : ownerCards).slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil((layout === 'user' ? myCards : ownerCards).length / cardsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const sitePlusBtn = () => {
    navigate('/register');
  };

  return (
    <div className='h-[calc(100vh-70px)] w-full overflow-auto'>
      <div className='mx-15 my-10 w-full px-4'>
        {myCards.length > 0 ? (
          <>
            <div className='m-auto grid w-[860px] grid-cols-3 gap-4 xl:w-[1030px] xl:gap-5 2xl:w-[1200px] 2xl:gap-6'>
              {layout === 'user' && (
                <div className='col-span-3 text-lg'>
                  <span className='text-gray-75'>전체</span>
                  <span className='ml-1 font-semibold text-blue-accent'>{myCards.length}</span>
                </div>
              )}
              {layout === 'client' && (
                <div className='col-span-3 flex justify-between'>
                  <div className='text-lg'>
                    <span className='text-gray-75'>전체</span>
                    <span className='ml-1 font-semibold text-blue-accent'>{ownerCards.length}</span>
                  </div>
                  <BtnMypage onClick={sitePlusBtn} className='mx-2 w-[160px] p-2 text-sm font-semibold'>
                    + 사이트 등록하기
                  </BtnMypage>
                </div>
              )}
              {currentCards.map((card) => (
                <MyPageImgCard
                  key={card.id}
                  content={{
                    id: card.id,
                    title: card.title,
                    site_description: card.site_description,
                    thumbnail: card.thumbnail,
                    site_url: card.site_url,
                    rating: card.rating,
                    ratingParticipation: card.ratingParticipation,
                    viewer: card.viewer,
                    isBookmarked: card.isBookmarked,
                  }}
                  layout={layout}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            {layout === 'user' && (
              <div className='flex h-full w-full justify-center'>
                <span className='text-lg'>사이트를 추가해주세요.</span>
              </div>
            )}
            {layout === 'client' && (
              <div className='flex h-full w-full flex-col items-center gap-3'>
                <span className='text-lg'>나만의 사이트를 등록해 보세요.</span>
                <BtnMypage onClick={sitePlusBtn} className='mx-2 w-[160px] p-2 text-sm font-semibold'>
                  + 사이트 등록하기
                </BtnMypage>
              </div>
            )}
          </>
        )}
        {layout === 'user' && myCards.length > 0 && (
          <Pagination totalPages={totalPages} paginate={paginate} currentPage={currentPage} />
        )}
        {layout === 'client' && ownerCards.length > 0 && (
          <Pagination totalPages={totalPages} paginate={paginate} currentPage={currentPage} />
        )}
      </div>
    </div>
  );
};

export default MyPageCardContainer;
