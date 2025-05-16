
import React, { useState, useEffect } from 'react';

// Компонент для эмоционального SBT паспорта SASOK
export const EmotionalPassport: React.FC = () => {
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
  const emotionColors: Record<string, string[]> = {
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
          
          {/* Заголовок */}
          <text x="400" y="70" 
                fontFamily="'Segoe UI', sans-serif" 
                fontSize="32" 
                fontWeight="bold"
                textAnchor="middle" 
                fill="white">
            Emotional SBT паспорт SASOK
          </text>
          
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
          <text x="400" y="300" 
                fontFamily="'Segoe UI', sans-serif" 
                fontSize="22" 
                textAnchor="middle" 
                fill="white">
            Текущее: {currentEmotion}
          </text>
          
          <text x="400" y="340" 
                fontFamily="'Segoe UI', sans-serif" 
                fontSize="28" 
                fontWeight="bold"
                textAnchor="middle" 
                fill="white">
            Счет: {emotionScore}
          </text>
          
          {/* Разделитель */}
          <line x1="150" y1="380" x2="650" y2="380" 
                stroke="rgba(120, 200, 255, 0.5)" 
                strokeWidth="1" 
                strokeDasharray="5,5" />
          
          {/* История эмоций заголовок */}
          <text x="400" y="420" 
                fontFamily="'Segoe UI', sans-serif" 
                fontSize="22" 
                textAnchor="middle" 
                fill="white">
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
            <line x1="10" y1="70" x2="270" y2="70" 
                  stroke="rgba(120, 200, 255, 0.5)" 
                  strokeWidth="1" />
            
            {/* Ось Y */}
            <line x1="10" y1="10" x2="10" y2="70" 
                  stroke="rgba(120, 200, 255, 0.5)" 
                  strokeWidth="1" />
            
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
          
          {/* Разделитель */}
          <line x1="150" y1="550" x2="650" y2="550" 
                stroke="rgba(120, 200, 255, 0.5)" 
                strokeWidth="1" 
                strokeDasharray="5,5" />
          
          {/* Архетип заголовок */}
          <text x="400" y="590" 
                fontFamily="'Segoe UI', sans-serif" 
                fontSize="22" 
                textAnchor="middle" 
                fill="white">
            Архетип: {archetype}
          </text>
          
          {/* Архетип визуализация */}
          <g transform="translate(400, 630)">
            <g>
              <rect x="-40" y="-40" 
                    width="80" height="80" 
                    transform="rotate(45)" 
                    fill="url(#emotionGradient)" 
                    opacity="0.6" 
                    filter="url(#glow)" />
            </g>
            
            <text 
              x="0" y="15" 
              fontFamily="'Segoe UI', sans-serif" 
              fontSize="40" 
              textAnchor="middle" 
              fill="white">
              {archetypeSymbol}
            </text>
          </g>
          
          {/* Разделитель */}
          <line x1="150" y1="680" x2="650" y2="680" 
                stroke="rgba(120, 200, 255, 0.5)" 
                strokeWidth="1" 
                strokeDasharray="5,5" />
          
          {/* IPFS ссылка */}
          <text x="400" y="720" 
                fontFamily="'Segoe UI', sans-serif" 
                fontSize="16" 
                textAnchor="middle" 
                fill="white">
            Отчет: ipfs://{ipfsHash}
          </text>
          
          {/* Кнопка обновления эмоций */}
          <g 
            transform="translate(400, 760)" 
            cursor="pointer" 
            onClick={() => updateEmotions()}
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
              fill="white">
              Обновить эмоции
            </text>
          </g>
          
          {/* Декоративные элементы */}
          <circle cx="50" cy="50" r="5" fill="url(#emotionGradient)" filter="url(#glow)" />
          <circle cx="750" cy="50" r="5" fill="url(#emotionGradient)" filter="url(#glow)" />
          <circle cx="50" cy="750" r="5" fill="url(#emotionGradient)" filter="url(#glow)" />
          <circle cx="750" cy="750" r="5" fill="url(#emotionGradient)" filter="url(#glow)" />
        </svg>
        
        <style jsx>{`
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
        `}</style>
      </div>
    </div>
  );
};
