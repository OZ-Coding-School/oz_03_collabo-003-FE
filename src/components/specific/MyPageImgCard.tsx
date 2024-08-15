import React from 'react';
import BtnHeart from '../common/button/BtnHeart.tsx';

interface MyPageImgCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  layout: 'user' | 'owner';
  link: string;
  rating?: number;
  ratingParticipation?: number;
  viewer?: number;
  className?: string;
}

const MyPageImgCard: React.FC<MyPageImgCardProps> = ({
  id,
  title,
  description,
  image,
  layout,
  link,
  rating,
  ratingParticipation,
  viewer,
  className = '',
}) => {
  const handleOnClick = () => {
    if (link) {
      window.location.href = link;
    }
  };
  return (
    <div
      onClick={handleOnClick}
      className={`card-container shadow-lg flex h-[360px] w-[380px] flex-col overflow-hidden rounded-md bg-white shadow-custom-light ${className}`}
    >
      <img src={image} alt={title} className='h-3/4 object-cover' />
      <div className='text-box relative my-2'>
        <div className='title mx-4 mb-1'>
          <h2 className='mb-1 text-2xl font-bold text-black-b2'>{title}</h2>
          <p className='text-lg text-black'>{description}</p>
        </div>
        <div className='mx-4 text-sm text-gray-75'>
          <span className='font-bold'>평점: {rating}&nbsp;</span>
          <span>{`(${ratingParticipation})`}</span>
          <span>&nbsp;·&nbsp;</span>
          <span>{viewer} viewer</span>
        </div>
        <div className={`${layout === 'user' ? 'block' : 'hidden'} absolute right-8 top-8 text-2xl`}>
          <BtnHeart />
        </div>
      </div>
    </div>
  );
};

export default MyPageImgCard;
