import React from 'react';
import BtnMypage from '../common/button/BtnMypage';
import BtnHeart from '../common/button/BtnHeart';
import { QnA } from '../../types/type.ts';

interface Content {
  id: number;
  title: string;
  site_url: string;
  thumbnail: string;
  site_description: string;
  main_category?: {
    id: number;
    categories: string;
    slug: string;
    semi_category: {
      id: number;
      label: string;
      slug: string;
    };
  };
  detailedInfo?: string;
  review?: {
    id: number;
    user_id: number;
    user_name?: string;
    comment: string;
    rating: number;
  }[];
  qna?: QnA[];
  viewCount?: number;
  likeCount?: number;
}

interface DetailedTitleProps {
  content: Content;
}

const DetailedTitle: React.FC<DetailedTitleProps> = ({ content }) => {
  const handleJoinClick = () => {
    window.location.href = content.site_url;
  };

  return (
    <div className='container mx-auto my-20 w-1/2'>
      <div className='m-10 flex justify-between'>
        <h2 className='break-all text-3xl font-bold'>{content.title}</h2>
        <div className='flex'>
          <BtnMypage onClick={handleJoinClick} className='relative flex px-2 py-1'>
            <p className='mr-6'>사이트로 이동하기</p>
            <img
              src='../images/new-window-white.png'
              alt='new-window'
              className='align-center absolute right-2 top-[7px] size-[18px]'
            />
          </BtnMypage>
          <BtnHeart className='mx-3 text-3xl' />
        </div>
      </div>
      <div className='ml-10 w-1/2 text-gray-75'>{content.site_description}</div>
    </div>
  );
};

export default DetailedTitle;
