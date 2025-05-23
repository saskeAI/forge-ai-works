
import { useState } from 'react';
import { EmotionPoint } from './types';
import { EMOTION_COLORS, POSSIBLE_ARCHETYPES, EMOTION_TOOLTIPS, INITIAL_EMOTION_HISTORY } from './constants';
import { buildHistoryPath, buildHistoryPoints } from './graphUtils';
import { usePulseAnimation, useGraphAnimation } from './animationHooks';

// Эмоциональный паспорт hook
export const useEmotionalPassport = () => {
  // Состояния
  const [currentEmotion, setCurrentEmotion] = useState('Меланхолия');
  const [emotionScore, setEmotionScore] = useState(71);
  const [emotionHistory, setEmotionHistory] = useState<EmotionPoint[]>(INITIAL_EMOTION_HISTORY);
  const [archetype, setArchetype] = useState('Мудрец');
  const [archetypeSymbol, setArchetypeSymbol] = useState('🧙');
  const [ipfsHash, setIpfsHash] = useState('QmHash123');
  
  // Импортируем анимационные хуки
  const { pulseSize, pulseOpacity } = usePulseAnimation();
  const { graphProgress, resetAndAnimateGraph } = useGraphAnimation();
  
  // Получение текущих цветов для эмоции
  const getCurrentColors = () => {
    return EMOTION_COLORS[currentEmotion] || ['#6495ED', '#483D8B'];
  };
  
  // Массив возможных эмоций
  const possibleEmotions = Object.keys(EMOTION_COLORS);
  
  // Функция обновления эмоций
  const updateEmotions = () => {
    // Выбор случайной эмоции
    const newEmotion = possibleEmotions[Math.floor(Math.random() * possibleEmotions.length)];
    
    // Генерация случайного счета от 50 до 100
    const newScore = Math.floor(Math.random() * 51) + 50;
    
    // Добавление новой эмоции в историю
    const newDay = emotionHistory.length + 1;
    const newTooltip = EMOTION_TOOLTIPS[Math.floor(Math.random() * EMOTION_TOOLTIPS.length)];
    
    // Обновляем историю, сохраняя последние 5 эмоций
    const updatedHistory = [
      ...emotionHistory,
      { emotion: newEmotion, score: newScore, day: newDay, tooltip: newTooltip }
    ];
    if (updatedHistory.length > 5) {
      updatedHistory.shift();
    }
    
    // Случайный выбор архетипа
    const newArchetype = POSSIBLE_ARCHETYPES[Math.floor(Math.random() * POSSIBLE_ARCHETYPES.length)];
    
    // Обновление состояний
    setCurrentEmotion(newEmotion);
    setEmotionScore(newScore);
    setEmotionHistory(updatedHistory);
    setArchetype(newArchetype.name);
    setArchetypeSymbol(newArchetype.symbol);
    
    // Сброс и запуск анимации графика
    resetAndAnimateGraph();
    
    // Обновление IPFS хеша
    const randomHash = `QmHash${Math.floor(Math.random() * 1000) + 100}`;
    setIpfsHash(randomHash);
  };
  
  return {
    currentEmotion,
    emotionScore,
    emotionHistory,
    archetype,
    archetypeSymbol,
    ipfsHash,
    pulseSize,
    pulseOpacity,
    graphProgress,
    emotionColors: EMOTION_COLORS,
    getCurrentColors,
    updateEmotions,
    buildHistoryPath: () => buildHistoryPath(emotionHistory),
    buildHistoryPoints: () => buildHistoryPoints(emotionHistory)
  };
};
