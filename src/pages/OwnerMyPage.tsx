import { useState } from 'react';
import SideBar from '../components/common/SideBar';
import MyPageCardContainer from '../components/specific/MyPageCardContainer';
import MypageOwnerInfo from '../components/specific/MypageOwnerInfo';

const OwnerMyPage = () => {
  const items: string[] = ['사이트 관리', '의뢰자 정보'];
  const [selectedItem, setSelectedItem] = useState(items[0]);

  return (
    <div className='flex'>
      <SideBar items={items} selectedItem={selectedItem} onSelectedItem={setSelectedItem} />
      <div className='w-[calc(100vw-292px)] grow'>
        <div className='flex h-[calc(100vh-70px)] grow justify-center'>
          {selectedItem === '사이트 관리' && <MyPageCardContainer layout='client' />}
          {selectedItem === '의뢰자 정보' && <MypageOwnerInfo onSelectedItem={setSelectedItem} />}
        </div>
      </div>
    </div>
  );
};

export default OwnerMyPage;
