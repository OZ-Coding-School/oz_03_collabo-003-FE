// import React from 'react';
import BtnHeart from '../components/common/button/BtnHeart';
import BtnMypage from '../components/common/button/BtnMypage';
import detailedInfo from '../data/detailedInfo.json';

const DetailedPage = () => {
  // const handleLikeClick = () => {};
  const handleJoinClick = () => {};

  return (
    <div className='detail-container'>
      <div className='img-box h-[60vh] bg-gray-c4'>
        <img src='../images/site-sample-img.png' className='m-auto h-full'></img>
      </div>
      <div className='site-title-box'>
        <div>
          <h2 className=''>{detailedInfo.title}</h2>
          {/* <BtnMypage onClick={handleLikeClick}>ㅇ</BtnMypage> */}
          <BtnMypage onClick={handleJoinClick}>Join</BtnMypage>
          <BtnHeart />
        </div>
        <p></p>
      </div>
      <div className='side-bar'></div>
      <div className='detail-box'>
        <div className='detail'></div>
        <div className='QnA'></div>
        <div className='review'></div>
      </div>
    </div>
  );
};

export default DetailedPage;
