import React from 'react';
import { useForm } from 'react-hook-form';
import BtnMypage from '../common/button/BtnMypage';
import userData from '../../data/analystProfile.json';

interface AnalystInfoEdit {
  image: FileList;
  intro: string;
  merit: string;
  summary: string;
}

type MyPageAnalystInfoEditProps = {
  onSave: () => void;
};

const MyPageAnalystInfoEdit: React.FC<MyPageAnalystInfoEditProps> = ({ onSave }) => {

  const {
    register,
    handleSub,
    formState: { errors}
  } =
  const handleSaveClick = () => {
    onSave();
  };
  const grayRounded = 'rounded-lg border border-gray-dc bg-white px-6 py-4 mb-10';
  const subTitle = 'font-semibold mr-5';

  return (
    <div className='container h-[calc(100vh-70px)] w-full overflow-auto'>
      <div className={`${grayRounded}`}>
        <div className='flex justify-between'>
          <h2 className='mb-4 text-xl font-bold'>정보 수정</h2>
          <BtnMypage onClick={handleSaveClick} className='mb-3 px-3'>
            저장
          </BtnMypage>
        </div>
        <div className='space-y-4'>
          <div className='flex'>
            <p className='my-auto font-semibold'>사진</p>
            <img src={userData.image} alt='analyst-profile-img' className='m-auto size-20' />
          </div>
          <div>
            <p className={`mb-2 ${subTitle}`}>소개</p>
            <input
              type='text'
              defaultValue={userData.intro}
              className={`${grayRounded}'h-auto py-1' w-full border px-2`}
            />
          </div>
          <div>
            <p className={`mb-2 ${subTitle}`}>장점</p>
            <input type='text' defaultValue={userData.merit} className='w-full border px-2 py-1' />
          </div>
          <div>
            <p className={`${subTitle} mb-2`}>전하고 싶은 한 마디</p>
            <input type='text' defaultValue={userData.summary} className='w-full border px-2 py-1' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageAnalystInfoEdit;
