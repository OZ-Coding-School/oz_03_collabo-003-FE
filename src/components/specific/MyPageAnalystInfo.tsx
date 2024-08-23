// import React from 'react';
import userData from '../../data/analystProfile.json';

const MyPageAnalystInfo = () => {
  const grayRounded = 'rounded-lg border border-gray-dc bg-white px-6 py-4';
  const subTitle = 'font-semibold mr-5';

  return (
    <div className='container h-[calc(100vh-70px)] w-full overflow-auto'>
      <div className='mx-auto my-24 flex min-h-[480px] w-[700px] flex-col p-6'>
        <div className='mb-10 flex items-center justify-between border-b-2 p-1'>
          <p className='text-xl'>
            환영합니다, <span className='font-bold'>{userData.name}</span>님
          </p>
          <p className='text-lg'>
            권한: <span className='font-bold'>분석가</span>
          </p>
        </div>
        <div className={`${grayRounded}`}>
          <h2 className='mb-4 text-xl font-bold'>분석가 정보</h2>
          <div className='space-y-4'>
            <div className='flex'>
              <p className='my-auto font-semibold'>사진</p>
              <img src={userData.image} alt='analyst-profile-img' className='m-auto size-20' />
            </div>
            <div>
              <p className={`mb-2 ${subTitle}`}>소개</p>
              <span>{userData.intro}</span>
            </div>
            <div>
              <p className={`mb-2 ${subTitle}`}>장점</p>
              <span>{userData.merit}</span>
            </div>
            <div>
              <p className={subTitle}>전하고 싶은 한 마디</p>
              <span>{userData.oneWord}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageAnalystInfo;
