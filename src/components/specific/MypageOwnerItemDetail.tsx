import { useState } from 'react';
import contentData from '../../data/content.json';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import BtnMypage from '../common/button/BtnMypage';

const MypageOwnerItemDetail = () => {
  const content = contentData;
  const [titleEditing, setTitleEditing] = useState<boolean>(false);
  const [descriptionEditing, setDescriptionEditing] = useState<boolean>(false);
  const [linkEditing, setLinkEditing] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>(content.title);
  const [descriptionValue, setDescriptionValue] = useState<string>(content.description);
  const [linkValue, setLinkValue] = useState<string>(content.link);
  return (
    <section className='mx-auto flex h-full w-[780px] flex-col items-center gap-4'>
      <div className='flex h-[300px] w-[400px] flex-col'>
        <img className='' src={content.image} alt={content.title} />
        <div className='flex justify-between p-1'>
          <div className='flex gap-2'>
            <span className='font-semibold'>조회</span>
            <span className='text-gray-46'>{content.viewCount} 회</span>
          </div>
          <div className='flex gap-2'>
            <span className='font-semibold'>찜</span>
            <span className='text-gray-46'>{content.likeCount} 명</span>
          </div>
        </div>
      </div>
      <form className='flex w-full flex-col gap-6'>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>사이트 이름</label>
          {titleEditing ? (
            <div className='flex w-full items-end border-b border-b-blue-primary p-1'>
              <input
                className='grow bg-white-f9 text-gray-46'
                type='text'
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
              />
              <BtnMypage className='w-[74px] p-1 text-xs' onClick={() => setTitleEditing(false)}>
                수정완료 &gt;
              </BtnMypage>
            </div>
          ) : (
            <div className='flex w-full items-end border-b border-b-gray-75 p-1'>
              <p className='grow text-gray-46'>{content.title}</p>
              <HiOutlinePencilSquare
                className='cursor-pointer text-lg text-gray-46'
                onClick={() => setTitleEditing(true)}
              />
            </div>
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>사이트 한 줄 요약</label>
          {descriptionEditing ? (
            <div className='flex w-full items-end border-b border-b-blue-primary p-1'>
              <input
                className='grow bg-white-f9 text-gray-46'
                type='text'
                value={descriptionValue}
                onChange={(e) => setDescriptionValue(e.target.value)}
              />
              <BtnMypage className='w-[74px] p-1 text-xs' onClick={() => setDescriptionEditing(false)}>
                수정완료 &gt;
              </BtnMypage>
            </div>
          ) : (
            <div className='flex w-full items-end border-b border-b-gray-75 p-1'>
              <p className='grow text-gray-46'>{content.description}</p>
              <HiOutlinePencilSquare
                className='cursor-pointer text-lg text-gray-46'
                onClick={() => setDescriptionEditing(true)}
              />
            </div>
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>사이트 링크</label>
          {linkEditing ? (
            <div className='flex w-full items-end border-b border-b-blue-primary p-1'>
              <input
                className='grow bg-white-f9 text-gray-46'
                type='text'
                value={linkValue}
                onChange={(e) => setLinkValue(e.target.value)}
              />
              <BtnMypage className='w-[74px] p-1 text-xs' onClick={() => setLinkEditing(false)}>
                수정완료 &gt;
              </BtnMypage>
            </div>
          ) : (
            <div className='flex w-full items-end border-b border-b-gray-75 p-1'>
              <p className='grow text-gray-46'>{content.link}</p>
              <HiOutlinePencilSquare
                className='cursor-pointer text-lg text-gray-46'
                onClick={() => setLinkEditing(true)}
              />
            </div>
          )}
        </div>
      </form>
    </section>
  );
};

export default MypageOwnerItemDetail;
