
import React, { useState } from 'react';
import { TOOLS } from '../constants';
import { geminiService } from '../services/geminiService';

interface ToolDetailViewProps {
  toolId: string;
  onBack: () => void;
}

const ToolDetailView: React.FC<ToolDetailViewProps> = ({ toolId, onBack }) => {
  const tool = TOOLS.find(t => t.id === toolId);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [input, setInput] = useState('');

  if (!tool) return null;

  const handleAction = async () => {
    setLoading(true);
    try {
      if (tool.id === 'review-assistant') {
        const data = await geminiService.generateReviews(input);
        setResult(data.reviews);
      } else if (tool.id === 'ai-assistant') {
        const res = await geminiService.chatWithAssistant(input);
        setResult(res);
      } else {
        // Generic mock for others
        await new Promise(r => setTimeout(r, 1500));
        setResult("功能演示：AI 正在处理您的请求...");
      }
    } catch (e) {
      console.error(e);
      setResult("操作失败，请重试。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-full">
      <nav className="flex items-center justify-between p-6 border-b border-gray-50">
        <button onClick={onBack} className="text-gray-400 hover:text-black">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <span className="text-[10px] tracking-[0.3em] font-medium uppercase">{tool.name}</span>
        <div className="w-4"></div>
      </nav>

      <div className="p-8">
        <div className="mb-12 text-center">
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <i className={`fa-solid ${tool.icon} text-2xl`}></i>
          </div>
          <h2 className="text-xl font-serif tracking-widest mb-2">{tool.name}</h2>
          <p className="text-xs text-gray-400 font-light">{tool.description}</p>
        </div>

        <div className="space-y-8">
          {tool.id === 'ai-viral-video' || tool.id === 'marketing-video' ? (
            <div className="space-y-4">
              <label className="block text-[10px] tracking-widest uppercase font-medium text-gray-400">上传原始素材</label>
              <div className="border-2 border-dashed border-gray-100 rounded-lg p-12 flex flex-col items-center justify-center space-y-4 cursor-pointer hover:border-black transition-colors">
                <i className="fa-solid fa-cloud-arrow-up text-2xl text-gray-200"></i>
                <span className="text-[10px] tracking-widest uppercase text-gray-400">选择图片或视频文件</span>
                <input type="file" className="hidden" />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-[10px] tracking-widest uppercase font-medium text-gray-400">输入需求详情</label>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="在此输入您的内容描述..."
                className="w-full border-b border-gray-200 py-2 focus:border-black focus:outline-none transition-colors text-sm font-light min-h-[100px]"
              />
            </div>
          )}

          <button 
            onClick={handleAction}
            disabled={loading}
            className="w-full bg-black text-white py-4 text-xs tracking-[0.2em] uppercase font-light hover:bg-gray-900 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'AI 处理中...' : '启动智能生成'}
          </button>

          {result && (
            <div className="mt-12 p-6 bg-gray-50 border border-gray-100 rounded-lg">
              <p className="text-[10px] tracking-widest uppercase font-bold mb-4">生成结果</p>
              <div className="text-sm text-gray-600 leading-relaxed font-light whitespace-pre-wrap">
                {Array.isArray(result) ? (
                  <ul className="space-y-4">
                    {result.map((r, i) => (
                      <li key={i} className="pb-4 border-b border-gray-100 last:border-0 italic">"{r}"</li>
                    ))}
                  </ul>
                ) : (
                  <p>{result}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolDetailView;
