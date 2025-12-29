
import React from 'react';
import { TabType } from '../types';

interface TabBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: '首页', icon: 'fa-house' },
    { id: 'services', label: '工作台', icon: 'fa-briefcase' },
    { id: 'me', label: '我的', icon: 'fa-user' },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] z-[1000] pointer-events-none">
      <nav className="bg-black/60 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center space-y-1 transition-all duration-500 relative ${
              activeTab === tab.id ? 'text-white' : 'text-white/40'
            }`}
          >
            <i className={`fa-solid ${tab.icon} text-base`}></i>
            <span className="text-[8px] font-medium tracking-[0.2em] uppercase">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabBar;
