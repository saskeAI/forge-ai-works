
import React from 'react';

interface EmotionalPassportFooterProps {
  ipfsHash: string;
  updateEmotions: () => void;
}

export const EmotionalPassportFooter: React.FC<EmotionalPassportFooterProps> = ({
  ipfsHash,
  updateEmotions
}) => {
  return (
    <>
      {/* IPFS ссылка */}
      <text 
        x="400" y="720" 
        fontFamily="'Segoe UI', sans-serif" 
        fontSize="16" 
        textAnchor="middle" 
        fill="white"
      >
        Отчет: ipfs://{ipfsHash}
      </text>
      
      {/* Кнопка обновления эмоций */}
      <g 
        transform="translate(400, 760)" 
        cursor="pointer" 
        onClick={updateEmotions}
      >
        <rect 
          x="-100" y="-25" 
          width="200" height="50" 
          rx="25" ry="25" 
          fill="rgba(20, 20, 40, 0.8)" 
          stroke="url(#emotionGradient)" 
          strokeWidth="2" 
        />
        <text 
          x="0" y="5" 
          fontFamily="'Segoe UI', sans-serif" 
          fontSize="16" 
          textAnchor="middle" 
          fill="white"
        >
          Обновить эмоции
        </text>
      </g>
    </>
  );
};
