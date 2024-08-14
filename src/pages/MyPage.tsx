import { useState } from 'react';
import SideBar from '../components/common/SideBar';

const MyPage = () => {
  const items: string[] = ['찜 목록', '회원 정보', '권한 관리'];
  const [selectedItem, setSelectedItem] = useState(items[0]);

  return (
    <div className='flex'>
      <SideBar items={items} selectedItem={selectedItem} onSelectedItem={setSelectedItem} />
      <div className='grow'>
        {/* item은 목록이고, 선택한 목록을 selectedItem으로 관리합니다.
        selectedItem 값에 따라서 보여줄 컴포넌트 여기에 작성하시면 됩니다. */}
      </div>
    </div>
  );
};

export default MyPage;
