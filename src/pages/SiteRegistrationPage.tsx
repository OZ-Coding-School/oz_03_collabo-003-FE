import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/specific/FileUpload';
import AutoResizeTextarea from '../components/common/AutoResizeTextarea';
import categoriesData from '../data/categories.json';

// 폼에서 사용할 입력 필드를 정의한 인터페이스
interface RegisterInputs {
  title: string;
  link: string;
  point: string;
  image: FileList;
  content: string;
  category: string;
  subCategory: string;
}

const SiteRegistrationPage = () => {
  const navigate = useNavigate();

  // react-hook-form을 사용하여 폼 데이터를 관리
  const {
    register, // 폼 필드 등록에 사용
    handleSubmit, // 폼 제출을 핸들링
    formState: { errors }, // 폼의 에러 상태를 관리
  } = useForm<RegisterInputs>();

  // 선택된 카테고리에 따른 하위 카테고리를 관리하는 상태
  const [subCategories, setSubCategories] = useState<{ id: number; label: string; slug: string }[]>([]);
  // 업로드된 이미지 파일을 관리하는 상태
  const [contentImages, setContentImages] = useState<File[]>([]);

  // 폼이 제출되었을 때 호출되는 함수
  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    // 선택된 카테고리와 하위 카테고리를 찾음
    const selectedCategory = categoriesData.find((category) => category.id.toString() === data.category);
    const selectedSubCategory = selectedCategory?.subCategories.find((sub) => sub.id.toString() === data.subCategory);

    // 카테고리 또는 서브 카테고리가 존재하지 않으면 에러 출력
    if (!selectedCategory || !selectedSubCategory) {
      console.error('카테고리 또는 서브 카테고리를 찾을 수 없습니다.');
      return;
    }

    // 서버로 보낼 데이터를 담을 FormData 객체를 생성
    const formData = new FormData();
    formData.append('title', data.title); // 제목 추가
    formData.append('link', data.link); // 링크 추가
    formData.append('point', data.point); // 요약 포인트 추가
    formData.append('content', data.content); // 상세 내용 추가
    formData.append('categoryId', selectedCategory.id.toString()); // 선택된 카테고리 ID 추가
    formData.append('subCategoryId', selectedSubCategory.id.toString()); // 선택된 서브 카테고리 ID 추가

    // 대표 이미지가 선택된 경우 FormData에 추가
    if (data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    // 업로드된 모든 이미지 파일을 FormData에 추가
    contentImages.forEach((file) => {
      formData.append('contentImages[]', file);
    });

    // 디버깅을 위해 FormData에 들어있는 데이터를 콘솔에 출력
    console.log('FormData entries:');
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    // 서버에 데이터를 POST 요청으로 전송
    const response = await fetch('/api/upload-site', {
      method: 'POST',
      body: formData,
    });

    // 요청이 성공했는지 확인하고, 사용자에게 결과 알림
    if (response.ok) {
      alert('사이트 등록이 완료되었습니다.');
      navigate('/');
    } else {
      console.error('사이트 등록 실패');
    }
  };

  // 상위 카테고리가 변경될 때 호출되는 함수
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = parseInt(event.target.value);
    // 선택된 상위 카테고리에 따른 하위 카테고리 리스트를 설정
    const selectedCategory = categoriesData.find((category) => category.id === selectedCategoryId);
    setSubCategories(selectedCategory ? selectedCategory.subCategories : []);
  };

  return (
    <div className='h-[calc(100vh-70px)] overflow-x-hidden'>
      <h1 className='my-[44px] text-center text-[27px]'>직접 사이트를 등록할 수 있어요</h1>
      <div className='flex flex-col items-center justify-center'>
        <form className='flex w-[1039px] flex-col items-center gap-4' onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full'>
            <div className='mb-[30px] w-[65%]'>
              <p className='mb-[11px] text-[18px]'>카테고리 선택</p>
              <div className='flex'>
                <select
                  {...register('category', {
                    required: '카테고리를 선택해주세요.',
                  })}
                  onChange={handleCategoryChange}
                  className='mr-[15px] h-[55px] w-full rounded-[10px] border border-gray-c4 bg-white px-[0px] focus:outline-none focus:ring-1 focus:ring-blue-primary'
                >
                  <option value='default'>상위 카테고리를 선택해주세요</option>
                  {categoriesData.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categories}
                    </option>
                  ))}
                </select>
                <select
                  {...register('subCategory', {
                    required: '카테고리를 선택해주세요.',
                  })}
                  className='h-[55px] w-full rounded-[10px] border border-gray-c4 bg-white px-[20px] focus:outline-none focus:ring-1 focus:ring-blue-primary'
                >
                  <option value=''>하위 카테고리를 선택해주세요</option>
                  {subCategories.map((subCategory) => (
                    <option key={subCategory.id} value={subCategory.id.toString()}>
                      {subCategory.label}
                    </option>
                  ))}
                </select>
              </div>
              {(errors.category || errors.subCategory) && (
                <p className='ml-1 text-red'>상위 및 하위 카테고리를 모두 선택해주세요.</p>
              )}
            </div>
            <div className='mb-[30px]'>
              <p className='mb-[11px] text-[18px]'>페이지 대표 이미지</p>
              <input
                type='file'
                accept='.jpg, .jpeg, .png'
                {...register('image', {
                  required: '대표 이미지를 선택해주세요.',
                })}
              />
              <p className='mt-[5px] text-[14px] text-gray-75'>
                .jpg, .jpeg, .png 형식의 이미지를 업로드해 주세요. (최대 5MB)
              </p>
              {errors.image && <p className='ml-1 text-red'>{errors.image.message}</p>}
            </div>
            <div className='mb-[30px]'>
              <p className='mb-[11px] text-[18px]'>페이지 타이틀</p>
              <input
                type='text'
                placeholder='페이지 타이틀 명을 입력해주세요'
                className='h-[55px] w-full rounded-[10px] border border-gray-c4 bg-white px-[20px] focus:outline-none focus:ring-1 focus:ring-blue-primary'
                {...register('title', { required: '페이지 타이틀을 입력해주세요.' })}
              />
              {errors.title && <p className='ml-1 text-red'>{errors.title.message}</p>}
            </div>
            <div className='mb-[30px]'>
              <p className='mb-[11px] text-[18px]'>페이지 링크</p>
              <input
                type='text'
                placeholder='페이지 링크를 입력해주세요'
                className='h-[55px] w-full rounded-[10px] border border-gray-c4 bg-white px-[20px] focus:outline-none focus:ring-1 focus:ring-blue-primary'
                {...register('link', {
                  required: '페이지 링크를 입력해주세요.',
                  pattern: {
                    value: /^(https?:\/\/)?([\w\d\-_]+\.+[A-Za-z]{2,})+\/?/,
                    message: '유효한 링크를 입력해주세요.',
                  },
                })}
              />
              {errors.link && <p className='ml-1 text-red'>{errors.link.message}</p>}
            </div>
            <div className='mb-[30px]'>
              <p className='mb-[11px] text-[18px]'>한줄 요약포인트</p>
              <input
                type='text'
                placeholder='한줄 요약포인트를 입력해주세요'
                className='h-[55px] w-full rounded-[10px] border border-gray-c4 bg-white px-[20px] focus:outline-none focus:ring-1 focus:ring-blue-primary'
                {...register('point', { required: '한줄 요약 포인트를 입력해주세요.' })}
              />
              {errors.point && <p className='ml-1 text-red'>{errors.point.message}</p>}
            </div>
            {/* 상세 내용 입력 */}
            <div className='mb-[30px]'>
              <p className='mb-[11px] text-[18px]'>상세내용</p>
              <AutoResizeTextarea
                placeholder='상세내용을 입력해주세요'
                className='mb-[10px] w-full rounded-[10px] border border-gray-c4 bg-white px-[20px] py-[10px] focus:outline-none focus:ring-1 focus:ring-blue-primary'
                {...register('content')}
              />
              <FileUpload setContentImages={setContentImages} />
            </div>
          </div>
          <button
            type='submit'
            className='mb-[40px] h-[46px] w-[382px] rounded-[10px] bg-blue-primary text-[16px] font-bold text-white duration-300 hover:bg-blue-hover'
          >
            등록하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default SiteRegistrationPage;
