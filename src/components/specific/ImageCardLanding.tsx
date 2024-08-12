import React from 'react';

interface ImageCardProps {
  title: string;
  description: string;
  imageUrl: string;
  layout: 'vertical' | 'horizontal';
}

const ImageCard: React.FC<ImageCardProps> = ({ title, description, imageUrl, layout }) => {
  return (
    <div
      className={`flex ${layout === 'horizontal' ? 'flex-row' : 'flex-col'} text-black-DEFAULT overflow-hidden bg-white`}
    >
      <img src={imageUrl} alt={title} className={`object-cover ${layout === 'horizontal' ? 'w-1/3' : 'h-48 w-full'}`} />
      <div className='flex flex-col justify-between p-4'>
        <h2 className='text-xl font-bold'>{title}</h2>
        <p className='mt-2'>{description}</p>
      </div>
    </div>
  );
};

export default ImageCard;
