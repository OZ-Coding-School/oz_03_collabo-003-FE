import React, { useState } from 'react';
import BtnMypage from '../common/button/BtnMypage';
import { Content } from '../../types/type';
import { useNavigate } from 'react-router-dom';
import { useAnalysisRequestSite } from '../../store/store';
import WhiteBtn from '../common/button/WhiteBtn';
//import axios, { AxiosError } from 'axios';

interface MypageOwnerItemDetailProps {
  contentId: number;
  content: Content;
}

const MypageOwnerItemDetail: React.FC<MypageOwnerItemDetailProps> = ({ contentId, content }) => {
  const [titleEditing, setTitleEditing] = useState<boolean>(false);
  const [descriptionEditing, setDescriptionEditing] = useState<boolean>(false);
  const [linkEditing, setLinkEditing] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>(content.title);
  const [descriptionValue, setDescriptionValue] = useState<string>(content.site_description);
  const [linkValue, setLinkValue] = useState<string>(content.site_url);
  const navigate = useNavigate();
  const setContent = useAnalysisRequestSite((state) => state.setContent);

  //const baseUrl = import.meta.env.VITE_API_URL;

  // 사이트 삭제하기
  const deletedContent = async () => {
    console.log(contentId);
    navigate('/mypage/owner');
    // try {
    //   const response = await axios.delete(`${baseUrl}/contents/delete-content/${contentId}`, {
    //     withCredentials: true,
    //   });
    //   console.log(response);
    // } catch (error) {
    //   console.error(error);
    //   if (error instanceof AxiosError && error.response) {
    //     switch (error.response.status) {
    //       case 403:
    //         return console.error('Forbidden', error);
    //       case 404:
    //         return console.error('Content Not Found', error);
    //       default:
    //         return console.error(error);
    //     }
    //   } else {
    //     console.error(error);
    //   }
    // }
  };

  const moveToDetailPage = () => {
    const result = confirm('Q&A 답변을 위한 사이트 상세페이지로 이동합니다.');
    if (result) {
      navigate(`/contents/${contentId}`);
    } else {
      return;
    }
  };

  const deleteContentHandler = () => {
    const result = confirm('해당 사이트를 삭제하시겠습니까?');
    if (result) {
      deletedContent();
    } else {
      return;
    }
  };

  const returnToList = () => {
    navigate('/mypage/owner');
  };

  const analysisRequestMySite = () => {
    const result = confirm('해당 사이트에 대한 분석을 의뢰하시겠습니까? 확인을 누르시면 결제 페이지로 이동합니다.');
    if (result) {
      setContent(contentId);
      navigate('/analyze');
    } else {
      return;
    }
  };

  const titleHandler = () => {
    setTitleEditing(false);
    setTitleValue(titleValue);
  };

  const descriptionHandler = () => {
    setDescriptionEditing(false);
    setDescriptionValue(descriptionValue);
  };

  const linkHandler = () => {
    setLinkEditing(false);
    setLinkValue(linkValue);
  };

  return (
    <div className='h-[calc(100vh-70px)] w-full overflow-auto'>
      <section className='mx-auto my-10 flex w-[810px] flex-col items-center gap-10'>
        <div className='flex w-full items-center justify-between'>
          <WhiteBtn className='min-h-[38px] w-[170px] text-sm font-semibold text-gray-46' onClick={returnToList}>
            &lt;&lt; 목록으로 돌아가기
          </WhiteBtn>
          <BtnMypage className='min-h-[38px] w-[170px] text-sm font-semibold' onClick={analysisRequestMySite}>
            사이트 분석 의뢰하기
          </BtnMypage>
        </div>
        <div className='flex w-[400px] flex-col'>
          <img className='h-[300px] w-full rounded-sm' src={content.thumbnail} alt={content.title} />
          <div className='flex justify-between p-1'>
            <div className='flex gap-2'>
              <span className='font-semibold'>조회</span>
              <span className='text-gray-46'>{content.viewer} 회</span>
            </div>
            <div className='flex gap-2'>
              <span className='font-semibold'>찜</span>
              <span className='text-gray-46'>{content.like_count} 명</span>
            </div>
          </div>
        </div>
        <form className='flex w-full flex-col gap-6'>
          <div className='flex flex-col gap-1'>
            <label className='font-semibold'>사이트 이름</label>
            {titleEditing ? (
              <div className='flex w-full items-end border-b border-b-blue-primary p-1'>
                <input
                  className='grow bg-white-f9 text-gray-46'
                  type='text'
                  value={titleValue}
                  onChange={(e) => setTitleValue(e.target.value)}
                />
                <BtnMypage className='px-2 py-1 text-sm font-semibold' onClick={titleHandler}>
                  수정완료
                </BtnMypage>
              </div>
            ) : (
              <div className='flex w-full items-end border-b border-b-gray-75 p-1'>
                <p className='grow text-gray-46'>{titleValue}</p>
                <BtnMypage className='px-2 py-1 text-sm font-semibold' onClick={() => setTitleEditing(true)}>
                  변경
                </BtnMypage>
              </div>
            )}
          </div>
          <div className='flex flex-col gap-1'>
            <label className='font-semibold'>사이트 한 줄 요약</label>
            {descriptionEditing ? (
              <div className='flex w-full items-end border-b border-b-blue-primary p-1'>
                <input
                  className='grow bg-white-f9 text-gray-46'
                  type='text'
                  value={descriptionValue}
                  onChange={(e) => setDescriptionValue(e.target.value)}
                />
                <BtnMypage className='px-2 py-1 text-sm font-semibold' onClick={descriptionHandler}>
                  수정완료
                </BtnMypage>
              </div>
            ) : (
              <div className='flex w-full items-end border-b border-b-gray-75 p-1'>
                <p className='grow text-gray-46'>{descriptionValue}</p>
                <BtnMypage className='px-2 py-1 text-sm font-semibold' onClick={() => setDescriptionEditing(true)}>
                  변경
                </BtnMypage>
              </div>
            )}
          </div>
          <div className='flex flex-col gap-1'>
            <label className='font-semibold'>사이트 링크</label>
            {linkEditing ? (
              <div className='flex w-full items-end border-b border-b-blue-primary p-1'>
                <input
                  className='grow bg-white-f9 text-gray-46'
                  type='text'
                  value={linkValue}
                  onChange={(e) => setLinkValue(e.target.value)}
                />
                <BtnMypage className='px-2 py-1 text-sm font-semibold' onClick={linkHandler}>
                  수정완료
                </BtnMypage>
              </div>
            ) : (
              <div className='flex w-full items-end border-b border-b-gray-75 p-1'>
                <p className='grow text-gray-46'>{linkValue}</p>
                <BtnMypage className='px-2 py-1 text-sm font-semibold' onClick={() => setLinkEditing(true)}>
                  변경
                </BtnMypage>
              </div>
            )}
          </div>
        </form>
        <div className='flex w-full flex-col justify-center gap-4'>
          <div className='flex items-center justify-between'>
            <span className='font-semibold'>Q&A</span>
            <BtnMypage className='px-2 py-1 text-sm font-semibold' onClick={moveToDetailPage}>
              답변하러 가기
            </BtnMypage>
          </div>
          <div className='min-h-[140px] w-full rounded-xl bg-white p-4 text-gray-46 shadow-custom-down'>
            {content.qna?.content ? content.qna.content : '아직 등록된 내용이 없습니다.'}
          </div>
        </div>
        <div className='flex w-full flex-col justify-center gap-4'>
          <span className='font-semibold'>후기</span>
          <div className='min-h-[140px] w-full rounded-xl bg-white p-4 text-gray-46 shadow-custom-down'>
            {content.review?.comment ? content.review.comment : '아직 등록된 내용이 없습니다.'}
          </div>
        </div>
        <button className='mx-4 self-end font-semibold text-gray-75 hover:text-gray-46' onClick={deleteContentHandler}>
          사이트 삭제하기
        </button>
      </section>
    </div>
  );
};

export default MypageOwnerItemDetail;
