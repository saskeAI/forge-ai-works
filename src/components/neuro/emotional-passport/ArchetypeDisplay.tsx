
import React from 'react';

interface ArchetypeDisplayProps {
  archetype: string;
  archetypeSymbol: string;
}

export const ArchetypeDisplay: React.FC<ArchetypeDisplayProps> = ({
  archetype,
  archetypeSymbol
}) => {
  return (
    <>
      {/* Архетип заголовок */}
      <text 
        x="400" y="590" 
        fontFamily="'Segoe UI', sans-serif" 
        fontSize="22" 
        textAnchor="middle" 
        fill="white"
      >
        Архетип: {archetype}
      </text>
      
      {/* Архетип визуализация */}
      <g transform="translate(400, 630)">
        <g transform="rotate(0)">
          <animate 
            attributeName="transform" 
            type="rotate" 
            from="0" 
            to="360" 
            dur="20s" 
            repeatCount="indefinite" 
          />
          
          <rect 
            x="-40" y="-40" 
            width="80" height="80" 
            transform="rotate(45)" 
            fill="url(#emotionGradient)" 
            opacity="0.6" 
            filter="url(#glow)" 
          />
        </g>
        
        <text 
          x="0" y="15" 
          fontFamily="'Segoe UI', sans-serif" 
          fontSize="40" 
          textAnchor="middle" 
          fill="white"
        >
          {archetypeSymbol}
        </text>
      </g>
    </>
  );
};
