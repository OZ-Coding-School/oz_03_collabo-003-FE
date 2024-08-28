import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/specific/FileUpload';
import AutoResizeTextarea from '../components/common/AutoResizeTextarea';
import categoriesData from '../data/categories.json';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const [subCategories, setSubCategories] = useState<{ id: number; label: string; slug: string }[]>([]);
  const [contentImages, setContentImages] = useState<File[]>([]);

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    const selectedCategory = categoriesData.find((category) => category.id.toString() === data.category);
    const selectedSubCategory = selectedCategory?.subCategories.find((sub) => sub.id.toString() === data.subCategory);

    if (!selectedCategory || !selectedSubCategory) {
      console.error('카테고리 또는 서브 카테고리를 찾을 수 없습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('link', data.link);
    formData.append('point', data.point);
    formData.append('content', data.content);
    formData.append('categoryId', selectedCategory.id.toString());
    formData.append('subCategoryId', selectedSubCategory.id.toString());

    if (data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    contentImages.forEach((file) => {
      formData.append('contentImages[]', file);
    });

    console.log('FormData entries:');
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    const response = await fetch('/api/upload-site', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      alert('사이트 등록이 완료되었습니다.');
      navigate('/');
    } else {
      console.error('사이트 등록 실패');
    }
  };

  // 상위 카테고리가 변경될 때 호출
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = parseInt(event.target.value);
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
                  className='mr-[15px] block h-[50px] w-full rounded-[5px] border border-gray-c4 px-[15px] text-[16px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary'
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
                  className='block h-[50px] w-full rounded-[5px] border border-gray-c4 px-[15px] text-[16px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary'
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
                className='mt-2 block h-[50px] w-full rounded-[5px] border border-gray-c4 px-[15px] py-4 text-[16px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary'
                {...register('title', {
                  required: '페이지 타이틀을 입력해주세요.',
                  maxLength: {
                    value: 30,
                    message: '페이지 타이틀은 최대 30자까지 입력할 수 있습니다.',
                  },
                })}
              />
              {errors.title && <p className='ml-1 text-red'>{errors.title.message}</p>}
            </div>
            <div className='mb-[30px]'>
              <p className='mb-[11px] text-[18px]'>페이지 링크</p>
              <input
                type='text'
                placeholder='페이지 링크를 입력해주세요'
                className='mt-2 block h-[50px] w-full rounded-[5px] border border-gray-c4 px-[15px] py-4 text-[16px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary'
                {...register('link', {
                  required: '페이지 링크를 입력해주세요.',
                  pattern: {
                    value: /^(https?:\/\/)?([\w\d\-_]+\.+[A-Za-z]{2,})+\/?/,
                    message: '유효한 링크를 입력해주세요.',
                  },
                  maxLength: {
                    value: 100,
                    message: '페이지 링크는 최대 100자까지 입력할 수 있습니다.',
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
                className='mt-2 block h-[50px] w-full rounded-[5px] border border-gray-c4 px-[15px] py-4 text-[16px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary'
                {...register('point', {
                  required: '한줄 요약 포인트를 입력해주세요.',
                  maxLength: {
                    value: 50,
                    message: '한줄 요약포인트는 최대 50자까지 입력할 수 있습니다.',
                  },
                })}
              />
              {errors.point && <p className='ml-1 text-red'>{errors.point.message}</p>}
            </div>
            <div className='mb-[30px]'>
              <p className='mb-[11px] text-[18px]'>상세내용</p>
              <AutoResizeTextarea
                placeholder='상세내용을 입력해주세요 (최대 1000자)'
                className='mb-[15px] mt-2 block min-h-[50px] w-full rounded-[5px] border border-gray-c4 px-[15px] py-4 text-[16px] shadow-custom-light focus:border-blue-primary focus:outline-none focus:ring-blue-primary'
                {...register('content', {
                  maxLength: {
                    value: 1000,
                    message: '상세내용은 최대 1000자까지 입력할 수 있습니다.',
                  },
                })}
              />
              <FileUpload setContentImages={setContentImages} />
              {errors.content && <p className='ml-1 text-red'>{errors.content.message}</p>}
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
