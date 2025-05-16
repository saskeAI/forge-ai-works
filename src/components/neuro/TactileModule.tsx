
import React, { useEffect, useState } from 'react';

interface TactileModuleProps {
  active: boolean;
  sensation: {
    weight: number;
    texture: string;
    emotion: string;
  };
}

export const TactileModule: React.FC<TactileModuleProps> = ({ active, sensation }) => {
  const [pulse, setPulse] = useState<number>(1);
  
  // Create pulsing effect when active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (active) {
      interval = setInterval(() => {
        setPulse((prev) => (prev === 1 ? 1.1 : 1));
      }, 500);
    } else {
      setPulse(1);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [active]);

  // Get color based on emotional weight
  const getEmotionColor = () => {
    const weight = sensation.weight;
    if (weight < 3) return '#4ade80'; // Calm/light - green
    if (weight < 6) return '#2563eb'; // Medium - blue
    return '#ef4444';                 // Heavy/intense - red
  };
  
  return (
    <div className={`absolute left-[42%] top-[45%] transition-all duration-300 ${!active && 'opacity-30'}`}>
      <div 
        className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500"
        style={{
          backgroundColor: getEmotionColor(),
          opacity: active ? 0.8 : 0.3,
          transform: `scale(${pulse})`,
          boxShadow: active ? `0 0 20px ${getEmotionColor()}` : 'none'
        }}
      >
        <div className="absolute w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <div className="text-xs font-bold text-white">
            {Math.round(sensation.weight)}
          </div>
        </div>
      </div>
      
      {active && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-background/80 backdrop-blur-sm rounded-md border border-border p-2 shadow-sm w-32">
          <div className="text-[10px] text-center font-medium">Модуль осязаемости</div>
          <div className="text-[10px] mt-1 flex justify-between">
            <span>Вес:</span>
            <span>{sensation.weight}/10</span>
          </div>
          <div className="text-[10px] flex justify-between">
            <span>Текстура:</span>
            <span>{sensation.texture}</span>
          </div>
          <div className="text-[10px] flex justify-between">
            <span>Эмоция:</span>
            <span>{sensation.emotion}</span>
          </div>
        </div>
      )}
    </div>
  );
};
