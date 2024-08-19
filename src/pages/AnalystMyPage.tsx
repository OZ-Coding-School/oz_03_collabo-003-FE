import { useState } from 'react';
import SideBar from '../components/common/SideBar';
import MypageAnalystRequest from '../components/specific/MypageAnalystRequest';

const AnalystMyPage = () => {
  const items: string[] = ['분석 신청하기', '분석 진행 현황', '분석가 정보'];
  const [selectedItem, setSelectedItem] = useState(items[0]);

  return (
    <div className='flex'>
      <SideBar items={items} selectedItem={selectedItem} onSelectedItem={setSelectedItem} />
      <div className='w-[calc(100vw-292px)] grow'>
        <div className='flex h-[calc(100vh-70px)] grow justify-center'>
          {selectedItem === '분석 신청하기' && <MypageAnalystRequest />}
        </div>
      </div>
    </div>
  );
};

export default AnalystMyPage;
