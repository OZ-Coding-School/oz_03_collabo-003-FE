import MyPageImgCard from '../components/specific/MyPageImgCard';

const MyPage = () => {
  return (
    <div className='grid grid-cols-3'>
      <MyPageImgCard
        id={1}
        title='야놀자'
        description='숙박 예약 사이트'
        image='/images/possible-4.png'
        link=''
        layout='user'
        rating={8.8}
        ratingParticipation={350}
        viewer={350}
        className='bg-white'
      />
    </div>
  );
};

export default MyPage;
