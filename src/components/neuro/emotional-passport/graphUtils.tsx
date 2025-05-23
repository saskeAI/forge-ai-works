
import React from 'react';
import { EmotionPoint } from './types';
import { GRAPH_DIMENSIONS } from './constants';

// Построение SVG-пути для графика истории эмоций
export const buildHistoryPath = (emotionHistory: EmotionPoint[]) => {
  const { width, height, padding } = GRAPH_DIMENSIONS;
  
  const availableWidth = width - 2 * padding;
  const availableHeight = height - 2 * padding;
  
  const xStep = availableWidth / (emotionHistory.length - 1);
  
  let path = '';
  emotionHistory.forEach((point, index) => {
    // Нормализация счета для графика (от 0 до availableHeight)
    const normalizedScore = ((point.score - 50) / 50) * availableHeight;
    const x = padding + index * xStep;
    const y = height - padding - normalizedScore;
    
    if (index === 0) {
      path += `M ${x},${y}`;
    } else {
      path += ` L ${x},${y}`;
    }
  });
  
  return path;
};

// Создание точек для графика с подсказками
export const buildHistoryPoints = (emotionHistory: EmotionPoint[]) => {
  const { width, height, padding } = GRAPH_DIMENSIONS;
  
  const availableWidth = width - 2 * padding;
  const availableHeight = height - 2 * padding;
  
  const xStep = availableWidth / (emotionHistory.length - 1);
  
  return emotionHistory.map((point, index) => {
    const normalizedScore = ((point.score - 50) / 50) * availableHeight;
    const x = padding + index * xStep;
    const y = height - padding - normalizedScore;
    
    return (
      <g key={index} className="point-group">
        <circle 
          cx={x} 
          cy={y} 
          r={4} 
          fill="white" 
        />
        
        <foreignObject 
          x={x - 60} 
          y={y - 40} 
          width={120} 
          height={30} 
          className="tooltip-wrapper"
        >
          <div className="tooltip">
            <div>{point.emotion}: {point.score}</div>
            <div>{point.tooltip}</div>
          </div>
        </foreignObject>
      </g>
    );
  });
};
