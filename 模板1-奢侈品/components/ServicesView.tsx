
import React from 'react';
import { TOOLS } from '../constants';

interface ServicesViewProps {
  onSelectTool: (id: string) => void;
}

const ServicesView: React.FC<ServicesViewProps> = ({ onSelectTool }) => {
  return (
    <div className="bg-white px-6 pt-12">
      <header className="mb-12">
        <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase font-light mb-2">Service Matrix</p>
        <h1 className="text-2xl font-serif tracking-widest">智能工具服务</h1>
      </header>

      <div className="space-y-12 mb-12">
        {TOOLS.map((tool) => (
          <div 
            key={tool.id} 
            className="group cursor-pointer"
            onClick={() => onSelectTool(tool.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full transition-colors group-hover:bg-black group-hover:text-white">
                  <i className={`fa-solid ${tool.icon} text-lg`}></i>
                </div>
                <div>
                  <h3 className="text-sm tracking-widest uppercase font-medium">{tool.name}</h3>
                  <p className="text-[10px] text-gray-400 tracking-wider font-light mt-0.5">{tool.description}</p>
                </div>
              </div>
              <i className="fa-solid fa-chevron-right text-gray-300 text-xs"></i>
            </div>
            <div className="h-[1px] w-full bg-gray-100 group-hover:bg-black transition-colors duration-500"></div>
          </div>
        ))}
      </div>

      <div className="bg-black p-8 text-center text-white mb-8">
        <h4 className="text-sm font-serif tracking-widest mb-2">定制化 AI 解决方案</h4>
        <p className="text-[10px] text-white/40 tracking-wider mb-6">联系我们的品牌顾问，开启专属您的智慧升级</p>
        <button className="border border-white/30 px-6 py-2 text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-colors">
          预约演示
        </button>
      </div>
    </div>
  );
};

export default ServicesView;
