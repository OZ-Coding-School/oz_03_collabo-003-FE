import React, { useState } from 'react';
import TextBoxGray from '../common/TextBoxGray';
import { QnA } from '../../types/type.js';
import StarRating from '../common/StarRating.js';
import Pagination from '../common/Pagination.js';

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
interface DetailedReviewBoxProps {
  content: Content;
}

const DetailedReviewBox: React.FC<DetailedReviewBoxProps> = ({ content }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = content.review?.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='container px-36 py-10'>
      {currentReviews?.map((reviewItem, index) => (
        <TextBoxGray key={index} className='rounded-lg'>
          <div className='mb-4 text-gray-75'>{reviewItem.user_name}</div>
          <StarRating rating={reviewItem.rating} className='mb-4' />
          <div className='mb-4 pr-[400px]'>{reviewItem.comment}</div>
        </TextBoxGray>
      ))}
      <Pagination
        totalPages={Math.ceil((content.review?.length || 0) / reviewsPerPage)}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default DetailedReviewBox;
