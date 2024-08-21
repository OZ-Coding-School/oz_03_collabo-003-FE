import MainPopularCard from './MainPopularCard';
import contentsData from '../../data/contents.json';
import { Content } from '../../types/type';
import { useState, useEffect } from 'react';

const MainPopularPlatform = () => {
  const contents: Content[] = contentsData;
  const [selectedCategory, setSelectedCategory] = useState('task');

  useEffect(() => {
    const categories = ['업무', 'ai', '정보 플랫폼', '정부지원'];
    const currentIndex = categories.indexOf(selectedCategory);
    const nextIndex = (currentIndex + 1) % categories.length;

    const timer = setTimeout(() => {
      setSelectedCategory(categories[nextIndex]);
    }, 2500);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

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
        <div className='grid grid-cols-4 grid-rows-2 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6'>
          {popularContents.length > 0 &&
            popularContents.map((content) => <MainPopularCard key={content.id} {...content} />)}
        </div>
      </div>
    </section>
  );
};

export default MainPopularPlatform;
