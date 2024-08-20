import React, { useState } from 'react';
import SelectedBar from '../common/SelectedBar.tsx';
import DetailedQnABox from './DeatailedQnABox.tsx';
import DetailedReviewBox from './DetailedReviewBox.tsx';
import { QnA } from '../../types/type.js';

interface Content {
  id: number;
  title: string;
  link: string;
  image: string;
  description: string;
  category: string;
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

interface DetailedContentsProps {
  content: Content;
}

const tabs = [
  { id: 'details', label: '상세정보' },
  { id: 'qa', label: 'Q&A' },
  { id: 'reviews', label: '후기' },
];

const DetailedContents: React.FC<DetailedContentsProps> = ({ content }) => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].id);
  return (
    <div className='container mx-auto'>
      <div>
        <div>
          <SelectedBar tabs={tabs} defaultSelected='details' onTabSelect={(id) => setSelectedTab(id)} />
        </div>
        <div className='my-20'>
          {selectedTab === 'details' && (
            <div>
              <h2 className='m-4 text-center text-2xl font-bold'>상세내용</h2>
              <div className='rounded-lg border border-black px-6 py-10'>
                <p>{content.detailedInfo}</p>
              </div>
            </div>
          )}
          {selectedTab === 'qa' && <DetailedQnABox content={content} />}
          {selectedTab === 'reviews' && <DetailedReviewBox content={content} />}
        </div>
      </div>
    </div>
  );
};

export default DetailedContents;
