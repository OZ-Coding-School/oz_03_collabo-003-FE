import React from 'react';
import BtnHeart from '../common/button/BtnHeart';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const clickHandler = () => {
    switch (layout) {
      case 'user':
        return;
      case 'client':
        return navigate(`/mypage/owner/${id}`);
    }
  };

  return (
    <div
      id={id.toString()}
      className='card-container shadow-lg flex min-h-[310px] min-w-[280px] cursor-pointer flex-col gap-6 overflow-hidden rounded-md bg-white hover:scale-105 xl:h-[330px] xl:w-[330px] 2xl:h-[360px] 2xl:w-[380px]'
      onClick={clickHandler}
    >
      <img src={image} alt={title} className='h-[55%] object-cover xl:h-[55%] 2xl:h-[60%]' />
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
