import { useForm, SubmitHandler } from 'react-hook-form';
import PageEditor from '../components/specific/PageEditor';

interface RegisterInputs {
  title: string;
  link: string;
  point: string;
  image: FileList;
}

const SiteRegistrationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    // try {
    //   const response = await api();
    // } catch (error) {
    //   console.error('등록실패', error);
    // }
    console.log(data);
  };

  return (
    <div className='h-[calc(100vh-70px)] overflow-x-hidden'>
      <h1 className='my-[44px] text-center text-[27px]'>직접 사이트를 등록할 수 있어요</h1>
      <div className='flex flex-col items-center justify-center'>
        <form className='flex w-[1039px] flex-col items-center gap-4' onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full'>
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
                className='h-[55px] w-full rounded-[10px] border border-gray-c4 bg-white px-[20px]'
                {...register('title', { required: '페이지 타이틀을 입력해주세요.' })}
              />
              {errors.title && <p className='ml-1 text-red'>{errors.title.message}</p>}
            </div>
            <div className='mb-[30px]'>
              <p className='mb-[11px] text-[18px]'>페이지 링크</p>
              <input
                type='text'
                placeholder='페이지 링크를 입력해주세요'
                className='h-[55px] w-full rounded-[10px] border border-gray-c4 bg-white px-[20px]'
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
                className='h-[55px] w-full rounded-[10px] border border-gray-c4 bg-white px-[20px]'
                {...register('point', { required: '한줄 요약 포인트를 입력해주세요.' })}
              />
              {errors.point && <p className='ml-1 text-red'>{errors.point.message}</p>}
            </div>
            <div className='mb-[30px]'>
              <p className='mb-[11px] text-[18px]'>상세내용</p>
              <PageEditor />
            </div>
          </div>
          <button
            type='submit'
            className='mb-[40px] h-[46px] w-[382px] rounded-[10px] bg-blue-primary text-[16px] font-bold text-white duration-300 hover:bg-blue-hover'
          >
            등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default SiteRegistrationPage;
