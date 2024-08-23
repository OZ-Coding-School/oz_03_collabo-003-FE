import { useEffect, useState } from 'react';
import analysisContents from '../../data/analysisContents.json';
import Pagination from '../common/Pagination';
import WhiteBtn from '../common/button/WhiteBtn';
import DisabledBtn from '../common/button/DisabledBtn';
import dayjs from 'dayjs';
import BtnMypage from '../common/button/BtnMypage';
import axios from 'axios';
//import axios from 'axios';

type Analyst = {
  analystId: number;
  analystName: string;
};

type AnalysisContent = {
  contentId: number;
  clientId: number;
  accepted: Analyst[];
  selected: Analyst | null;
  status: string;
  title: string;
  link: string;
  image: string;
  created_at: string;
  scheduled_at: string;
};

const MyPageOwnerAnalysisRequest = () => {
  const [contents, setContents] = useState<AnalysisContent[]>([]);
  const [selectedAnalyst, setSelectedAnalyst] = useState<boolean>(false);
  const [reportUrl, setReportUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 1;

  const indexOfLastContent = currentPage * cardsPerPage;
  const indexOfFirstContent = indexOfLastContent - cardsPerPage;
  const currentContents = contents.slice(indexOfFirstContent, indexOfLastContent);
  const totalPages = Math.ceil(contents.length / cardsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 분석 의뢰를 요청했던 사이트 리스트 불러오기
  // const fetchAnalysisRequestData = async () => {
  // try {
  //       const response = await axios.get('/request')
  //       console.log('분석 의뢰를 요청한 목록 조회 성공', response.data);
  //       setContents(response.data);
  //     } catch (error) {
  //       console.log("분석 의뢰를 요청한 목록 조회 실패",error);
  //     }
  // }

  const analystProfileHandler = (analystId: number) => {
    console.log('분석가 프로필 열람', analystId);
    // 분석가 프로필 열람
  };

  const selectedAnalystHandler = async (analystId: number) => {
    console.log('분석가 선택', analystId);
    const result = confirm(
      '사이트 분석은 단 한 명의 분석가만 진행할 수 있습니다. 이 분석가를 선택하여 분석을 진행하시겠습니까?'
    );
    if (result) {
      setSelectedAnalyst(true);
    }
    // const result = confirm(
    //   '사이트 분석은 단 한 명의 분석가만 진행할 수 있습니다. 이 분석가를 선택하여 분석을 진행하시겠습니까?'
    // );
    // if (result) {
    //   try {
    //     const response = await axios.post('/request/select', {
    //       analyst_id: analystId,
    //     });
    //     console.log(response.data);
    //     setSelectedAnalyst(true)
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else {
    //   return;
    // }
  };

  // 분석 보고서 조회
  const fetchReportData = async () => {
    try {
      const response = await axios.get('/analysts/reports');
      console.log(response.data);
      setReportUrl(response.data.reportUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadReport = async () => {
    try {
      await fetchReportData();
      const link = document.createElement('a');
      link.href = reportUrl;
      link.setAttribute('download', reportUrl);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('보고서 다운로드 실패', error);
      alert('보고서 다운로드 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    setContents(analysisContents);
  }, []);

  return (
    <div className='h-[calc(100vh-70px)] w-full overflow-auto'>
      {contents.length > 0 ? (
        <div className='mx-auto my-20 flex w-[680px] flex-col gap-3 px-4'>
          <div className='flex items-end gap-2'>
            <span className='mb-0.5 text-lg'>분석 의뢰 사이트</span>
            <Pagination totalPages={totalPages} paginate={paginate} currentPage={currentPage} />
          </div>
          {currentContents.map((content) => (
            <section className='flex w-full flex-col gap-8 rounded-md' key={content.contentId}>
              <div className='flex gap-3 rounded-md bg-white p-4 shadow-custom-light'>
                <img className='h-[75px] w-[120px]' src={content.image} alt={content.title} />
                <div className='flex flex-col gap-0.5'>
                  <span className='text-lg text-gray-46'>{content.title}</span>
                  <span className='text-sm text-gray-75'>
                    신청일자: {dayjs(content.created_at).format('YYYY-MM-DD')}
                  </span>
                  <span className='text-sm text-gray-75'>
                    예정시간: {dayjs(content.scheduled_at).format('YYYY-MM-DD')}
                  </span>
                </div>
              </div>
              <div className='flex w-full flex-col gap-4'>
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
                        {content.selected ? (
                          <button
                            disabled={true}
                            className='rounded-[5px] bg-blue-hover px-2 py-1 text-center text-sm font-medium text-white shadow-custom-dark'
                          >
                            수락종료
                          </button>
                        ) : (
                          <DisabledBtn
                            className={'px-2 py-1 text-center text-sm font-medium'}
                            onClick={() => selectedAnalystHandler(acceptedAnalyst.analystId)}
                            disabled={selectedAnalyst}
                          >
                            {selectedAnalyst ? '수락종료' : '수락하기'}
                          </DisabledBtn>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='my-3 self-center text-gray-75'>분석을 신청한 분석가가 없습니다.</p>
                )}
              </div>
              <div className='flex w-full flex-col gap-4'>
                <p className='text-lg'>분석 결과 확인</p>
                {content.status === 'Completed' ? (
                  <div className='flex items-center justify-between gap-2 rounded-md bg-white p-4 shadow-custom-light'>
                    <span className='grow'>{`분석가 ${content.selected?.analystName} 님의 분석 보고서`}</span>
                    <BtnMypage
                      className='max-h-[28px] min-w-[70px] px-2 py-1 text-sm font-medium'
                      onClick={() => downloadReport()}
                    >
                      다운로드
                    </BtnMypage>
                  </div>
                ) : (
                  <p className='my-3 self-center text-gray-75'>제출된 분석 보고서가 없습니다.</p>
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
