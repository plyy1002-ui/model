
import React from 'react';

const WorksView: React.FC = () => {
  const mockWorks = [
    { id: 1, title: '春夏系列营销片', category: '视频生成', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80' },
    { id: 2, title: '品牌概念海报', category: '图像爆款', img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80' },
    { id: 3, title: '智能对话记录', category: '助理服务', img: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=500&q=80' },
    { id: 4, title: '好评发布合集', category: '营销辅助', img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=500&q=80' },
  ];

  return (
    <div className="bg-white p-6 pt-12">
      <header className="mb-12">
        <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase font-light mb-2">Portfolio</p>
        <h1 className="text-2xl font-serif tracking-widest">智能创作工坊</h1>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {mockWorks.map((work) => (
          <div key={work.id} className="group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden mb-3">
              <img 
                src={work.img} 
                alt={work.title} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110"
              />
            </div>
            <h3 className="text-[10px] tracking-widest uppercase font-medium">{work.title}</h3>
            <p className="text-[9px] text-gray-400 tracking-wider font-light mt-0.5">{work.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorksView;
