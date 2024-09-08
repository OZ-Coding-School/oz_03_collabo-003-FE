import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import BtnMypage from '../common/button/BtnMypage';
import analystData from '../../data/analystProfile.json';
import { Analyst } from '../../types/type';

type MyPageAnalystInfoEditProps = {
  onSave: () => void;
};

type FormValues = {
  intro: string;
  merit: string;
  summary: string;
};

const analyst = analystData.find((analyst) => analyst.id === 1) as Analyst;

const MyPageAnalystInfoEdit: React.FC<MyPageAnalystInfoEditProps> = ({ onSave }) => {
  const [profileImage, setProfileImage] = useState(analyst.image || '');
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      intro: analyst.intro,
      merit: analyst.merit,
      summary: analyst.summary,
    },
  });

  const onSubmit = (data: FormValues) => {
    const { intro, merit, summary } = data;

    if (!profileImage || !intro || !merit || !summary) {
      alert('빈칸을 모두 채워주세요.');
      return;
    }

    onSave();
  };

  const handleSaveClick = () => {
    handleSubmit(onSubmit)();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const grayRounded = 'rounded-lg border border-gray-dc bg-white px-6 py-4 mb-10 placeholder:text-gray-c4';
  const subTitle = 'font-semibold mr-5';

  return (
    <div className='container h-[calc(100vh-70px)] w-full'>
      <form>
        <div className={`${grayRounded}`}>
          <div className='flex justify-between'>
            <h2 className='mb-4 text-xl font-bold'>정보 수정</h2>
            <div>
              <label className='mr-2 rounded-[5px] bg-white px-3 py-[5px] shadow-custom-dark transition-colors duration-300 hover:bg-white-f9'>
                이미지 등록
                <input type='file' className='hidden' accept='image/*' onChange={handleImageChange} />
              </label>
              <BtnMypage onClick={handleSaveClick} className='mb-3 px-3 py-1'>
                저장
              </BtnMypage>
            </div>
          </div>
          <div className='space-y-4'>
            <div className='flex items-center'>
              <p className='my-auto mr-4 font-semibold'>사진</p>
              {profileImage ? (
                <img src={profileImage} alt='analyst-profile-img' className='m-auto max-h-40 max-w-40 object-cover' />
              ) : (
                <p className='text-gray-c4'>이미지를 등록해주세요</p>
              )}
            </div>
            <div>
              <p className={`mb-2 ${subTitle}`}>소개</p>
              <textarea
                {...register('intro')}
                className={`${grayRounded} h-[300px] w-full resize-none break-all border`}
                placeholder='500자 이내로 입력해주세요.'
                maxLength={500}
              />
            </div>
            <div>
              <p className={`mb-2 ${subTitle}`}>장점</p>
              <textarea
                {...register('merit')}
                className={`${grayRounded} w-full resize-none break-all px-2 py-1`}
                placeholder='100자 이내로 입력해주세요.'
                maxLength={100}
              />
            </div>
            <div>
              <p className={`${subTitle} mb-2`}>전하고 싶은 한 마디</p>
              <textarea
                {...register('summary')}
                className={`${grayRounded} w-full resize-none break-all px-2 py-1`}
                placeholder='50자 이내로 입력해주세요.'
                maxLength={50}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyPageAnalystInfoEdit;
