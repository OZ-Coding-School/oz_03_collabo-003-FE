const Footer = () => {
  return (
    <div className='h-[365px] w-full border-t border-gray-dc bg-white px-[30px] pt-[45px] lg:px-[130px]'>
      <div className='flex w-full items-start justify-between border-b border-gray-75'>
        <div className='mb-[20px] pl-[10px] lg:pl-0'>
          <p className='mt-[16px] text-[28px] lg:text-[32px]'>ALL THE</p>
          <p className='my-[20px] w-[292px] text-[14px] text-gray-75 lg:text-base'>
            Our vision is to provide convenience and help increase your sales business.
          </p>
          <div className='flex'>
            <span className='mr-[10px] flex h-[33px] w-[33px] items-center justify-center rounded-[50%] bg-white shadow-custom-light'>
              <img src='/images/facebook.png' alt='FaceBook' className='h-[15px] w-[9px]' />
            </span>
            <span className='mr-[10px] flex h-[33px] w-[33px] items-center justify-center rounded-[50%] bg-white shadow-custom-light'>
              <img src='/images/x.png' alt='X' className='h-[15px] w-[15px]' />
            </span>
            <span className='mr-[10px] flex h-[33px] w-[33px] items-center justify-center rounded-[50%] bg-white shadow-custom-light'>
              <img src='/images/instagram.png' alt='Instagram' className='h-[15px] w-[15px]' />
            </span>
          </div>
        </div>
        <div className='hidden h-[100%] xl:flex'>
          <div className='ml-[45px] h-[244px] w-[150px] text-center'>
            <div className='mb-[33px] text-[20px] font-semibold'>About</div>
            <div>
              <p className='mb-[18px] text-gray-75'>How it works</p>
              <p className='mb-[18px] text-gray-75'>Featured</p>
              <p className='mb-[18px] text-gray-75'>Partnership</p>
              <p className='text-gray-75'>Business Relation</p>
            </div>
          </div>
          <div className='ml-[45px] h-[244px] w-[150px] text-center'>
            <div className='mb-[33px] text-[20px] font-semibold'>Community</div>
            <div>
              <p className='mb-[18px] text-gray-75'>Events</p>
              <p className='mb-[18px] text-gray-75'>Blog</p>
              <p className='mb-[18px] text-gray-75'>Podcast</p>
              <p className='text-gray-75'>Invite a friend</p>
            </div>
          </div>
          <div className='ml-[45px] h-[244px] w-[150px] text-center'>
            <div className='mb-[33px] text-[20px] font-semibold'>Socials</div>
            <div>
              <p className='mb-[18px] text-gray-75'>Discord </p>
              <p className='mb-[18px] text-gray-75'>Instagram</p>
              <p className='mb-[18px] text-gray-75'>Twitter</p>
              <p className='text-gray-75'>Facebook</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-between pt-[23px] sm:flex-row'>
        <span className='text-[14px] sm:text-base'>©2024 Auto Fast. All rights reserved</span>
        <span className='flex flex-col justify-between sm:flex-row'>
          <span className='text-[14px] sm:text-base'>Privacy & Policy</span>
          <span className='text-[14px] sm:ml-[60px] sm:text-base'>Terms & Condition</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
