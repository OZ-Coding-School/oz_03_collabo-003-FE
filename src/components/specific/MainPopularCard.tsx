import React from 'react';
import { Link } from 'react-router-dom';
import { GoHeart } from 'react-icons/go';
//import { GoHeartFill } from "react-icons/go";

interface MainPopularCardProps {
  id: number;
  title: string;
  link: string;
  image: string;
  description: string;
}

const MainPopularCard: React.FC<MainPopularCardProps> = ({ title, link, image, description }) => {
  return (
    <div className='relative my-2 flex items-center justify-center'>
      <img className='rounded-sm' src={image} alt={title} />
      <div className='absolute left-0 top-0 flex h-full w-full flex-col justify-between p-2 md:p-3'>
        <div className='flex justify-between'>
          <div className='truncate text-[10px] font-bold sm:text-xs md:text-sm lg:text-base xl:text-lg'>{title}</div>
          <div className='flex items-center'>
            <GoHeart className='hidden cursor-pointer font-bold sm:block sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl' />
          </div>
        </div>
        <div className='flex items-center sm:justify-end md:justify-between md:gap-1 lg:gap-2'>
          <p className='hidden grow truncate md:block md:text-[10px] lg:text-xs'>{description}</p>
          <Link
            className='hidden rounded-sm bg-white text-center text-black shadow-custom-light sm:block sm:min-w-[55px] sm:px-2 sm:py-1 sm:text-[8px] md:min-w-[63px] md:text-[10px] lg:min-w-[71px] lg:px-3 lg:py-2 lg:text-xs'
            to={link}
          >
            바로가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPopularCard;
