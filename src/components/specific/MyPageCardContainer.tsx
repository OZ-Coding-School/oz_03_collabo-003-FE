import React, { useState } from 'react';
import MyPageImgCard from './MyPageImgCard';
import Pagination from '../common/Pagination';
import allCards from '../../data/siteCard.json';

interface MyPageCardContainerProps {
  layout: 'user' | 'client'; // user = 찜 하트 활성화, client = 찜 하트 비활성화
}

const MyPageCardContainer: React.FC<MyPageCardContainerProps> = ({ layout }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = allCards.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(allCards.length / cardsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='mx-15 my-10 w-full'>
      {allCards.length > 0 ? (
        <>
          <div className='m-auto grid w-[1200px] grid-cols-3 gap-6'>
            <div className='col-span-3 text-lg'>
              <span className='text-gray-75'>전체</span>
              <span className='ml-1 font-semibold text-blue-accent'>{allCards.length}</span>
            </div>
            {currentCards.map((card) => (
              <MyPageImgCard key={card.id} {...card} layout={layout} />
            ))}
          </div>
        </>
      ) : (
        <div className='flex h-full w-full justify-center'>
          <span className='text-lg'>사이트를 추가해주세요.</span>
        </div>
      )}
      {allCards.length > 0 && <Pagination totalPages={totalPages} paginate={paginate} currentPage={currentPage} />}
    </div>
  );
};

export default MyPageCardContainer;
