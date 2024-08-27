import MainPopularCard from './MainPopularCard';
import contentsData from '../../data/contents.json';
import { Content } from '../../types/type';
import { useState, useEffect } from 'react';
import LoadingSkeleton from '../common/LoadingSkeleton';
//import axios from 'axios';

const MainPopularPlatform = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('업무');
  const [isLoading, setIsLoading] = useState(false);

  //전체 컨텐츠 조회
  const fetchContentsData = async () => {
    setContents(contentsData);
    setIsLoading(false);
    // if (isLoading) return;
    // setIsLoading(true);
    // try {
    //   const response = await axios.get('/api/v1/contents');
    //   console.log('메인 플랫폼 컨텐츠 데이터 성공', response.data);
    //   setContents(response.data);
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  useEffect(() => {
    const categories = ['업무', 'ai', '정보 플랫폼', '정부지원'];
    const currentIndex = categories.indexOf(selectedCategory);
    const nextIndex = (currentIndex + 1) % categories.length;

    const timer = setTimeout(() => {
      setSelectedCategory(categories[nextIndex]);
    }, 2500);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  useEffect(() => {
    fetchContentsData();
  }, []);

  const filteredContents = contents.filter((content) => content.category === selectedCategory);
  const sortedContents = filteredContents.sort((a, b) => b.id - a.id);
  const popularContents = sortedContents.slice(0, 8);

  const tabStyle =
    'flex h-[40px] w-[105px] sm:h-[60px] sm:w-[160px] md:h-[70px] md:w-[205px] lg:h-[80px] lg:w-[260px] xl:h-[90px] xl:w-[320px] 2xl:h-[100px] 2xl:w-[355px] cursor-pointer items-center justify-center border-b-2 font-semibold text-xs sm:text-sm md:text-base lg:text-[17px] 2xl:text-[18px]';
  const activeTabStyle = 'border-b-black text-black';
  const inactiveTabStyle = 'border-b-gray-db text-gray-db hover:border-b-black hover:text-black';

  return (
    <section className='container mx-auto my-24 flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-8'>
      <p className='text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'>
        인기 있는 플랫폼을 찾아보세요
      </p>
      <p className='text-[10px] text-gray-75 md:text-xs lg:text-sm xl:text-base'>
        도움되는 사이트만 한 눈에 모아 보세요
      </p>

      <div className='flex flex-col items-center justify-center gap-4 md:gap-6 xl:gap-8'>
        <div className='flex'>
          <button
            className={`${tabStyle} ${selectedCategory === '업무' ? activeTabStyle : inactiveTabStyle}`}
            onClick={() => setSelectedCategory('업무')}
          >
            업무
          </button>
          <button
            className={`${tabStyle} ${selectedCategory === 'ai' ? activeTabStyle : inactiveTabStyle}`}
            onClick={() => setSelectedCategory('ai')}
          >
            AI
          </button>
          <button
            className={`${tabStyle} ${selectedCategory === '정보 플랫폼' ? activeTabStyle : inactiveTabStyle}`}
            onClick={() => setSelectedCategory('정보 플랫폼')}
          >
            정보 플랫폼
          </button>
          <button
            className={`${tabStyle} ${selectedCategory === '정부지원' ? activeTabStyle : inactiveTabStyle}`}
            onClick={() => setSelectedCategory('정부지원')}
          >
            정부지원
          </button>
        </div>
        <div className='grid min-h-[200px] grid-cols-4 grid-rows-2 gap-2 sm:min-h-[245px] sm:gap-3 md:min-h-[305px] md:gap-4 lg:min-h-[378px] lg:gap-5 xl:min-h-[458px] xl:gap-6'>
          {isLoading &&
            Array.from({ length: 8 }).map((_, index) => (
              <LoadingSkeleton
                key={index}
                className='h-[80px] w-[95px] sm:h-[120px] sm:w-[150px] md:h-[140px] md:w-[195px] lg:h-[160px] lg:w-[245px] xl:h-[180px] xl:w-[300px] 2xl:h-[200px] 2xl:w-[335px]'
              />
            ))}
          {!isLoading &&
            contents.length > 0 &&
            popularContents.map((content) => <MainPopularCard key={content.id} {...content} />)}
        </div>
      </div>
    </section>
  );
};

export default MainPopularPlatform;
