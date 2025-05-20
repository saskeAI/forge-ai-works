
import React, { useState, useEffect } from 'react';
import { EmotionalPassportHeader } from './emotional-passport/EmotionalPassportHeader';
import { EmotionalCore } from './emotional-passport/EmotionalCore';
import { EmotionHistory } from './emotional-passport/EmotionHistory';
import { ArchetypeDisplay } from './emotional-passport/ArchetypeDisplay';
import { EmotionalPassportFooter } from './emotional-passport/EmotionalPassportFooter';
import { useEmotionalPassport } from './emotional-passport/useEmotionalPassport';

// Компонент для эмоционального SBT паспорта SASOK
export const EmotionalPassport: React.FC = () => {
  const { 
    currentEmotion, 
    emotionScore, 
    emotionHistory, 
    archetype,
    archetypeSymbol,
    ipfsHash,
    pulseSize,
    pulseOpacity,
    graphProgress,
    emotionColors,
    getCurrentColors,
    updateEmotions,
    buildHistoryPath,
    buildHistoryPoints
  } = useEmotionalPassport();
  
  // Текущие цвета эмоции
  const [color1, color2] = getCurrentColors();
  
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="relative overflow-hidden" style={{ width: '800px', height: '800px' }}>
        <svg width="800" height="800" viewBox="0 0 800 800">
          {/* Градиентные определения */}
          <defs>
            <radialGradient id="backgroundGradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#1a1a3a" />
              <stop offset="100%" stopColor="#0a0a1a" />
            </radialGradient>
            
            <linearGradient id="emotionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color1} />
              <stop offset="100%" stopColor={color2} />
            </linearGradient>
            
            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <pattern id="holographicLines" patternUnits="userSpaceOnUse" width="100" height="100" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="100" stroke="rgba(120, 200, 255, 0.1)" strokeWidth="1" />
              <line x1="20" y1="0" x2="20" y2="100" stroke="rgba(120, 200, 255, 0.07)" strokeWidth="1" />
              <line x1="40" y1="0" x2="40" y2="100" stroke="rgba(255, 120, 220, 0.05)" strokeWidth="1" />
              <line x1="60" y1="0" x2="60" y2="100" stroke="rgba(120, 200, 255, 0.07)" strokeWidth="1" />
              <line x1="80" y1="0" x2="80" y2="100" stroke="rgba(255, 120, 220, 0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          
          {/* Фон */}
          <rect width="800" height="800" fill="url(#backgroundGradient)" />
          <rect width="800" height="800" fill="url(#holographicLines)" />
          
          {/* Основная рамка */}
          <rect x="20" y="20" width="760" height="760" rx="15" ry="15" 
                fill="rgba(20, 20, 40, 0.8)" 
                stroke="rgba(120, 200, 255, 0.5)" 
                strokeWidth="2" />
          
          {/* Компоненты паспорта */}
          <EmotionalPassportHeader />
          
          <EmotionalCore 
            pulseSize={pulseSize} 
            pulseOpacity={pulseOpacity}
            currentEmotion={currentEmotion}
            emotionScore={emotionScore}
          />
          
          {/* Разделитель */}
          <line x1="150" y1="380" x2="650" y2="380" 
                stroke="rgba(120, 200, 255, 0.5)" 
                strokeWidth="1" 
                strokeDasharray="5,5" />
          
          <EmotionHistory 
            graphProgress={graphProgress}
            buildHistoryPath={buildHistoryPath}
            buildHistoryPoints={buildHistoryPoints}
          />
          
          {/* Разделитель */}
          <line x1="150" y1="550" x2="650" y2="550" 
                stroke="rgba(120, 200, 255, 0.5)" 
                strokeWidth="1" 
                strokeDasharray="5,5" />
          
          <ArchetypeDisplay 
            archetype={archetype} 
            archetypeSymbol={archetypeSymbol} 
          />
          
          {/* Разделитель */}
          <line x1="150" y1="680" x2="650" y2="680" 
                stroke="rgba(120, 200, 255, 0.5)" 
                strokeWidth="1" 
                strokeDasharray="5,5" />
          
          <EmotionalPassportFooter 
            ipfsHash={ipfsHash} 
            updateEmotions={updateEmotions} 
          />
          
          {/* Декоративные элементы */}
          <circle cx="50" cy="50" r="5" fill="url(#emotionGradient)" filter="url(#glow)" />
          <circle cx="750" cy="50" r="5" fill="url(#emotionGradient)" filter="url(#glow)" />
          <circle cx="50" cy="750" r="5" fill="url(#emotionGradient)" filter="url(#glow)" />
          <circle cx="750" cy="750" r="5" fill="url(#emotionGradient)" filter="url(#glow)" />
        </svg>
        
        <style>
          {`
          .point-group {
            cursor: pointer;
          }
          
          .tooltip-wrapper {
            visibility: hidden;
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
          }
          
          .point-group:hover .tooltip-wrapper {
            visibility: visible;
            opacity: 1;
          }
          
          .tooltip {
            background: rgba(10, 10, 30, 0.9);
            color: white;
            padding: 5px;
            border-radius: 5px;
            border: 1px solid rgba(120, 200, 255, 0.5);
            font-family: 'Segoe UI', sans-serif;
            font-size: 12px;
            text-align: center;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          `}
        </style>
      </div>
    </div>
  );
};
