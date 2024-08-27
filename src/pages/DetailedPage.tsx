// import React from 'react';
import DetailedContents from '../components/specific/DetailedContents.tsx';
import DetailedTitle from '../components/specific/DetailedTitle.tsx';
import { useParams } from 'react-router-dom';
import contentData from '../data/detailedContents.json';

const DetailedPage = () => {
  const { contentId } = useParams<{ contentId: string }>();

  const numericContentId = Number(contentId);

  const content = contentData.find((item) => item.id === numericContentId);

  if (!content) {
    return <div>해당 콘텐츠를 찾을 수 없습니다.</div>;
  }

  return (
    <div className='detail-container'>
      <div className='img-box h-[60vh] bg-gray-c4'>
        <img src={content.image} alt={content.title} className='m-auto h-full'></img>
      </div>
      <div className='site-title-box'>
        <div>
          <DetailedTitle content={content} />
        </div>
      </div>
      <div>
        <DetailedContents content={content} />
      </div>
    </div>
  );
};

export default DetailedPage;
