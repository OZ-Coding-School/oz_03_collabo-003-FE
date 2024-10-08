import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import axios, { AxiosError } from 'axios';
import { Content } from '../types/type';
import contentData from '../data/content.json';
import MypageOwnerItemDetail from '../components/specific/MypageOwnerItemDetail';

const OwnerSiteDetailPage = () => {
  const { id } = useParams<string>();
  const [content, setContent] = useState<Content | null>(null);
  const contentId = Number(id);

  //const baseUrl = import.meta.env.VITE_API_URL;

  // 사이트 상세정보 조회
  const fetchContentData = async () => {
    setContent(contentData);
    // try {
    //   const response = await axios.get(`${baseUrl}/contents/${contentId}`, {
    //     withCredentials: true,
    //   });
    //   console.log('콘텐츠 정보 조회 성공', response);
    //   setContent(response.data);
    // } catch (error) {
    //   if (error instanceof AxiosError && error.response) {
    //     switch (error.response.status) {
    //       case 500:
    //         return console.error('server error', error);
    //       case 400:
    //         return console.error('bad request', error);
    //       default:
    //         return console.error(error);
    //     }
    //   } else {
    //     console.error(error);
    //     alert('일시적인 문제가 발생했습니다. 서비스 이용에 불편을 드려 죄송합니다.');
    //   }
    // }
  };

  useEffect(() => {
    fetchContentData();
  }, []);

  return contentId && content ? (
    <MypageOwnerItemDetail contentId={contentId} content={content} />
  ) : (
    <h2>서비스 처리 중 입니다...</h2>
  );
};

export default OwnerSiteDetailPage;
