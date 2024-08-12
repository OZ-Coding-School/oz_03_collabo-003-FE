const Footer = () => {
  return (
    <div className='border-gray h-[385px] w-full bg-white px-[100px] pb-[60px] pt-[45px]'>
      <div className='border-gray-75 flex items-start justify-between border-b'>
        <div>
          <p className='mt-[16px] text-[32px]'>ALL THE</p>
          <p className='my-[20px] w-[292px]'>
            Our vision is to provide convenience and help increase your sales business.
          </p>
          <div className='flex'>
            <span className='mr-[10px] flex h-[33px] w-[33px] items-center justify-center rounded-[50%] bg-white shadow-custom-light'>
              <img src='/public/images/facebook.png' alt='FaceBook' className='h-[15px] w-[9px]' />
            </span>
            <span className='mr-[10px] flex h-[33px] w-[33px] items-center justify-center rounded-[50%] bg-white shadow-custom-light'>
              <img src='/public/images/x.png' alt='X' className='h-[15px] w-[15px]' />
            </span>
            <span className='mr-[10px] flex h-[33px] w-[33px] items-center justify-center rounded-[50%] bg-white shadow-custom-light'>
              <img src='/public/images/instagram.png' alt='Instagram' className='h-[15px] w-[15px]' />
            </span>
          </div>
        </div>
        <div className='flex h-[100%]'>
          <div className='ml-[45px] h-[244px] w-[150px] text-center'>
            <div className='mb-[33px] text-[20px] font-semibold'>About</div>
            <div>
              <p className='mb-[18px]'>How it works</p>
              <p className='mb-[18px]'>Featured</p>
              <p className='mb-[18px]'>Partnership</p>
              <p>Business Relation</p>
            </div>
          </div>
          <div className='ml-[45px] h-[244px] w-[150px] text-center'>
            <div className='mb-[33px] text-[20px] font-semibold'>Community</div>
            <div>
              <p className='mb-[18px]'>Events</p>
              <p className='mb-[18px]'>Blog</p>
              <p className='mb-[18px]'>Podcast</p>
              <p>Invite a friend</p>
            </div>
          </div>
          <div className='ml-[45px] h-[244px] w-[150px] text-center'>
            <div className='mb-[33px] text-[20px] font-semibold'>Socials</div>
            <div>
              <p className='mb-[18px]'>Discord </p>
              <p className='mb-[18px]'>Instagram</p>
              <p className='mb-[18px]'>Twitter</p>
              <p>Facebook</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-between pt-[36px]'>
        <span>©2024 Auto Fast. All rights reserved</span>
        <span>
          <span>Privacy & Policy</span>
          <span className='ml-[60px]'>Terms & Condition</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
