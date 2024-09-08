import React from 'react';
import BtnHeart from '../common/button/BtnHeart';
import { useNavigate } from 'react-router-dom';
import { Content } from '../../types/type';

interface MyPageImgCardProps {
  content: Content;
  layout: 'user' | 'client';
}

const MyPageImgCard: React.FC<MyPageImgCardProps> = ({ content, layout }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    switch (layout) {
      case 'user':
        return navigate(`/contents/${content.id}`);
      case 'client':
        return navigate(`/mypage/owner/${content.id}`);
    }
  };

  return (
    <div
      id={content.id.toString()}
      className='card-container shadow-lg flex min-h-[310px] min-w-[280px] cursor-pointer flex-col gap-6 overflow-hidden rounded-md bg-white hover:scale-105 xl:h-[330px] xl:w-[330px] 2xl:h-[360px] 2xl:w-[380px]'
      onClick={clickHandler}
    >
      <img src={content.thumbnail} alt={content.title} className='h-[55%] object-cover xl:h-[55%] 2xl:h-[60%]' />
      <div className='text-box relative my-2'>
        <div className='title mx-4 mb-1'>
          <h2 className='mb-1 w-full truncate text-xl font-bold'>{content.title}</h2>
          <p className='w-4/5 truncate text-lg'>{content.site_description}</p>
        </div>
        <div className='mx-4 text-sm text-gray-75'>
          <span className='font-bold'>평점: {content.rating}&nbsp;</span>
          <span>{`(${content.ratingParticipation})`}</span>
          <span>&nbsp;·&nbsp;</span>
          <span>{content.viewer} viewer</span>
        </div>
        {layout === 'user' && (
          <div className='absolute right-8 top-8 text-2xl'>
            <BtnHeart isBookmarked={content.isBookmarked ?? false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPageImgCard;
