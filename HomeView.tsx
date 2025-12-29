
import React, { useState, useEffect, useRef } from 'react';

interface HomeViewProps {
  onSelectService: () => void;
}

interface ProductCard {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  img: string;
}

const CARDS: ProductCard[] = [
  {
    id: 'profile',
    title: 'AI 我的档案',
    subtitle: 'DYNAMIC DIGITAL IDENTITY',
    desc: '您的专属数字资产，链接线上喜好与线下尊享体验。',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'viral',
    title: 'AI 一键爆款',
    subtitle: '2025/26 VISUAL REVOLUTION',
    desc: '用户传张图即可生成产品宣传视频，精准洞察社交媒体流量密码。',
    img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'assistant',
    title: 'AI 智能助理',
    subtitle: '24H CONCIERGE',
    desc: '您的24h在线客服，实时解答疑问，提供专业品牌咨询。',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'listing',
    title: '商品上架助手',
    subtitle: 'SMART LISTING',
    desc: '自动上架商品，智能判断营收趋势，优化店铺运营效率。',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'toy',
    title: '智能玩具配置',
    subtitle: 'AI PLAYGROUND',
    desc: '多种智能玩具配置方案，让您尽情探索AI的无限玩法。',
    img: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'video',
    title: 'AI 创作营销视频',
    subtitle: 'NARRATIVE GEN',
    desc: '一键生成专业营销视频，将品牌故事转化为动人的视觉语言。',
    img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'employee',
    title: '超级员工角色',
    subtitle: 'SUPER AGENTS',
    desc: '多种智能员工角色，满足您的各种业务需求与角色定制。',
    img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'review',
    title: 'AI 好评助手',
    subtitle: 'SOCIAL PROOF',
    desc: '一键生成高质量好评并完成发布，提升品牌口碑与转化。',
    img: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'canvas',
    title: '营销画布',
    subtitle: 'MARKETING CANVAS',
    desc: '深度理解品牌基因，自动构建全链路营销策略。',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop'
  }
];

const HomeView: React.FC<HomeViewProps> = ({ onSelectService }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartY = useRef(0);
  
  // 核心视觉参数
  const STACK_H = 80; 
  const BOTTOM_PADDING = 60; // 调低此值，使整体叠片位置更靠近屏幕底部

  const handleNext = () => {
    if (activeIndex < CARDS.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setActiveIndex(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setActiveIndex(prev => prev - 1);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 50) {
        if (e.deltaY > 0) handleNext();
        else handlePrev();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) > 60) {
        if (deltaY > 0) handleNext();
        else handlePrev();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeIndex, isAnimating]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden select-none">
      {CARDS.map((card, index) => {
        const offset = index - activeIndex;
        const vh = window.innerHeight;
        
        let y = 0;
        let scale = 1;
        let opacity = 1;
        let zIndex = 0;
        let imgParallax = 0;
        let textScale = 1;
        let contentOpacity = 0;
        let peekOpacity = 0;
        let maskOpacity = 0.5;

        if (offset === 0) {
          y = 0;
          zIndex = 100;
          contentOpacity = 1;
          imgParallax = 0;
          textScale = 1.4;
          maskOpacity = 0.3;
        } else if (offset === 1) {
          // 一级叠片 (靠近中间)
          y = vh - BOTTOM_PADDING - (2 * STACK_H);
          zIndex = 200;
          peekOpacity = 1;
          imgParallax = 120;
          maskOpacity = 0.7;
        } else if (offset === 2) {
          // 二级叠片 (靠近底部)
          y = vh - BOTTOM_PADDING - STACK_H;
          zIndex = 210;
          peekOpacity = 1;
          imgParallax = 180;
          maskOpacity = 0.8;
        } else if (offset < 0) {
          y = -vh;
          zIndex = 50;
          opacity = 0;
        } else {
          y = vh;
          zIndex = 0;
          opacity = 0;
        }

        return (
          <div
            key={card.id}
            onClick={() => offset > 0 && handleNext()}
            style={{
              transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
              zIndex,
              opacity,
              transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease',
            }}
            className="absolute inset-0 w-full h-full overflow-hidden bg-black shadow-[0_-40px_120px_rgba(0,0,0,0.9)] border-t border-white/5 cursor-pointer"
          >
            <div className="absolute inset-0 transition-transform duration-[1s] ease-out overflow-hidden">
               <img 
                src={card.img} 
                alt="" 
                style={{ transform: `translate3d(0, ${imgParallax}px, 0) scale(1.1)` }}
                className="w-full h-full object-cover transition-transform duration-[0.85s] ease-out brightness-90"
              />
            </div>
            
            <div 
              className="absolute inset-0 bg-black transition-opacity duration-700" 
              style={{ opacity: maskOpacity }} 
            />

            <div 
              style={{ 
                opacity: contentOpacity, 
                pointerEvents: offset === 0 ? 'auto' : 'none',
                visibility: contentOpacity > 0 ? 'visible' : 'hidden'
              }}
              className="absolute inset-0 flex flex-col justify-end items-center text-center p-12 pb-64 transition-opacity duration-500"
            >
              <div 
                style={{ transform: `scale(${textScale})` }}
                className="flex flex-col items-center mb-16 transition-transform duration-800 ease-out"
              >
                <p className="text-white/40 text-[9px] tracking-[0.6em] uppercase mb-4">
                  {card.subtitle}
                </p>
                <h3 className="text-white text-4xl font-serif tracking-[0.1em] leading-tight">
                  {card.title}
                </h3>
              </div>
              
              <button 
                onClick={(e) => { e.stopPropagation(); onSelectService(); }}
                className="border border-white/20 px-10 py-4 text-white text-[10px] tracking-[0.5em] uppercase hover:bg-white hover:text-black transition-all bg-black/40 backdrop-blur-md active:scale-95"
              >
                立即体验精品店
              </button>
            </div>

            <div 
              style={{ 
                opacity: peekOpacity,
                visibility: peekOpacity > 0 ? 'visible' : 'hidden',
                height: `${STACK_H}px`
              }}
              className={`absolute top-0 left-0 right-0 flex items-center justify-center transition-opacity duration-300 px-10`}
            >
              <div className="flex flex-col items-center text-center">
                <p className="text-white/30 text-[7px] tracking-[0.4em] uppercase mb-1 whitespace-nowrap">
                  {card.subtitle}
                </p>
                <h4 className="text-white/80 text-[10px] tracking-[0.5em] uppercase font-serif font-bold whitespace-nowrap">
                  {card.title}
                </h4>
              </div>
            </div>
          </div>
        );
      })}

      <div className="fixed top-14 left-0 right-0 z-[500] pointer-events-none flex flex-col items-center">
        <div className="text-[10px] tracking-[1.8em] text-white/30 uppercase font-light translate-x-4">MAISON AI</div>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent mt-8"></div>
      </div>

      <style>{`
        body { background-color: black; overflow: hidden; }
      `}</style>
    </div>
  );
};

export default HomeView;
