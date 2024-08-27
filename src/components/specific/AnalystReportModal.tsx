import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
//import axios from 'axios';

interface AnalystReportModalProps {
  isOpen: boolean;
  onOpen: (isOpen: boolean) => void;
}

interface Inputs {
  file: FileList;
}

const AnalystReportModal: React.FC<AnalystReportModalProps> = ({ isOpen, onOpen }) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    // 나중에 데이터 응답 성공시로 옮기기
    alert('해당 사이트에 대한 분석 보고서가 제출되었습니다.');
    onOpen(false);
    // const formData = new FormData();
    // formData.append('file', data.file[0]);
    // if (data) {
    //   try {
    //     const response = await axios.post('/', formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //         Accept: 'application/json',
    //       },
    //     });
    //     console.log('분석 보고서 제출 성공', response.data);
    //   } catch (error) {
    //     console.error('분석 보고서 제출 실패', error);
    //   }
    // } else {
    //   return;
    // }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='fixed inset-0 z-50 flex items-center justify-center bg-gray-75 bg-opacity-50'
    >
      <div className='flex w-full max-w-lg flex-col gap-2 rounded-lg bg-white p-6 shadow-custom-light'>
        <div className='flex items-center justify-center'>
          <h2 className='flex-1 text-center text-xl font-semibold'>분석 보고서</h2>
          <button onClick={() => onOpen(false)} className='justify-self-end bg-white text-gray-75'>
            X
          </button>
        </div>
        <div className='mx-3 my-4 flex flex-col gap-1'>
          <input
            className='truncate text-gray-46'
            type='file'
            id='input-file'
            accept='image/*, .txt, .pdf, .doc, .docx'
            {...register('file', { required: true })}
          />
          <p className='truncate text-sm text-gray-75'>
            이미지 파일 및 .txt, .pdf, .doc, .docx 형식의 파일을 업로드 해주세요.
          </p>
        </div>
        <div className='mt-2 flex justify-center'>
          <button
            className='rounded-[5px] bg-blue-primary px-5 py-1 text-center text-white shadow-custom-dark transition-colors duration-300 hover:bg-blue-hover'
            type='submit'
          >
            제출하기
          </button>
        </div>
      </div>
    </form>
  );
};

export default AnalystReportModal;
