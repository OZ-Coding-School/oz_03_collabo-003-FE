import { useState } from 'react';
import SideBar from '../components/common/SideBar';
import MyPageCardContainer from '../components/specific/MyPageCardContainer';
import MyPageUserInfo from '../components/specific/MyPageUserInfo';
import BtnMypage from '../components/common/button/BtnMypage';
import { useNavigate } from 'react-router-dom';
import ModalContainer from '../components/common/ModalContainer';

const MyPage = () => {
  const items: string[] = ['찜 목록', '회원 정보', '권한 관리'];
  const [selectedItem, setSelectedItem] = useState(items[0]);
  // 향후 코드 정리 예정
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isAnalystModalOpen, setIsAnalystModalOpen] = useState(false);

  const navigate = useNavigate();

  // 향후 코드 정리 예정
  const handleClientClick = () => {
    setIsClientModalOpen(true);
  };

  const handleAnalystClick = () => {
    setIsAnalystModalOpen(true);
  };

  const closeModal = () => {
    setIsClientModalOpen(false);
    setIsAnalystModalOpen(false);
  };

  const handleOnSubmit = () => {};

  const goHandleClientClick = () => {
    navigate('/mypage/owner');
  };

  const goHandleAnalystClick = () => {};

  const inputRounded = 'rounded-md border border-gray-c4 p-2 w-full placeholder:text-gray-c4 my-2';

  return (
    <div className='size-auo flex'>
      <SideBar items={items} selectedItem={selectedItem} onSelectedItem={setSelectedItem} />
      <div className='grow'>
        {selectedItem === '찜 목록' && <MyPageCardContainer layout='user' />}
        {selectedItem === '회원 정보' && <MyPageUserInfo />}
        {selectedItem === '권한 관리' && (
          <div className='container m-24 items-center'>
            <div className='element-container'>
              <div className='client flex'>
                <p className='justify-between'>사이트 정보를 간편하게 등록하고, 자신의 서비스 분석을 의뢰하세요</p>
                <BtnMypage onClick={handleClientClick}>의뢰자 신청하기</BtnMypage>
                <ModalContainer
                  isOpen={isClientModalOpen}
                  onClose={closeModal}
                  onSubmit={handleOnSubmit}
                  title='의뢰자 신청하기'
                >
                  {
                    <div className='modal-children-container'>
                      <div className='business-name'>
                        <p>사업자명</p>
                        <input type='text' className={inputRounded} placeholder='사업자명을 입력해주세요' />
                      </div>
                      <div className='business-registration-number w-full'>
                        <p>사업자 등록번호</p>
                        <div className='input-box relative'>
                          <input
                            type='text'
                            className={inputRounded}
                            placeholder='사업자 등록 번호를 입력해주세요 ( ‘-’ 제외 )'
                          />
                          <button className='absolute right-[1px] top-[6px] rounded-md bg-gray-db p-[10px] text-white'>
                            인증
                          </button>
                        </div>
                      </div>
                      <div className='representative-number'>
                        <p>대표 전화</p>
                        <input type='text' className={inputRounded} placeholder='연락처를 입력해주세요 ( ‘-’ 제외 )' />
                      </div>
                    </div>
                  }
                </ModalContainer>
                <BtnMypage onClick={goHandleClientClick}>의뢰자 이동하기</BtnMypage>
              </div>
              <div className='provider flex'>
                <p>
                  사이트 오너의 등록된 정보를 분석하여 짜임새 있는 구조로 사이트를 등록해요. 이 과정에서 수익 창출이
                  가능해요.
                </p>
                <BtnMypage onClick={handleAnalystClick}>분석가 신청하기</BtnMypage>
                <ModalContainer
                  isOpen={isAnalystModalOpen}
                  onClose={closeModal}
                  onSubmit={handleOnSubmit}
                  title='분석가 신청하기'
                >
                  {
                    <div className='modal-children-container'>
                      {/* 추후 유저 이메일 정보 자동으로 받아올 예정 */}
                      <p>example123@gmail.com</p>
                      <p>
                        회원 정보에 등록된 이메일로 분석 요청에 대한 메일이 발송됩니다. 이메일이 올바른지 확인해주세요.
                      </p>
                    </div>
                  }
                </ModalContainer>
                <BtnMypage onClick={goHandleAnalystClick}>분석가 이동하기</BtnMypage>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
