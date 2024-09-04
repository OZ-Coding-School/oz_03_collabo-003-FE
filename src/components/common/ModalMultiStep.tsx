import React, { useState, useEffect, ReactNode } from 'react';
import ModalContainer from './ModalContainer';
import BtnMypage from '../common/button/BtnMypage';

interface StepProps {
  content: ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
}

interface ModalMultiStepProps {
  isOpen: boolean;
  onClose: () => void;
  initialTitle: string;
  steps: StepProps[];
  className?: string;
}

const ModalMultiStep: React.FC<ModalMultiStepProps> = ({ isOpen, onClose, initialTitle, steps, className }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    if (currentStep === 1) {
      setTitle('신청이 완료되었습니다');
    }
  }, [currentStep]);

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleButtonClick = () => {
    // 현재 스텝의 onButtonClick을 호출합니다.
    if (steps[currentStep].onButtonClick) {
      steps[currentStep].onButtonClick();

      // 유효성 검사가 성공적이면 다음 스텝으로 이동
      if (currentStep < steps.length - 1) {
        goToNextStep();
      }
    }
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} title={title} className={`size-auto ${className}`}>
      <div className='step size-auto'>{steps[currentStep].content}</div>
      <div className='flex justify-center'>
        <BtnMypage onClick={handleButtonClick} className='mt-4 px-7 py-1'>
          {steps[currentStep].buttonText}
        </BtnMypage>
      </div>
    </ModalContainer>
  );
};

export default ModalMultiStep;
