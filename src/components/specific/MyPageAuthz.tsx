import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import BtnMypage from '../common/button/BtnMypage';
import { useNavigate } from 'react-router-dom';
import MultiStepModal from '../common/ModalMultiStep';

interface IFormInputs {
  businessName: string;
  businessRegistrationNumber: string;
  representativeNumber: string;
}

const MyPageAuthz = () => {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isAnalystModalOpen, setIsAnalystModalOpen] = useState(false);
  const [hasClientAuth, setHasClientAuth] = useState(false);
  const [hasAnalystAuth, setHasAnalystAuth] = useState(false);
  const [isBusinessNumberVerified, setIsBusinessNumberVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const handleClientClick = () => {
    setIsClientModalOpen(true);
  };

  const handleAnalystClick = () => {
    setIsAnalystModalOpen(true);
  };

  const closeModal = () => {
    setIsClientModalOpen(false);
    setIsAnalystModalOpen(false);
    setErrorMessage(''); // 모달을 닫을 때 오류 메시지 초기화
  };

  const goHandleClientClick = () => {
    navigate('/mypage/owner');
  };

  const goHandleAnalystClick = () => {
    navigate('/mypage/analyst');
  };

  const assignClientRole = () => {
    setHasClientAuth(true);
  };

  const assignAnalystRole = () => {
    setHasAnalystAuth(true);
  };

  const verifyBusinessNumber = () => {
    // 사업자 등록번호 인증 로직 (예시)
    setIsBusinessNumberVerified(true);
  };

  const onSubmitClient: SubmitHandler<IFormInputs> = (data) => {
    if (!isBusinessNumberVerified) {
      setErrorMessage('사업자 등록번호를 인증해주세요');
    } else {
      console.log(data);
      assignClientRole();
      setIsClientModalOpen(false);
    }
  };

  const validateAndSubmit = (data: IFormInputs) => {
    if (!isBusinessNumberVerified) {
      setErrorMessage('사업자 등록번호를 인증해주세요');
    } else if (!data.businessName || !data.businessRegistrationNumber || !data.representativeNumber) {
      setErrorMessage('모든 항목을 필수로 입력해야 합니다.');
    } else {
      onSubmitClient(data);
    }
  };

  const inputRounded = 'rounded-md border border-gray-c4 p-2 w-full placeholder:text-gray-c4 my-2';

  const completeIcon = 'size-32 m-auto';

  const BtnStyle = 'px-4 py-2 max-h-[40px] min-h-[40px] max-w-[144px] min-w-[144px] text-sm';

  const ownerStep = [
    {
      content: (
        <form onSubmit={handleSubmit(validateAndSubmit)} className='modal-children-container'>
          <div className='business-name'>
            <p>사업자명</p>
            <input
              type='text'
              className={inputRounded}
              placeholder='사업자명을 입력해주세요'
              {...register('businessName', { required: true, maxLength: 30 })}
            />
            {errors.businessName && <p className='text-red'>사업자명은 최대 30자까지 가능합니다.</p>}
          </div>
          <div className='business-registration-number w-full'>
            <p>사업자 등록번호</p>
            <div className='input-box relative'>
              <input
                type='text'
                className={inputRounded}
                placeholder='사업자 등록 번호를 입력해주세요 ( ‘-’ 제외 )'
                {...register('businessRegistrationNumber', {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
              />
              {errors.businessRegistrationNumber && (
                <p className='text-red'>사업자 등록번호는 숫자만 입력할 수 있습니다.</p>
              )}
              <button
                type='button'
                onClick={verifyBusinessNumber}
                className='absolute right-[1px] top-[6px] rounded-md bg-gray-db p-[10px] text-white'
              >
                인증
              </button>
            </div>
          </div>
          <div className='representative-number'>
            <p>대표 전화</p>
            <input
              type='text'
              className={inputRounded}
              placeholder='연락처를 입력해주세요 ( ‘-’ 제외 )'
              {...register('representativeNumber', {
                required: true,
                pattern: /^[0-9]+$/,
              })}
            />
            {errors.representativeNumber && <p className='text-red'>대표 전화는 숫자만 입력할 수 있습니다.</p>}
          </div>
          {errorMessage && <p className='mt-4 text-red'>{errorMessage}</p>}
        </form>
      ),
      buttonText: '신청하기',
      onButtonClick: handleSubmit(validateAndSubmit),
    },
    {
      content: (
        <div className='text-center'>
          <img src='../images/complete-icon.png' alt='complete-icon' className={completeIcon} />
          <p className='mt-4'>의뢰자 마이페이지로 이동하시겠습니까?</p>
        </div>
      ),
      buttonText: '이동',
      onButtonClick: goHandleClientClick,
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
      onButtonClick: () => assignAnalystRole(),
    },
    {
      content: (
        <div className='text-center'>
          <img src='../images/complete-icon.png' alt='complete-icon' className={completeIcon} />
          <p className='mt-4'>분석가 정보 등록 페이지로 이동하시겠습니까?</p>
        </div>
      ),
      buttonText: '이동',
      onButtonClick: goHandleAnalystClick,
    },
  ];

  return (
    <div className='h-[calc(100vh-70px)] w-1/2 overflow-auto'>
      <div className='container my-24 min-w-[360px]'>
        <div className='client mb-16 flex justify-between'>
          <p className='custom mb-4 lg:w-[300px] xl:w-full sm-md:w-[150px]'>
            사이트 정보를 간편하게 등록하고, 자신의 서비스 분석을 의뢰하세요
          </p>
          {!hasClientAuth && (
            <BtnMypage onClick={handleClientClick} className={BtnStyle}>
              의뢰자 신청하기
            </BtnMypage>
          )}
          {hasClientAuth && (
            <BtnMypage onClick={goHandleClientClick} className={BtnStyle}>
              의뢰자 이동하기
            </BtnMypage>
          )}
          <MultiStepModal
            isOpen={isClientModalOpen}
            onClose={closeModal}
            initialTitle='의뢰자 신청하기'
            steps={ownerStep}
          />
        </div>
        <div className='provider flex justify-between'>
          <div className='mb-4 lg:w-[300px] xl:w-full sm-md:w-[150px]'>
            <p>사이트 오너의 등록된 정보를 분석하여 짜임새 있는 구조로 사이트를 등록해요.</p>
            <p> 이 과정에서 수익 창출이 가능해요.</p>
          </div>
          {!hasAnalystAuth && (
            <BtnMypage onClick={handleAnalystClick} className={`${BtnStyle}`}>
              분석가 신청하기
            </BtnMypage>
          )}
          {hasAnalystAuth && (
            <BtnMypage onClick={goHandleAnalystClick} className={BtnStyle}>
              분석가 이동하기
            </BtnMypage>
          )}
          <MultiStepModal
            isOpen={isAnalystModalOpen}
            onClose={() => setIsAnalystModalOpen(false)}
            initialTitle='분석가 신청'
            steps={analystStep}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPageAuthz;
