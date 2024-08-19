const AnalyzePayMain = () => {
  return (
    <div className='flex h-full flex-col items-center'>
      <h1 className='my-[64px] text-center text-[27px]'>사이트분석 및 등록을 의뢰하세요</h1>
      <div className='flex items-center justify-center gap-8'>
        <BasicInfoSection />
        <DiscountSection />
      </div>
    </div>
  );
};

// 기본 정보
const BasicInfoSection = () => {
  return (
    <div className='h-[495px] w-[964px] rounded-[15px] bg-white px-[30px] py-[31px] shadow-custom-light'>
      <h2 className='mb-[20px] text-[20px] font-bold'>기본 정보</h2>
      <div>
        <div className='mb-[25px]'>
          <p className='mb-[7px] font-semibold'>페이지 타이틀</p>
          <div className='flex h-[50px] w-full items-center justify-start rounded-[5px] border border-gray-c4 px-[10px]'>
            <p className='text-gray-75'>네이버</p>
          </div>
        </div>
        <div className='mb-[25px]'>
          <p className='mb-[7px] font-semibold'>페이지 링크</p>
          <div className='flex h-[50px] w-full items-center justify-start rounded-[5px] border border-gray-c4 px-[10px]'>
            <p className='text-gray-75'>http://www.naver.com</p>
          </div>
        </div>
        <div className='mb-[25px]'>
          <p className='mb-[7px] font-semibold'>한줄 요약포인트</p>
          <div className='flex h-[50px] w-full items-center justify-start rounded-[5px] border border-gray-c4 px-[10px]'>
            <p className='text-gray-75'>검색엔진 포털 사이트</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 할인 수단
const DiscountSection = () => {
  return (
    <div className='h-[495px] w-[366px] rounded-[15px] bg-white px-[30px] py-[31px] shadow-custom-light'>
      <h2 className='mb-[20px] text-[20px] font-bold'>할인 수단</h2>
      <div className='flex h-[calc(100%-40px)] flex-col justify-between'>
        <div>
          <div className='mb-[25px]'>
            <div className='mb-1 flex justify-between px-1'>
              <p className='font-semibold'>쿠폰</p>
              <div className='flex'>
                <p>사용가능</p>
                <p className='ml-1 font-bold text-blue-primary'>0</p>
              </div>
            </div>
            <div className='flex'>
              <div className='flex h-[44px] w-[199px] items-center justify-end rounded-[5px] border border-gray-c4 px-[10px]'>
                <p className='text-gray-db'>0</p>
              </div>
              <button
                type='button'
                className={`ml-[11px] h-[44px] w-[94px] rounded-[5px] border border-gray-db bg-white px-[10px] text-[16px] shadow-custom-light transition-colors duration-300 hover:bg-white-f9`}
              >
                쿠폰선택
              </button>
            </div>
          </div>
          <div className='mb-[25px]'>
            <div className='mb-1 flex justify-between px-1'>
              <p className='font-semibold'>포인트</p>
              <div className='flex'>
                <p>보유</p>
                <p className='ml-1 font-bold text-blue-primary'>0</p>
              </div>
            </div>
            <div className='flex'>
              <div className='flex h-[44px] w-[199px] items-center justify-end rounded-[5px] border border-gray-c4 px-[10px]'>
                <p className='text-gray-db'>0</p>
              </div>
              <button
                type='button'
                className={`ml-[11px] h-[44px] w-[94px] rounded-[5px] border border-gray-db bg-white px-[10px] text-[16px] shadow-custom-light transition-colors duration-300 hover:bg-white-f9`}
              >
                전액사용
              </button>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className='mb-[3px] flex justify-between'>
              <p className='text-red'>할인금액</p>
              <p className='text-red'>0원</p>
            </div>
            <div className='mb-[8px] flex justify-between'>
              <p className='text-[18px] font-semibold'>총 결제금액</p>
              <p className='text-[18px] font-semibold'>0원</p>
            </div>
          </div>
          <button className='h-[46px] w-full rounded-[10px] bg-blue-primary text-[16px] font-bold text-white duration-300 hover:bg-blue-hover'>
            결제하기
          </button>
          <p className='mt-[8px] text-[12px] text-gray-75'>
            사용자 본인은 주문내용을 확인했으며,
            <br /> 구매조건 및 개인정보처리방침과 결제에 동의합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyzePayMain;
