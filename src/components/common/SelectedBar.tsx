import React, { useState } from 'react';

interface Tab {
  label: string;
  id: string;
}

interface SelectedBarProps {
  tabs: Tab[];
  defaultSelected?: string;
  onTabSelect?: (selectedTabId: string) => void;
  className?: string;
}

const SelectedBar: React.FC<SelectedBarProps> = ({ tabs, defaultSelected, onTabSelect, className = '' }) => {
  const [selectedTab, setSelectedTab] = useState<string>(defaultSelected || tabs[0].id);

  const handleTabClick = (tabId: string) => {
    setSelectedTab(tabId);
    if (onTabSelect) {
      onTabSelect(tabId);
    }
  };

  return (
    <div className={`relative flex w-full border-b border-gray-c4 ${className}`}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`flex-1 cursor-pointer py-2 text-center ${
            tab.id === selectedTab ? 'font-bold text-black' : 'text-gray-db'
          }`}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </div>
      ))}
      <div
        className='absolute bottom-0 h-[2px] bg-black transition-all duration-300'
        style={{
          width: `${100 / tabs.length}%`,
          left: `${(tabs.findIndex((tab) => tab.id === selectedTab) * 100) / tabs.length}%`,
        }}
      />
    </div>
  );
};

export default SelectedBar;
