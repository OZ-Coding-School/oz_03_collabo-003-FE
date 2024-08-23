import { useState } from 'react';
import BtnMypage from '../common/button/BtnMypage';
import { useNavigate } from 'react-router-dom';
import MultiStepModal from './../common/ModalMultiStepPermission';

const MyPageAuthz = () => {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isAnalystModalOpen, setIsAnalystModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const navigate = useNavigate();

  const handleClientClick = () => {
    setIsClientModalOpen(true);
  };

  const handleAnalystClick = () => {
    setIsAnalystModalOpen(true);
    setCurrentStep(1);
  };

  const closeModal = () => {
    setIsClientModalOpen(false);
    setIsAnalystModalOpen(false);
  };

  const goHandleClientClick = () => {
    navigate('/mypage/owner');
  };

  const goHandleAnalystClick = () => {
    navigate('/mypage/analyst');
  };

  const inputRounded = 'rounded-md border border-gray-c4 p-2 w-full placeholder:text-gray-c4 my-2';

  const completeIcon = 'size-32 m-auto';

  const ownerStep = [
    {
      content: (
        <div className='modal-children-container'>
          <div className='business-name'>
            <p>사업자명</p>
            <input type='text' className={inputRounded} placeholder='사업자명을 입력해주세요' />
          </div>
          <div className='business-registration-number w-full'>
            <p>사업자 등록번호</p>
            <div className='input-box relative'>
              <input type='text' className={inputRounded} placeholder='사업자 등록 번호를 입력해주세요 ( ‘-’ 제외 )' />
              <button className='absolute right-[1px] top-[6px] rounded-md bg-gray-db p-[10px] text-white'>인증</button>
            </div>
          </div>
          <div className='representative-number'>
            <p>대표 전화</p>
            <input type='text' className={inputRounded} placeholder='연락처를 입력해주세요 ( ‘-’ 제외 )' />
          </div>
        </div>
      ),
      buttonText: '신청하기',
      onButtonClick: () => console.log('신청 완료'),
    },
    {
      content: (
        <div className='text-center'>
          <img src='../images/complete-icon.png' alt='complete-icon' className={completeIcon} />
          <p className='mt-4'>의뢰자 마이페이지로 이동하시겠습니까?</p>
        </div>
      ),
      buttonText: '이동',
      onButtonClick: () => navigate('/mypage/owner'),
    },
  ];

  const analystStep = [
    {
      content: (
        <div className='text-center'>
          <p>분석가 권한을 신청하시겠습니까?</p>
          <p className='my-4 font-semibold'>example123@gmail.com</p>
          <p>회원 정보에 등록된 이메일로 분석 요청에 대한 메일이 발송됩니다.</p>
          <p>올바른 이메일인지 반드시 확인해주세요.</p>
        </div>
      ),
      buttonText: '신청하기',
      onButtonClick: () => console.log('신청 완료'),
    },
    {
      content: (
        <div className='text-center'>
          <img src='../images/complete-icon.png' alt='complete-icon' className={completeIcon} />
          <p className='mt-4'>분석가 정보 등록 페이지로 이동하시겠습니까?</p>
        </div>
      ),
      buttonText: '이동',
      onButtonClick: () => navigate('/mypage/analyst'),
    },
  ];

  return (
    <div className='h-[calc(100vh-70px)] w-full overflow-auto'>
      <div className='container m-24 items-center'>
        <div className='element-container'>
          <div className='client flex'>
            <p className='justify-between'>사이트 정보를 간편하게 등록하고, 자신의 서비스 분석을 의뢰하세요</p>
            <BtnMypage onClick={handleClientClick}>의뢰자 신청하기</BtnMypage>
            <MultiStepModal
              isOpen={isClientModalOpen}
              onClose={closeModal}
              initialTitle='의뢰자 신청하기'
              steps={ownerStep}
            ></MultiStepModal>
            <BtnMypage onClick={goHandleClientClick}>의뢰자 이동하기</BtnMypage>
          </div>
          <div className='provider flex'>
            <p>
              사이트 오너의 등록된 정보를 분석하여 짜임새 있는 구조로 사이트를 등록해요. 이 과정에서 수익 창출이
              가능해요.
            </p>
            <BtnMypage onClick={handleAnalystClick}>분석가 신청하기</BtnMypage>
            <MultiStepModal
              isOpen={isAnalystModalOpen}
              onClose={() => setIsAnalystModalOpen(false)}
              initialTitle='분석가 신청'
              steps={analystStep}
            ></MultiStepModal>
            <BtnMypage onClick={goHandleAnalystClick}>분석가 이동하기</BtnMypage>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageAuthz;
