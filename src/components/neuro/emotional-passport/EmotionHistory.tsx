
import React from 'react';

interface EmotionHistoryProps {
  graphProgress: number;
  buildHistoryPath: () => string;
  buildHistoryPoints: () => React.ReactNode;
}

export const EmotionHistory: React.FC<EmotionHistoryProps> = ({
  graphProgress,
  buildHistoryPath,
  buildHistoryPoints
}) => {
  return (
    <>
      {/* История эмоций заголовок */}
      <text 
        x="400" y="420" 
        fontFamily="'Segoe UI', sans-serif" 
        fontSize="22" 
        textAnchor="middle" 
        fill="white"
      >
        История эмоций
      </text>
      
      {/* График истории эмоций */}
      <g transform="translate(260, 440)">
        <rect 
          x="0" y="0" 
          width="280" height="80" 
          rx="5" ry="5" 
          fill="rgba(20, 20, 40, 0.5)" 
          stroke="rgba(120, 200, 255, 0.3)" 
          strokeWidth="1" 
        />
        
        {/* Ось X */}
        <line 
          x1="10" y1="70" x2="270" y2="70" 
          stroke="rgba(120, 200, 255, 0.5)" 
          strokeWidth="1" 
        />
        
        {/* Ось Y */}
        <line 
          x1="10" y1="10" x2="10" y2="70" 
          stroke="rgba(120, 200, 255, 0.5)" 
          strokeWidth="1" 
        />
        
        {/* График */}
        <path 
          d={buildHistoryPath()} 
          fill="none" 
          stroke="url(#emotionGradient)" 
          strokeWidth="2" 
          strokeDasharray="500"
          strokeDashoffset={500 - (500 * graphProgress / 100)}
          opacity="0.8"
          filter="url(#glow)" 
        />
        
        {/* Точки графика с подсказками */}
        {buildHistoryPoints()}
      </g>
    </>
  );
};
