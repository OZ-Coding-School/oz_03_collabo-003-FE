import { useEffect, useState } from 'react';
import contentsData from '../../data/contents.json';
import analysisContentsData from '../../data/analysisContents.json';
import { AnalysisContent, Content } from '../../types/type';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../common/Pagination';
import WhiteBtn from '../common/button/WhiteBtn';
import BtnMypage from '../common/button/BtnMypage';
//import axios from 'axios';

const MypageAnalystApply = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState<Content[]>([]);
  const [appliedContents, setAppliedContents] = useState<AnalysisContent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 6;
  const indexOfLastContent = currentPage * cardsPerPage;
  const indexOfFirstContent = indexOfLastContent - cardsPerPage;
  const currentContents = contents.slice(indexOfFirstContent, indexOfLastContent);
  const totalPages = Math.ceil(contents.length / cardsPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  //const baseUrl = import.meta.env.VITE_API_URL;

  // 의뢰 목록 불러오기
  const fetchAnalysisRequestData = async () => {
    const requestContents = contentsData.filter((content) => content.is_analyzed === true);
    setContents(requestContents);
    setAppliedContents(analysisContentsData);
    // try {
    //   const response = await axios.get(`${baseUrl}/request`, {
    //     withCredentials: true,
    //   });
    //   console.log(response);
    //   setContents(response.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // 분석가가 분석 신청하기
  const applyAnalysisContent = async (id: number) => {
    console.log(id);
    // try {
    //   const response = await axios.post(`${baseUrl}/request/accept/${id}`, {
    //     'Content-Type': 'application/json',
    //     withCredentials: true,
    //   });
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // 사이트 분석 신청하기 버튼 클릭시
  const applyBtnHandler = (id: number) => {
    const result = confirm(
      `해당 사이트에 대한 분석을 신청하시겠습니까? 사이트 의뢰자가 수락 시 '분석 진행하기' 에서 확인하실 수 있습니다.`
    );
    if (result) {
      applyAnalysisContent(id);
    } else {
      return;
    }
  };

  // 사이트 상세보기 버튼 클릭시
  const detailBtnHandler = (id: number) => {
    navigate(`/contents/${id}`);
  };

  useEffect(() => {
    fetchAnalysisRequestData();
  }, []);

  return (
    <div className='h-[calc(100vh-70px)] w-full overflow-auto'>
      {contents.length > 0 ? (
        <div className='mx-auto my-16 flex w-[1100px] flex-col gap-4 px-4'>
          <div className='mx-1 flex w-full gap-1 text-lg'>
            <span className='text-gray-75'>전체</span>
            <span className='font-semibold text-blue-accent'>{contents.length}</span>
          </div>
          <section className='grid grid-cols-2 grid-rows-3 gap-6'>
            {currentContents.map((content) => (
              <div className='flex min-w-[500px] gap-2 rounded-md bg-white p-4 hover:scale-105' key={content.id}>
                <img
                  className='h-[150px] w-[150px] self-center rounded-sm object-cover'
                  src={content.thumbnail}
                  alt={content.title}
                />
                <div className='flex min-w-[330px] grow flex-col gap-1'>
                  <span className='truncate text-lg font-semibold'>{content.title}</span>
                  <span className='truncate text-justify'>{content.site_description}</span>
                  <Link className='truncate hover:text-blue-primary hover:underline' to={content.site_url}>
                    {content.site_url}
                  </Link>
                  <span className='text-sm text-gray-75'>{`카테고리: ${content.main_category}`}</span>
                  <div className='flex items-center gap-2'>
                    <WhiteBtn
                      className='my-1 flex flex-col items-center text-sm'
                      onClick={() => detailBtnHandler(content.id)}
                    >
                      <span>상세보기</span>
                    </WhiteBtn>
                    {appliedContents.some((appliedContent) => appliedContent.contentId === content.id) ? (
                      <button
                        className='rounded-[5px] bg-blue-hover px-2 py-1 text-center text-sm font-medium text-white shadow-custom-dark'
                        disabled={true}
                      >
                        신청완료
                      </button>
                    ) : (
                      <BtnMypage
                        className='px-2 py-1 text-center text-sm font-medium'
                        onClick={() => applyBtnHandler(content.id)}
                      >
                        신청하기
                      </BtnMypage>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>
          {contents.length > 0 && <Pagination totalPages={totalPages} paginate={paginate} currentPage={currentPage} />}
        </div>
      ) : (
        <p className='mx-auto my-16 flex justify-center'>현재 의뢰자가 분석을 희망하는 사이트가 없습니다.</p>
      )}
    </div>
  );
};

export default MypageAnalystApply;
