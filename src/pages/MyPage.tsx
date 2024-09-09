import { useEffect, useState } from 'react';
import SideBar from '../components/common/SideBar';
import MyPageCardContainer from '../components/specific/MyPageCardContainer';
import MyPageUserInfo from '../components/specific/MyPageUserInfo';
import MyPageAuthz from '../components/specific/MyPageAuthz';
import { useAuthStore } from '../store/store';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const items: string[] = ['찜 목록', '회원 정보', '권한 관리'];
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      return navigate('/');
    }
  }, []);

  return (
    <div className='flex size-auto'>
      <SideBar items={items} selectedItem={selectedItem} onSelectedItem={setSelectedItem} />
      <div className='w-[calc(100vw-292px)] grow'>
        <div className='flex h-[calc(100vh-70px)] grow justify-center'>
          {selectedItem === '찜 목록' && <MyPageCardContainer layout='user' />}
          {selectedItem === '회원 정보' && <MyPageUserInfo />}
          {selectedItem === '권한 관리' && <MyPageAuthz />}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
