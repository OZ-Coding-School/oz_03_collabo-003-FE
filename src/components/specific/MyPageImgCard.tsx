import React from 'react';
import BtnHeart from '../common/button/BtnHeart';

interface MyPageImgCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  rating?: number;
  ratingParticipation?: number;
  viewer?: number;
  layout: 'user' | 'client'; // user = 찜 하트 활성화, client = 찜 하트 비활성화
}

const MyPageImgCard: React.FC<MyPageImgCardProps> = ({
  id,
  title,
  description,
  image,
  // link,
  rating,
  ratingParticipation,
  viewer,
  layout,
}) => {
  return (
    <div
      id={id.toString()}
      className='card-container shadow-lg flex h-[360px] w-[380px] flex-col overflow-hidden rounded-md bg-white'
    >
      <img src={image} alt={title} className='h-3/4 object-cover' />
      <div className='text-box relative my-2'>
        <div className='title mx-4 mb-1'>
          <h2 className='mb-1 w-full truncate text-xl font-bold'>{title}</h2>
          <p className='w-4/5 truncate text-lg'>{description}</p>
        </div>
        <div className='mx-4 text-sm text-gray-75'>
          <span className='font-bold'>평점: {rating}&nbsp;</span>
          <span>{`(${ratingParticipation})`}</span>
          <span>&nbsp;·&nbsp;</span>
          <span>{viewer} viewer</span>
        </div>
        {layout === 'user' && (
          <div className='absolute right-8 top-8 text-2xl'>
            <BtnHeart />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPageImgCard;
