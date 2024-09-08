import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MainPopularCardProps {
  id: number;
  title: string;
  thumbnail: string;
}

const MainPopularCard: React.FC<MainPopularCardProps> = ({ id, title, thumbnail }) => {
  const navigate = useNavigate();
  return (
    <div className='relative my-2 flex items-center justify-center bg-white'>
      <img className='rounded-sm bg-white' src={thumbnail} alt={title} />
      <div className='absolute left-0 top-0 flex h-full w-full flex-col justify-between backdrop-blur-[1px]'>
        <div className='flex justify-between rounded-t-sm backdrop-blur'>
          <div
            className='cursor-pointer truncate px-2 py-1 text-[10px] font-bold sm:text-xs md:text-sm lg:text-base xl:text-lg'
            onClick={() => navigate(`/contents/${id}`)}
          >
            {title}
          </div>
          <div className='flex items-center'></div>
        </div>
        <div className='flex items-center justify-end rounded-b-sm backdrop-blur'>
          <button
            className='mx-2 hidden rounded-sm bg-white text-center text-black shadow-custom-dark sm:block sm:min-w-[55px] sm:px-2 sm:py-0.5 sm:text-[8px] md:min-w-[63px] md:text-[10px] lg:min-w-[71px] lg:px-3 lg:py-1.5 lg:text-xs'
            onClick={() => navigate(`/contents/${id}`)}
          >
            상세보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPopularCard;
