import React from 'react';
import { useForm } from 'react-hook-form';
import BtnMypage from '../common/button/BtnMypage';
import userData from '../../data/analystProfile.json';

type MyPageAnalystInfoEditProps = {
  onSave: () => void;
};

type FormValues = {
  intro: string;
  merit: string;
  summary: string;
};

const MyPageAnalystInfoEdit: React.FC<MyPageAnalystInfoEditProps> = ({ onSave }) => {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      intro: userData.intro,
      merit: userData.merit,
      summary: userData.summary,
    },
  });

  const onSubmit = (data: FormValues) => {
    const { intro, merit, summary } = data;

    if (!intro || !merit || !summary) {
      alert('빈칸을 모두 채워주세요.');
      return;
    }

    onSave();
  };

  const handleSaveClick = () => {
    handleSubmit(onSubmit)();
  };

  const grayRounded = 'rounded-lg border border-gray-dc bg-white px-6 py-4 mb-10';
  const subTitle = 'font-semibold mr-5';

  return (
    <div className='container h-[calc(100vh-70px)] w-full overflow-auto'>
      <form>
        <div className={`${grayRounded}`}>
          <div className='flex justify-between'>
            <h2 className='mb-4 text-xl font-bold'>정보 수정</h2>
            <div>
              <input type='file' />
              <BtnMypage onClick={handleSaveClick} className='mb-3 px-3 py-1'>
                저장
              </BtnMypage>
            </div>
          </div>
          <div className='space-y-4'>
            <div className='flex'>
              <p className='my-auto font-semibold'>사진</p>
              <img src={userData.image} alt='analyst-profile-img' className='m-auto size-20' />
            </div>
            <div>
              <p className={`mb-2 ${subTitle}`}>소개</p>
              <textarea
                {...register('intro')}
                className={`${grayRounded} h-[300px] w-full resize-none break-all border`}
              />
            </div>
            <div>
              <p className={`mb-2 ${subTitle}`}>장점</p>
              <textarea {...register('merit')} className={`${grayRounded} w-full resize-none break-all px-2 py-1`} />
            </div>
            <div>
              <p className={`${subTitle} mb-2`}>전하고 싶은 한 마디</p>
              <textarea {...register('summary')} className={`${grayRounded} w-full resize-none break-all px-2 py-1`} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyPageAnalystInfoEdit;
