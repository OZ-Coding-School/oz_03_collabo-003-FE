import React from 'react';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5, className = '' }) => {
  const filledStars = Math.round(rating);

  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <span key={i}>
        {i <= filledStars ? <IoIosStar className='text-yellow' /> : <IoIosStarOutline className='text-yellow' />}
      </span>
    );
  }

  return <div className={`flex ${className}`}>{stars}</div>;
};

export default StarRating;
