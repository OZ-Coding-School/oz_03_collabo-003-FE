//import axios from "axios";
import { useEffect, useState } from 'react';
import contentsData from '../../data/contents.json';
import { Content } from '../../types/type';
import { Link } from 'react-router-dom';
import BtnMypage from '../common/button/BtnMypage';
import Pagination from '../common/Pagination';

const MypageAnalystRequest = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const indexOfLastContent = currentPage * cardsPerPage;
  const indexOfFirstContent = indexOfLastContent - cardsPerPage;
  const currentContents = contents.slice(indexOfFirstContent, indexOfLastContent);

  const totalPages = Math.ceil(contents.length / cardsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // const fetchUnanalyzedData = async () => {
  //     try {
  //         const response = await axios.get("/api/v1/contents/unanalyzed");
  //         console.log(response);
  //         setContents(response.data);
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }

  const applyBtnHandler = () => {
    // 홈페이지 선택 (POST /api/v1/analysts/sites/{siteId}/select)
  };

  const detailBtnHandler = () => {
    // 사이트 상세페이지로 이동
  };

  //   const descriptionTruncate = (str: string, num: number) => {
  //     return str.length > num ? str.substring(0, num) + '...' : str;
  //   };

  useEffect(() => {
    setContents(contentsData);
  }, []);

  return (
    <div className='h-[calc(100vh-70px)] w-full overflow-auto'>
      <div className='mx-auto my-16 flex w-[1100px] flex-col gap-4'>
        <div className='mx-1 flex w-full gap-1 text-lg'>
          <span className='text-gray-75'>전체</span>
          <span className='font-semibold text-blue-accent'>{contents.length}</span>
        </div>
        <section className='grid grid-cols-2 grid-rows-3 gap-6'>
          {currentContents.map((content) => (
            <div className='flex min-w-[500px] gap-2 rounded-md bg-white p-4 hover:scale-105'>
              <img
                className='h-[150px] w-[150px] self-center rounded-sm object-cover'
                src={content.image}
                alt={content.title}
              />
              <div className='flex min-w-[350px] grow flex-col gap-1'>
                <span className='truncate text-lg font-semibold'>{content.title}</span>
                <span className='truncate text-justify'>{content.description}</span>
                <Link className='truncate hover:text-blue-primary hover:underline' to={content.link}>
                  {content.link}
                </Link>
                <span className='text-sm text-gray-75'>{`카테고리: ${content.category}`}</span>
                <div className='flex items-center gap-2'>
                  <button
                    className='my-1 flex flex-col items-center rounded-[5px] bg-white px-2 py-1 text-sm shadow-custom-light transition-colors duration-300 hover:bg-white-f9'
                    onClick={detailBtnHandler}
                  >
                    <span>상세보기</span>
                  </button>
                  <BtnMypage className='my-1 flex flex-col items-center px-2 py-1 text-sm' onClick={applyBtnHandler}>
                    <span className='font-medium'>신청하기</span>
                  </BtnMypage>
                </div>
              </div>
            </div>
          ))}
        </section>
        {contents.length > 0 && <Pagination totalPages={totalPages} paginate={paginate} currentPage={currentPage} />}
      </div>
    </div>
  );
};

export default MypageAnalystRequest;
