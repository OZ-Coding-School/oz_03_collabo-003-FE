import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BtnMypage from '../common/button/BtnMypage';
import Pagination from '../common/Pagination';
import AnalystReportModal from './AnalystReportModal';
import analysisContents from '../../data/analysisContents.json';

type AnalysisContent = {
  contentId: number;
  clientId: number;
  title: string;
  link: string;
  image: string;
  description: string;
  category: string;
};

const MyPageAnalystAnalyze = () => {
  const [contents, setContents] = useState<AnalysisContent[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 3;
  const indexOfLastContent = currentPage * cardsPerPage;
  const indexOfFirstContent = indexOfLastContent - cardsPerPage;
  const currentContents = contents.slice(indexOfFirstContent, indexOfLastContent);
  const totalPages = Math.ceil(contents.length / cardsPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const openReportModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    setContents(analysisContents);
  }, []);

  return (
    <div className='h-[calc(100vh-70px)] w-full overflow-auto'>
      <div className={`mx-auto my-20 flex w-[680px] flex-col ${contents.length > 0 ? 'gap-5' : 'gap-10'} px-4`}>
        <ul className='flex flex-col'>
          <p className='mb-3 text-lg'>안내 사항</p>
          <li className='text-gray-75'>1. 분석 신청 건 중에서 의뢰자가 수락한 사이트만 조회 가능합니다.</li>
          <li className='text-gray-75'>2. 바로가기 링크를 통해서 사이트를 꼼꼼히 분석해 보세요.</li>
          <li className='text-gray-75'>3. 분석한 내용을 파일로 정리하여 업로드 해주세요.</li>
        </ul>
        <section className='flex flex-col gap-4'>
          <div className='flex gap-2'>
            <p className={`text-lg ${contents.length > 0 ? 'mb-0.5 self-end' : ''}`}>분석 가능한 사이트</p>
            {contents.length > 0 && (
              <Pagination totalPages={totalPages} paginate={paginate} currentPage={currentPage} />
            )}
          </div>
          {contents.length > 0 ? (
            <ul className='grid grid-cols-1 grid-rows-3 gap-4'>
              {currentContents.map((content) => (
                <li className='flex gap-2 rounded-md bg-white p-4 hover:scale-105' key={content.contentId}>
                  <img src={content.image} alt={content.title} className='h-[120px] w-[150px] rounded-sm' />
                  <div className='flex max-w-[450px] grow flex-col gap-1'>
                    <span className='truncate text-lg font-semibold'>{content.title}</span>
                    <span className='truncate'>{content.description}</span>
                    <span className='truncate text-sm text-gray-46'>{content.link}</span>
                    <div className='my-1 flex gap-2'>
                      <Link
                        className='rounded-md bg-white px-3 py-1 text-sm shadow-custom-dark transition-colors duration-300 hover:bg-white-f9'
                        to={content.link}
                      >
                        바로가기
                      </Link>
                      <BtnMypage className='px-3 py-1 text-sm font-medium' onClick={openReportModal}>
                        보고서 업로드
                      </BtnMypage>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className='my-4 self-center'>아직 분석 가능한 사이트가 없습니다.</p>
          )}
        </section>
      </div>
      {isOpen && <AnalystReportModal isOpen={isOpen} onOpen={setIsOpen} />}
    </div>
  );
};

export default MyPageAnalystAnalyze;
