import React, { useEffect } from 'react';
import axios from 'axios';

interface PaymentSectionProps {
  amount: number;
  onSuccess: (data: any) => void;
  onFailure: (error: any) => void;
}

declare global {
  interface Window {
    IMP?: any;
  }
}

const PaymentSection: React.FC<PaymentSectionProps> = ({ amount, onSuccess, onFailure }) => {
  useEffect(() => {
    // 아임포트 스크립트 동적 로드
    const script = document.createElement('script');
    script.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('유효한 결제 금액을 입력해주세요.');
      return;
    }

    if (!window.IMP) {
      alert('결제 모듈을 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const { IMP } = window;
    IMP.init('imp42785863'); // 가맹점 식별코드

    IMP.request_pay(
      {
        pg: 'kicc', // PG사
        pay_method: 'card', // 결제수단
        merchant_uid: `merchant_${new Date().getTime()}`, // 주문번호
        name: '사이트 분석 의뢰 결제', // 결제명
        amount: amount, // 결제금액
        buyer_email: 'customer@example.com',
        buyer_name: '홍길동',
        buyer_tel: '010-1234-5678',
        buyer_addr: '서울특별시 강남구 삼성동',
        buyer_postcode: '12345',
      },
      async (response: any) => {
        if (response.success) {
          try {
            // 서버에 결제 정보 검증 요청
            const verifyResponse = await axios.post('/api/verify-payment', {
              imp_uid: response.imp_uid,
              merchant_uid: response.merchant_uid,
            });

            if (verifyResponse.data.success) {
              onSuccess(verifyResponse.data);
            } else {
              onFailure(verifyResponse.data);
            }
          } catch (error) {
            onFailure(error);
          }
        } else {
          onFailure(response);
        }
      }
    );
  };

  return (
    <div className='h-[495px] w-[366px] rounded-[15px] bg-white px-[30px] py-[31px] shadow-custom-light'>
      <h2 className='mb-[20px] text-[20px] font-bold'>결제 정보</h2>
      <div className='flex h-full flex-col justify-between'>
        <div>
          <div className='mb-[25px]'>
            <p className='mb-1 font-semibold'>결제 금액</p>
            <div className='flex h-[44px] w-full items-center rounded-[5px] border border-gray-c4 px-[10px]'>
              <p className='text-gray-800'>{amount.toLocaleString()}원</p>
            </div>
          </div>
        </div>
        <div>
          <button
            type='button'
            onClick={handlePayment}
            className='bg-blue-500 hover:bg-blue-600 h-[46px] w-full rounded-[10px] text-[16px] font-bold text-white transition-colors duration-300'
          >
            결제하기
          </button>
          <p className='text-gray-500 mt-4 text-[12px]'>
            결제를 진행하시면 이용 약관 및 개인정보처리방침에 동의하게 됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
