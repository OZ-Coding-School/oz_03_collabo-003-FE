import { useState } from 'react';
import SideBar from '../components/common/SideBar';

const MyPageOwner = () => {
  const items: string[] = ['사이트 관리', '의뢰자 정보'];
  const [selectedItem, setSelectedItem] = useState(items[0]);

  return (
    <div className='flex'>
      <SideBar items={items} selectedItem={selectedItem} onSelectedItem={setSelectedItem} />
      <div className='grow'></div>
    </div>
  );
};

export default MyPageOwner;
