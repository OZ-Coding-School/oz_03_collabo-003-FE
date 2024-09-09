import React, { useState } from 'react';
import TextBoxGray from '../common/TextBoxGray';
import BtnToggle from '../common/button/BtnToggle';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import dayjs from 'dayjs';
import Pagination from '../common/Pagination.js';
import { QnA } from '../../types/type.js';

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

interface DetailedQnABoxProps {
  content: Content;
}

const DetailedQnABox: React.FC<DetailedQnABoxProps> = ({ content }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const qnasPerPage = 5;

  // Calculate the current Q&A items to display
  const indexOfLastQna = currentPage * qnasPerPage;
  const indexOfFirstQna = indexOfLastQna - qnasPerPage;
  const currentQnas = content.qna?.slice(indexOfFirstQna, indexOfLastQna);

  const [toggledIndexes, setToggledIndexes] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    setToggledIndexes((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const dateColor = 'text-gray-75';
  return (
    <div className='container size-auto px-32 py-10'>
      {currentQnas?.map((qnaItem, index) => {
        const isToggled = toggledIndexes.includes(index);
        const qusetDateFormat = dayjs(qnaItem.created_at).format('YYYY-MM-DD');
        const answerDateFormat = dayjs(qnaItem.answer?.created_at).format('YYYY-MM-DD');
        return (
          <TextBoxGray key={index} className='relative rounded-lg'>
            <div className='flex justify-between'>
              <div className={`${dateColor}`}>{qusetDateFormat}</div>
              <div className='font-semibold'>
                {qnaItem.answer ? (
                  <p className='text-blue-accent'>답변완료</p>
                ) : (
                  <p className='text-gray-db'>답변미완료</p>
                )}
              </div>
            </div>
            <div className='my-10 flex justify-between'>
              <p className='font-semibold text-gray-46'>질문: {qnaItem.content}</p>
              {qnaItem.answer && (
                <BtnToggle initialChecked={isToggled} onToggle={() => handleToggle(index)}>
                  <div className='absolute bottom-3 right-4'>
                    {isToggled ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                  </div>
                </BtnToggle>
              )}
            </div>
            <div>
              {isToggled && qnaItem.answer && (
                <div className='border-t border-gray-dc'>
                  <div className={`${dateColor} mt-10`}>{answerDateFormat}</div>
                  <p className='my-10'>답변: {qnaItem.answer.content}</p>
                </div>
              )}
            </div>
          </TextBoxGray>
        );
      }) || <div>Q&A 데이터가 없습니다.</div>}
      <Pagination
        totalPages={Math.ceil((content.qna?.length || 0) / qnasPerPage)}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default DetailedQnABox;
