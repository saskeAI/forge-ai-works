
import React from 'react';

interface EmotionalCoreProps {
  pulseSize: number;
  pulseOpacity: number;
  currentEmotion: string;
  emotionScore: number;
}

export const EmotionalCore: React.FC<EmotionalCoreProps> = ({
  pulseSize,
  pulseOpacity,
  currentEmotion,
  emotionScore
}) => {
  return (
    <>
      {/* Эмо-ядро */}
      <g transform="translate(400, 200)">
        <circle 
          r={pulseSize} 
          fill="url(#emotionGradient)" 
          opacity={pulseOpacity}
          filter="url(#glow)" 
        />
        <circle r="40" fill="url(#emotionGradient)" filter="url(#glow)" />
      </g>
      
      {/* Текущая эмоция и счет */}
      <text 
        x="400" y="300" 
        fontFamily="'Segoe UI', sans-serif" 
        fontSize="22" 
        textAnchor="middle" 
        fill="white"
      >
        Текущее: {currentEmotion}
      </text>
      
      <text 
        x="400" y="340" 
        fontFamily="'Segoe UI', sans-serif" 
        fontSize="28" 
        fontWeight="bold"
        textAnchor="middle" 
        fill="white"
      >
        Счет: {emotionScore}
      </text>
    </>
  );
};
