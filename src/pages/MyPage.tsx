import { useState } from 'react';
import SideBar from '../components/common/SideBar';
import MyPageCardContainer from '../components/specific/MyPageCardContainer';
import MyPageUserInfo from '../components/specific/MyPageUserInfo';

const MyPage = () => {
  const items: string[] = ['찜 목록', '회원 정보', '권한 관리'];
  const [selectedItem, setSelectedItem] = useState(items[0]);

  return (
    <div className='flex size-auto'>
      <SideBar items={items} selectedItem={selectedItem} onSelectedItem={setSelectedItem} />
      <div className='grow'>
        {selectedItem === '찜 목록' && <MyPageCardContainer layout='user' />}
        {selectedItem === '회원 정보' && <MyPageUserInfo />}
        {selectedItem === '권한 관리' && <div>권한 관리 컴포넌트</div>}
      </div>
    </div>
  );
};

export default MyPage;
