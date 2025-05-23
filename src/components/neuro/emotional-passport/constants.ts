
import { EmotionColorMap, Archetype } from './types';

// Цвета для разных эмоций
export const EMOTION_COLORS: EmotionColorMap = {
  'Радость': ['#FFD700', '#FF8C00'],
  'Вдохновение': ['#7B68EE', '#4B0082'],
  'Спокойствие': ['#48D1CC', '#008080'],
  'Меланхолия': ['#6495ED', '#483D8B'],
  'Страсть': ['#FF4500', '#8B0000'],
  'Азарт': ['#00FF7F', '#006400'],
  'Гнев': ['#FF0000', '#8B0000'],
  'Умиротворение': ['#E6E6FA', '#9370DB'],
};

// Массив возможных архетипов
export const POSSIBLE_ARCHETYPES: Archetype[] = [
  { name: 'Мудрец', symbol: '🧙' },
  { name: 'Герой', symbol: '⚔️' },
  { name: 'Творец', symbol: '🎨' },
  { name: 'Исследователь', symbol: '🧭' },
  { name: 'Бунтарь', symbol: '⚡' },
  { name: 'Тень', symbol: '👤' },
];

// Возможные подсказки для эмоций
export const EMOTION_TOOLTIPS: string[] = [
  'Встреча с DAO-сообществом',
  'Торги на NFT-маркетплейсе',
  'Запуск нового токена',
  'Участие в хакатоне',
  'Медитация в метавселенной',
  'Обсуждение DeFi-протоколов'
];

// Начальные данные истории эмоций
export const INITIAL_EMOTION_HISTORY = [
  { emotion: 'Радость', score: 85, day: 1, tooltip: 'Успешная презентация проекта' },
  { emotion: 'Вдохновение', score: 92, day: 2, tooltip: 'Новая идея для NFT-коллекции' },
  { emotion: 'Спокойствие', score: 76, day: 3, tooltip: 'Медитация в метавселенной' },
  { emotion: 'Меланхолия', score: 71, day: 4, tooltip: 'Размышления о будущем Web3' },
];

// Размеры для графика
export const GRAPH_DIMENSIONS = {
  width: 280,
  height: 80,
  padding: 10
};
