
import React from 'react';

const MeView: React.FC = () => {
  const menuItems = [
    { label: '我的订阅计划', icon: 'fa-gem' },
    { label: '生成历史记录', icon: 'fa-clock-rotate-left' },
    { label: '品牌资产管理', icon: 'fa-folder-open' },
    { label: '企业 API 配置', icon: 'fa-key' },
    { label: '系统设置', icon: 'fa-gear' },
  ];

  return (
    <div className="bg-white px-6 pt-12">
      <div className="flex flex-col items-center mb-16">
        <div className="w-24 h-24 border border-black p-1 rounded-full mb-6">
          <img 
            src="https://picsum.photos/200/200" 
            alt="Profile" 
            className="w-full h-full object-cover rounded-full grayscale"
          />
        </div>
        <h2 className="text-lg font-serif tracking-[0.2em] mb-1">MARCUS CHEN</h2>
        <p className="text-[10px] tracking-widest text-gray-400 uppercase font-light">高级品牌主理人</p>
      </div>

      <div className="space-y-0 border-t border-gray-50">
        {menuItems.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between py-5 border-b border-gray-50 group cursor-pointer">
            <div className="flex items-center space-x-4">
              <i className={`fa-solid ${item.icon} text-gray-300 group-hover:text-black transition-colors`}></i>
              <span className="text-xs tracking-widest font-light text-gray-600 group-hover:text-black transition-colors">{item.label}</span>
            </div>
            <i className="fa-solid fa-chevron-right text-gray-200 text-[10px]"></i>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <button className="text-[10px] tracking-[0.4em] text-gray-300 uppercase font-light border-b border-transparent hover:border-gray-200 pb-1">
          退出当前账号
        </button>
      </div>
    </div>
  );
};

export default MeView;
