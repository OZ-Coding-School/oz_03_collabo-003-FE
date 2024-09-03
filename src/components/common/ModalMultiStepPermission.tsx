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
    } else {
      setTitle('');
    }
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} title={title} className={`size-auto ${className}`}>
      <div className='step size-auto'>{steps[currentStep].content}</div>
      <div className='flex justify-center'>
        <BtnMypage
          onClick={() => {
            if (steps[currentStep].onButtonClick) {
              steps[currentStep].onButtonClick();
            }
            goToNextStep();
          }}
          className='mt-4 px-7 py-1'
        >
          {steps[currentStep].buttonText}
        </BtnMypage>
      </div>
    </ModalContainer>
  );
};

export default ModalMultiStep;
