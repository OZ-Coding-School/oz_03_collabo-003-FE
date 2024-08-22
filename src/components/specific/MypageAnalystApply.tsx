import { useEffect, useState } from 'react';
import contentsData from '../../data/contents.json';
import { Content } from '../../types/type';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../common/Pagination';
import axios from 'axios';
import WhiteBtn from '../common/button/WhiteBtn';
import DisabledBtn from '../common/button/DisabledBtn';

const MypageAnalystApply = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState<Content[]>([]);
  const [selectedContent, setSelectedContent] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 6;
  const indexOfLastContent = currentPage * cardsPerPage;
  const indexOfFirstContent = indexOfLastContent - cardsPerPage;
  const currentContents = contents.slice(indexOfFirstContent, indexOfLastContent);
  const totalPages = Math.ceil(contents.length / cardsPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // const fetchAnalysisRequestData = async () => {
  //     try {
  //         const response = await axios.get("/request");
  //         console.log(response);
  //         setContents(response.data);
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }

  const applyAnalysisContent = async (id: number) => {
    try {
      const response = await axios.post(`/request/accept/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const applyBtnHandler = (id: number) => {
    const result = confirm(
      `해당 사이트에 대한 분석을 신청하시겠습니까? 사이트 의뢰자가 수락 시 '분석 진행 현황' 에서 확인하실 수 있습니다.`
    );
    if (result) {
      applyAnalysisContent(id);
      setSelectedContent(true);
    } else {
      return;
    }
  };

  const detailBtnHandler = (id: number) => {
    navigate(`/contents/${id}`);
  };

  useEffect(() => {
    setContents(contentsData);
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
                  src={content.image}
                  alt={content.title}
                />
                <div className='flex min-w-[330px] grow flex-col gap-1'>
                  <span className='truncate text-lg font-semibold'>{content.title}</span>
                  <span className='truncate text-justify'>{content.description}</span>
                  <Link className='truncate hover:text-blue-primary hover:underline' to={content.link}>
                    {content.link}
                  </Link>
                  <span className='text-sm text-gray-75'>{`카테고리: ${content.category}`}</span>
                  <div className='flex items-center gap-2'>
                    <WhiteBtn
                      className='my-1 flex flex-col items-center text-sm'
                      onClick={() => detailBtnHandler(content.id)}
                    >
                      <span>상세보기</span>
                    </WhiteBtn>
                    <DisabledBtn
                      className={'px-2 py-1 text-center text-sm font-medium'}
                      onClick={() => applyBtnHandler(content.id)}
                      disabled={selectedContent}
                    >
                      {selectedContent ? '신청완료' : '신청하기'}
                    </DisabledBtn>
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
