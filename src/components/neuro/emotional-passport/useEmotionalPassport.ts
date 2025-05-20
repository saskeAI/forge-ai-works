
import { useState, useEffect } from 'react';

// Эмоциональный паспорт hook
export const useEmotionalPassport = () => {
  // Состояния
  const [currentEmotion, setCurrentEmotion] = useState('Меланхолия');
  const [emotionScore, setEmotionScore] = useState(71);
  const [emotionHistory, setEmotionHistory] = useState([
    { emotion: 'Радость', score: 85, day: 1, tooltip: 'Успешная презентация проекта' },
    { emotion: 'Вдохновение', score: 92, day: 2, tooltip: 'Новая идея для NFT-коллекции' },
    { emotion: 'Спокойствие', score: 76, day: 3, tooltip: 'Медитация в метавселенной' },
    { emotion: 'Меланхолия', score: 71, day: 4, tooltip: 'Размышления о будущем Web3' },
  ]);
  const [archetype, setArchetype] = useState('Мудрец');
  const [archetypeSymbol, setArchetypeSymbol] = useState('🧙');
  const [ipfsHash, setIpfsHash] = useState('QmHash123');
  
  // Эффект пульсации эмо-ядра
  const [pulseSize, setPulseSize] = useState(60);
  const [pulseOpacity, setPulseOpacity] = useState(0.8);

  // Эффект анимации графика
  const [graphProgress, setGraphProgress] = useState(0);
  
  // Цвета для разных эмоций
  const emotionColors = {
    'Радость': ['#FFD700', '#FF8C00'],
    'Вдохновение': ['#7B68EE', '#4B0082'],
    'Спокойствие': ['#48D1CC', '#008080'],
    'Меланхолия': ['#6495ED', '#483D8B'],
    'Страсть': ['#FF4500', '#8B0000'],
    'Азарт': ['#00FF7F', '#006400'],
    'Гнев': ['#FF0000', '#8B0000'],
    'Умиротворение': ['#E6E6FA', '#9370DB'],
  };
  
  // Получение текущих цветов для эмоции
  const getCurrentColors = () => {
    return emotionColors[currentEmotion] || ['#6495ED', '#483D8B'];
  };
  
  // Массив возможных эмоций
  const possibleEmotions = Object.keys(emotionColors);
  
  // Массив возможных архетипов
  const possibleArchetypes = [
    { name: 'Мудрец', symbol: '🧙' },
    { name: 'Герой', symbol: '⚔️' },
    { name: 'Творец', symbol: '🎨' },
    { name: 'Исследователь', symbol: '🧭' },
    { name: 'Бунтарь', symbol: '⚡' },
    { name: 'Тень', symbol: '👤' },
  ];
  
  // Эффект анимации пульсации
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseSize(size => (size === 60 ? 70 : 60));
      setPulseOpacity(opacity => (opacity === 0.8 ? 0.6 : 0.8));
    }, 1500);
    
    return () => clearInterval(pulseInterval);
  }, []);
  
  // Эффект анимации графика при загрузке
  useEffect(() => {
    const timer = setTimeout(() => {
      setGraphProgress(100);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Функция обновления эмоций
  const updateEmotions = () => {
    // Выбор случайной эмоции
    const newEmotion = possibleEmotions[Math.floor(Math.random() * possibleEmotions.length)];
    
    // Генерация случайного счета от 50 до 100
    const newScore = Math.floor(Math.random() * 51) + 50;
    
    // Добавление новой эмоции в историю
    const newDay = emotionHistory.length + 1;
    const tooltips = [
      'Встреча с DAO-сообществом',
      'Торги на NFT-маркетплейсе',
      'Запуск нового токена',
      'Участие в хакатоне',
      'Медитация в метавселенной',
      'Обсуждение DeFi-протоколов'
    ];
    const newTooltip = tooltips[Math.floor(Math.random() * tooltips.length)];
    
    // Обновляем историю, сохраняя последние 5 эмоций
    const updatedHistory = [
      ...emotionHistory,
      { emotion: newEmotion, score: newScore, day: newDay, tooltip: newTooltip }
    ];
    if (updatedHistory.length > 5) {
      updatedHistory.shift();
    }
    
    // Случайный выбор архетипа
    const newArchetype = possibleArchetypes[Math.floor(Math.random() * possibleArchetypes.length)];
    
    // Обновление состояний
    setCurrentEmotion(newEmotion);
    setEmotionScore(newScore);
    setEmotionHistory(updatedHistory);
    setArchetype(newArchetype.name);
    setArchetypeSymbol(newArchetype.symbol);
    
    // Сброс и запуск анимации графика
    setGraphProgress(0);
    setTimeout(() => {
      setGraphProgress(100);
    }, 10);
    
    // Обновление IPFS хеша
    const randomHash = `QmHash${Math.floor(Math.random() * 1000) + 100}`;
    setIpfsHash(randomHash);
  };
  
  // Построение SVG-пути для графика истории эмоций
  const buildHistoryPath = () => {
    const width = 280;
    const height = 80;
    const padding = 10;
    
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
  const buildHistoryPoints = () => {
    const width = 280;
    const height = 80;
    const padding = 10;
    
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
    emotionColors,
    getCurrentColors,
    updateEmotions,
    buildHistoryPath,
    buildHistoryPoints
  };
};
