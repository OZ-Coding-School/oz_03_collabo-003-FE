import React from 'react';

interface MainImageCardProps {
  title: string;
  description: string;
  imageUrl: string;
  layout: 'vertical' | 'horizontal';
  className?: string;
}

const MainImageCard: React.FC<MainImageCardProps> = ({ title, description, imageUrl, layout, className = '' }) => {
  return (
    <div className={`flex ${layout === 'horizontal' ? 'flex-row' : 'flex-col'} overflow-hidden ${className}`}>
      <img src={imageUrl} alt={title} className={`object-cover ${layout === 'horizontal' ? 'w-1/4' : 'h-48 w-full'}`} />
      <div className={`${layout === 'horizontal' ? 'w-1/4' : 'h-auto'} justify- center m-8 flex flex-col`}>
        <h2 className='text-2xl font-bold'>{title}</h2>
        <p className='mt-2 text-[13px] text-gray-75'>{description}</p>
      </div>
    </div>
  );
};

export default MainImageCard;
