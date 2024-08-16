import contentData from '../../data/content.json';

const MypageOwnerItemDetail = () => {
  const content = contentData;
  return (
    <section className='mx-auto flex h-full w-[800px] flex-col items-center'>
      <div className='flex h-[300px] w-[400px] flex-col'>
        <img className='' src={content.image} alt={content.title} />
        <div className='flex justify-between p-1'>
          <div className='flex gap-2'>
            <span className='font-semibold'>조회</span>
            <span className='text-gray-46'>{content.viewCount} 회</span>
          </div>
          <div className='flex gap-2'>
            <span className='font-semibold'>찜</span>
            <span className='text-gray-46'>{content.likeCount} 명</span>
          </div>
        </div>
      </div>
      <form className='flex w-full flex-col'>
        <div className='flex flex-col'>
          <label>사이트 이름</label>
          <p>{content.title}</p>
        </div>
        <div className='flex flex-col'>
          <label>사이트 한 줄 요약</label>
          <p>{content.description}</p>
        </div>
        <div className='flex flex-col'>
          <label>사이트 링크</label>
          <p>{content.link}</p>
        </div>
      </form>
    </section>
  );
};

export default MypageOwnerItemDetail;
