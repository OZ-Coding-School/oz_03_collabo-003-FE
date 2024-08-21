import { useEffect, useState } from 'react';
import analysisContents from '../../data/analysisContents.json';
import Pagination from '../common/Pagination';
import WhiteBtn from '../common/button/WhiteBtn';
import BtnMypage from '../common/button/BtnMypage';
import dayjs from 'dayjs';

type Analyst = {
  analystId: number;
  analystName: string;
};

type AnalysisContent = {
  contentId: number;
  clientId: number;
  accepted: Analyst[];
  selected: Analyst[];
  title: string;
  link: string;
  image: string;
  created_at: string;
  scheduled_at: string;
};

const MyPageOwnerAnalysisRequest = () => {
  const [contents, setContents] = useState<AnalysisContent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 1;

  const indexOfLastContent = currentPage * cardsPerPage;
  const indexOfFirstContent = indexOfLastContent - cardsPerPage;
  const currentContents = contents.slice(indexOfFirstContent, indexOfLastContent);

  const totalPages = Math.ceil(contents.length / cardsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // const fetchAnalysisRequestContentsData = () => {
  // 분석 의뢰를 요청했던 사이트 리스트 불러오기
  // }

  const analystProfileHandler = (analystId: number) => {
    // 분석가 프로필 열람
    console.log('분석가 프로필 열람', analystId);
  };

  const selectedAnalyst = (analystId: number) => {
    // 분석가 선택
    console.log('분석가 선택', analystId);
  };

  useEffect(() => {
    setContents(analysisContents);
  }, []);

  return (
    <div className='h-[calc(100vh-70px)] w-full overflow-auto'>
      {contents.length > 0 ? (
        <div className='mx-auto my-10 flex w-[680px] flex-col gap-2 px-4'>
          <div className='flex items-end gap-2'>
            <span className='mb-0.5 text-lg'>의뢰 사이트</span>
            <Pagination totalPages={totalPages} paginate={paginate} currentPage={currentPage} />
          </div>
          {currentContents.map((content) => (
            <section className='flex w-full flex-col gap-8 rounded-md' key={content.contentId}>
              <div className='flex gap-3 bg-white p-4 shadow-custom-light'>
                <img className='h-[75px] w-[120px]' src={content.image} alt={content.title} />
                <div className='flex flex-col gap-0.5'>
                  <span className='text-lg text-gray-46'>{content.title}</span>
                  {/* <span className='text-gray-4'>{content.link}</span> */}
                  <span className='text-sm text-gray-75'>
                    신청일자: {dayjs(content.created_at).format('YYYY-MM-DD')}
                  </span>
                  <span className='text-sm text-gray-75'>
                    예정시간: {dayjs(content.scheduled_at).format('YYYY-MM-DD')}
                  </span>
                </div>
              </div>
              <div className='flex w-full flex-col gap-3'>
                <p className='text-lg'>분석 신청자 목록</p>
                {content.accepted.length > 0 ? (
                  <ul className='flex flex-col gap-3'>
                    {content.accepted.map((acceptedAnalyst) => (
                      <li
                        className='flex min-w-[480px] gap-2 rounded-md bg-white p-4 shadow-custom-light hover:scale-105'
                        key={acceptedAnalyst.analystId}
                      >
                        <span className='grow'>{acceptedAnalyst.analystName}</span>
                        <WhiteBtn
                          className='px-2 py-1 text-sm'
                          onClick={() => analystProfileHandler(acceptedAnalyst.analystId)}
                        >
                          프로필 보기
                        </WhiteBtn>
                        <BtnMypage
                          className='px-2 py-1 text-sm font-medium'
                          onClick={() => selectedAnalyst(acceptedAnalyst.analystId)}
                        >
                          승락하기
                        </BtnMypage>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='my-4 self-center'>아직 분석을 신청한 분석가가 없습니다.</p>
                )}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className='mx-auto my-24 flex min-w-[470px] flex-col items-center px-4'>
          <span className='text-gray-46'>내 사이트에 대한 분석을 의뢰해 보세요.</span>
          <div className='flex gap-1'>
            <span className='font-semibold text-gray-46'>{`'사이트 관리 → 사이트 상세보기 → 사이트 분석 의뢰하기'`}</span>
            <span className='text-gray-46'>클릭</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPageOwnerAnalysisRequest;
