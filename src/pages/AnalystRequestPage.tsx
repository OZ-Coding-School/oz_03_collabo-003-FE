import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface AnalystRequestData {
  requirements: string;
}

const AnalystRequestPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AnalystRequestData>();

  const [amount] = useState(1); // 결제 금액

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';
    script.onload = () => {
      if (window.IMP) {
        window.IMP.init('imp42785863'); // 가맹점 식별코드
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = (data: AnalystRequestData) => {
    if (!window.IMP) {
      alert('결제 모듈이 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      alert('유효한 결제 금액이 설정되지 않았습니다.');
      return;
    }

    window.IMP.request_pay(
      {
        pg: 'kicc', // 결제창 PG사
        pay_method: 'card',
        merchant_uid: 'merchant' + new Date().getTime(),
        name: '주문명:결제테스트',
        amount: amount,
        buyer_email: 'iamport@siot.do',
        buyer_name: '구매자이름',
        buyer_tel: '010-1234-5678',
        buyer_addr: '서울특별시 강남구 삼성동',
        buyer_postcode: '123-456',
        m_redirect_url: 'https://www.yourdomain.com/payments/complete', // 결제 완료 시 리다이렉트 될 주소
      },
      async (rsp: any) => {
        if (rsp.success) {
          let msg = '결제가 완료되었습니다.';
          msg += '고유ID : ' + rsp.imp_uid;
          msg += '상점 거래ID : ' + rsp.merchant_uid;
          msg += '결제 금액 : ' + rsp.paid_amount;
          msg += '카드 승인번호 : ' + rsp.apply_num;
          alert(msg);

          // 결제 성공 후 요청사항 서버에 전송
          try {
            const response = await fetch('/api/submit-request', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });

            if (!response.ok) {
              throw new Error('서버에 요청을 전송하는 데 실패했습니다.');
            }

            console.log('서버로 요청사항이 성공적으로 전송되었습니다.');
          } catch (error) {
            console.error('오류가 발생했습니다:', error);
          }
        } else {
          let msg = '결제에 실패하였습니다.';
          msg += '에러내용 : ' + rsp.error_msg;
          alert(msg);
        }
      }
    );
  };

  return (
    <div className='flex h-full flex-col items-center'>
      <h1 className='my-[64px] text-center text-[23px] md:text-[27px]'>사이트분석 및 등록을 의뢰하세요</h1>
      <div className='flex w-full flex-col items-center justify-center gap-8 px-10 lg:flex-row'>
        <BasicInfoSection register={register} errors={errors} />
        <DiscountSection onSubmit={handleSubmit(handlePayment)} amount={amount} />
      </div>
    </div>
  );
};

const BasicInfoSection = ({ register, errors }: any) => {
  return (
    <div className='h-[535px] w-full rounded-[15px] bg-white px-[20px] py-[20px] shadow-custom-light xl:w-[964px]'>
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
        <div className='mb-[25px]'>
          <p className='mb-[7px] font-semibold'>요청사항</p>
          <input
            type='text'
            placeholder='요청사항을 입력해주세요'
            className='h-[50px] w-full rounded-[5px] border border-gray-c4 bg-white px-[10px] focus:outline-none focus:ring-1 focus:ring-blue-primary'
            {...register('requirements', {
              required: '요청사항을 입력해주세요.',
            })}
          />
          {errors.requirements && <p className='ml-1 text-red'>{errors.requirements.message}</p>}
        </div>
      </div>
    </div>
  );
};

interface DiscountSectionProps {
  onSubmit: () => void;
  amount: number;
}

const DiscountSection: React.FC<DiscountSectionProps> = ({ onSubmit, amount }) => {
  return (
    <form
      onSubmit={onSubmit}
      className='h-[535px] w-full rounded-[15px] bg-white px-[30px] py-[31px] shadow-custom-light lg:w-[366px]'
    >
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
              <div className='flex h-[44px] w-full items-center justify-end rounded-[5px] border border-gray-c4 px-[10px] lg:w-[199px]'>
                <p className='text-gray-db'>0</p>
              </div>
              <button
                type='button'
                className={`ml-[11px] h-[44px] w-[130px] rounded-[5px] border border-gray-db bg-white px-[10px] text-[14px] shadow-custom-light transition-colors duration-300 hover:bg-white-f9 sm:w-[100px] sm:text-[16px]`}
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
              <div className='flex h-[44px] w-full items-center justify-end rounded-[5px] border border-gray-c4 px-[10px] lg:w-[199px]'>
                <p className='text-gray-db'>0</p>
              </div>
              <button
                type='button'
                className={`ml-[11px] h-[44px] w-[130px] rounded-[5px] border border-gray-db bg-white px-[10px] text-[14px] shadow-custom-light transition-colors duration-300 hover:bg-white-f9 sm:w-[100px] sm:text-[16px]`}
              >
                쿠폰선택
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
              <p className='text-[18px] font-semibold'>{amount}원</p>
            </div>
          </div>
          <button
            type='submit'
            className='h-[46px] w-full rounded-[10px] bg-blue-primary text-[16px] font-bold text-white duration-300 hover:bg-blue-hover'
          >
            결제하기
          </button>
          <p className='mt-[8px] text-[12px] text-gray-75'>
            사용자 본인은 주문내용을 확인했으며,
            <br /> 구매조건 및 개인정보처리방침과 결제에 동의합니다.
          </p>
        </div>
      </div>
    </form>
  );
};

export default AnalystRequestPage;
