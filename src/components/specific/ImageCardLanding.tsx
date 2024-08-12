import React from 'react';

interface ImageCardLandingProps {
  title: string;
  description: string;
  imageUrl: string;
  layout: 'vertical' | 'horizontal';
  className?: string;
}

const ImageCardLanding: React.FC<ImageCardLandingProps> = ({
  title,
  description,
  imageUrl,
  layout,
  className = '',
}) => {
  return (
    <div className={`flex ${layout === 'horizontal' ? 'flex-row' : 'flex-col'} overflow-hidden ${className}`}>
      <img src={imageUrl} alt={title} className={`object-cover ${layout === 'horizontal' ? 'w-1/2' : 'h-48 w-full'}`} />
      <div className='flex flex-col justify-between p-4'>
        <h2 className='text-xl font-bold'>{title}</h2>
        <p className='mt-2 text-[13px]'>{description}</p>
      </div>
    </div>
  );
};

export default ImageCardLanding;
