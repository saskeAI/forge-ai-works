import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, Activity, Brain, BarChart2, Layers, Settings, Play, Pause, Save, RefreshCw } from 'lucide-react';
import { EmotionalPassport } from '@/components/neuro/EmotionalPassport';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

// Основные цвета эмоций
const EMOTION_COLORS = {
  joy: '#32CD32',       // Зеленый
  interest: '#FFA500',  // Оранжевый
  anger: '#FF0000',     // Красный
  fear: '#800080',      // Фиолетовый
  disgust: '#006400',   // Темно-зеленый
  sadness: '#0000FF',   // Синий
  surprise: '#FFFF00',  // Желтый
  shame: '#A52A2A'      // Коричневый
};

// Искусственные данные для демонстрации
const generateEmotionData = () => {
  return [
    { time: '00:00', joy: Math.random() * 100, interest: Math.random() * 100, anger: Math.random() * 60, fear: Math.random() * 50, disgust: Math.random() * 40, sadness: Math.random() * 70, surprise: Math.random() * 30, shame: Math.random() * 20 },
    { time: '00:01', joy: Math.random() * 100, interest: Math.random() * 100, anger: Math.random() * 60, fear: Math.random() * 50, disgust: Math.random() * 40, sadness: Math.random() * 70, surprise: Math.random() * 30, shame: Math.random() * 20 },
    { time: '00:02', joy: Math.random() * 100, interest: Math.random() * 100, anger: Math.random() * 60, fear: Math.random() * 50, disgust: Math.random() * 40, sadness: Math.random() * 70, surprise: Math.random() * 30, shame: Math.random() * 20 },
    { time: '00:03', joy: Math.random() * 100, interest: Math.random() * 100, anger: Math.random() * 60, fear: Math.random() * 50, disgust: Math.random() * 40, sadness: Math.random() * 70, surprise: Math.random() * 30, shame: Math.random() * 20 },
    { time: '00:04', joy: Math.random() * 100, interest: Math.random() * 100, anger: Math.random() * 60, fear: Math.random() * 50, disgust: Math.random() * 40, sadness: Math.random() * 70, surprise: Math.random() * 30, shame: Math.random() * 20 },
  ];
};

// Искусственные данные для поведенческих реакций
const behavioralResponses = [
  { type: 'Приближение', intensity: 78, source: 'Радость', timestamp: '12:32:45' },
  { type: 'Избегание', intensity: 65, source: 'Страх', timestamp: '12:32:47' },
  { type: 'Противостояние', intensity: 82, source: 'Гнев', timestamp: '12:32:50' },
  { type: 'Замирание', intensity: 45, source: 'Удивление', timestamp: '12:32:52' },
  { type: 'Социальное восстановление', intensity: 39, source: 'Стыд', timestamp: '12:32:55' },
];

// Главный компонент приложения
const SasokInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [emotionData, setEmotionData] = useState(generateEmotionData());
  const [isRunning, setIsRunning] = useState(true);
  const [threshold, setThreshold] = useState(65);
  const [activeModule, setActiveModule] = useState(1);
  const [showPassport, setShowPassport] = useState(false);

  // Эффект для обновления данных в реальном времени
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setEmotionData(prev => {
          const newData = [...prev];
          newData.shift();
          newData.push({
            time: `00:0${parseInt(prev[prev.length-1].time.split(':')[1]) + 1}`,
            joy: Math.random() * 100,
            interest: Math.random() * 100,
            anger: Math.random() * 60,
            fear: Math.random() * 50,
            disgust: Math.random() * 40,
            sadness: Math.random() * 70,
            surprise: Math.random() * 30,
            shame: Math.random() * 20
          });
          return newData;
        });
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Получение доминирующей эмоции
  const getDominantEmotion = () => {
    const lastData = emotionData[emotionData.length - 1];
    let max = 0;
    let dominant = '';
    
    Object.keys(EMOTION_COLORS).forEach(emotion => {
      const value = lastData[emotion as keyof typeof lastData];
      // Убедимся, что мы работаем с числом
      const numericValue = typeof value === 'number' ? value : 0;
      if (numericValue > max) {
        max = numericValue;
        dominant = emotion;
      }
    });
    
    return { emotion: dominant, value: max };
  };

  const dominant = getDominantEmotion();

  // Рендеринг вкладки дашборда
  const renderDashboard = () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 bg-gray-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Эмоциональное Эхо (Реальное время)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={emotionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
            {Object.keys(EMOTION_COLORS).map(emotion => (
              <Line 
                key={emotion} 
                type="monotone" 
                dataKey={emotion} 
                stroke={EMOTION_COLORS[emotion as keyof typeof EMOTION_COLORS]} 
                activeDot={{ r: 8 }} 
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Доминирующая эмоция</h3>
        <div className="flex flex-col items-center">
          <div 
            className="w-32 h-32 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4"
            style={{ backgroundColor: EMOTION_COLORS[dominant.emotion as keyof typeof EMOTION_COLORS] }}
          >
            {dominant.emotion.toUpperCase()}
          </div>
          <div className="text-xl font-bold">{Math.round(dominant.value)}%</div>
          <div className="mt-2 text-sm text-gray-600">
            {dominant.value > threshold ? 'Превышает порог активации' : 'Ниже порога активации'}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Поведенческие реакции</h3>
        <div className="overflow-y-auto h-64">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200 text-left">Тип</th>
                <th className="py-2 px-4 bg-gray-200 text-left">Источник</th>
                <th className="py-2 px-4 bg-gray-200 text-left">Интенсивность</th>
                <th className="py-2 px-4 bg-gray-200 text-left">Время</th>
              </tr>
            </thead>
            <tbody>
              {behavioralResponses.map((response, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-2 px-4">{response.type}</td>
                  <td className="py-2 px-4">{response.source}</td>
                  <td className="py-2 px-4">{response.intensity}%</td>
                  <td className="py-2 px-4">{response.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="col-span-2 bg-gray-100 p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Эмоциональный SBT паспорт</h3>
          <button 
            onClick={() => setShowPassport(!showPassport)} 
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded hover:opacity-90"
          >
            {showPassport ? 'Скрыть' : 'Показать'} паспорт
          </button>
        </div>
        {showPassport && (
          <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
            <EmotionalPassport />
          </div>
        )}
      </div>
    </div>
  );

  // Рендеринг вкладки анализа эмоций
  const renderEmotionAnalysis = () => {
    const currentEmotions = emotionData[emotionData.length - 1];
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Текущее состояние эмоций</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[currentEmotions]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.keys(EMOTION_COLORS).map(emotion => (
                <Bar key={emotion} dataKey={emotion} fill={EMOTION_COLORS[emotion as keyof typeof EMOTION_COLORS]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="col-span-2 bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Эмоциональная карта</h3>
          <div className="relative h-96 border border-gray-300 rounded">
            {/* Здесь будет эмоциональный куб, используем пока заглушку */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gray-200 rounded p-4 text-center">
                <div className="text-lg font-semibold">3D Эмоциональный куб</div>
                <div className="text-sm text-gray-600 mt-2">Визуализация текущего эмоционального состояния в трехмерном пространстве</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Рендеринг вкладки модулей
  const renderModules = () => (
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map(module => (
        <div 
          key={module} 
          className={`p-4 rounded-lg shadow cursor-pointer ${activeModule === module ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100'}`}
          onClick={() => setActiveModule(module)}
        >
          <div className="flex items-center mb-2">
            <div className={`w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mr-2`}>{module}</div>
            <h3 className="text-lg font-semibold">Модуль {module}</h3>
          </div>
          <p className="text-sm text-gray-600">
            {module === 1 && 'Система первичного эмоционального анализа'}
            {module === 2 && 'Эмоциональный классификатор'}
            {module === 3 && 'Система поведенческого отклика'}
            {module === 4 && 'Адаптивный контур обратной связи'}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="bg-white p-2 rounded border border-gray-300 text-sm">
              <div className="font-semibold mb-1">Статус:</div>
              <span className="text-green-500">Активен</span>
            </div>
            <div className="bg-white p-2 rounded border border-gray-300 text-sm">
              <div className="font-semibold mb-1">Загрузка:</div>
              <span>{Math.floor(Math.random() * 40) + 60}%</span>
            </div>
            <div className="bg-white p-2 rounded border border-gray-300 text-sm">
              <div className="font-semibold mb-1">Латентность:</div>
              <span>{Math.floor(Math.random() * 10) + 5} мс</span>
            </div>
            <div className="bg-white p-2 rounded border border-gray-300 text-sm">
              <div className="font-semibold mb-1">Точность:</div>
              <span>{Math.floor(Math.random() * 15) + 85}%</span>
            </div>
          </div>
        </div>
      ))}
      
      <div className="col-span-2 bg-gray-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Детализация модуля {activeModule}</h3>
        <div className="bg-white p-4 rounded border border-gray-300">
          <h4 className="font-semibold mb-2">
            {activeModule === 1 && 'Система первичного эмоционального анализа'}
            {activeModule === 2 && 'Эмоциональный классификатор'}
            {activeModule === 3 && 'Система поведенческого отклика'}
            {activeModule === 4 && 'Адаптивный контур обратной связи'}
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            {activeModule === 1 && 'Анализирует первичные сигналы и идентифицирует базовые эмоциональные компоненты.'}
            {activeModule === 2 && 'Классифицирует эмоциональные состояния на основе комбинации первичных сигналов.'}
            {activeModule === 3 && 'Преобразует эмоциональные состояния в поведенческие команды и реакции.'}
            {activeModule === 4 && 'Настраивает систему на основе обратной связи и улучшает точность классификации.'}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold mb-2">Параметры модуля</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Чувствительность:</span>
                  <span className="text-sm font-semibold">{Math.floor(Math.random() * 30) + 70}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Скорость обработки:</span>
                  <span className="text-sm font-semibold">{Math.floor(Math.random() * 50) + 150} мс</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Приоритет:</span>
                  <span className="text-sm font-semibold">Высокий</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Действия</h5>
              <div className="space-y-2">
                <button className="w-full bg-blue-500 text-white py-1 px-2 rounded text-sm">Перезагрузить модуль</button>
                <button className="w-full bg-gray-500 text-white py-1 px-2 rounded text-sm">Калибровать</button>
                <button className="w-full bg-green-500 text-white py-1 px-2 rounded text-sm">Оптимизировать</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Рендеринг вкладки настроек
  const renderSettings = () => (
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Настройки системы SASOK</h3>
        
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Пороговые значения</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium">Порог активации эмоции ({threshold}%)</label>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={threshold} 
                onChange={(e) => setThreshold(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium">Чувствительность системы</label>
                <span className="text-sm">75%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="75" 
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium">Скорость обработки данных</label>
                <span className="text-sm">Высокая</span>
              </div>
              <select className="w-full p-2 border border-gray-300 rounded">
                <option>Низкая</option>
                <option>Средняя</option>
                <option selected>Высокая</option>
                <option>Максимальная</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Модули системы</h4>
          <div className="space-y-2">
            {['Модуль первичного анализа', 'Эмоциональный классификатор', 'Система поведенческого отклика', 'Адаптивный контур'].map((module) => (
              <div key={module} className="flex items-center justify-between bg-white p-2 rounded border border-gray-300">
                <span>{module}</span>
                <div className="flex items-center">
                  <span className="text-green-500 text-sm mr-2">Активен</span>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Параметры вывода данных</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <input id="export-csv" type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
              <label htmlFor="export-csv" className="ms-2 text-sm font-medium">Экспорт данных в CSV</label>
            </div>
            <div className="flex items-center">
              <input id="realtime-proc" type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
              <label htmlFor="realtime-proc" className="ms-2 text-sm font-medium">Обработка данных в реальном времени</label>
            </div>
            <div className="flex items-center">
              <input id="log-save" type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
              <label htmlFor="log-save" className="ms-2 text-sm font-medium">Сохранение лога событий</label>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-2">
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Применить настройки</button>
          <button className="bg-gray-500 text-white py-2 px-4 rounded">Сбросить по умолчанию</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <header className="bg-gradient-to-r from-blue-800 to-purple-800 text-white p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain size={36} />
              <div className="ml-4">
                <h1 className="text-2xl font-bold">SASOK</h1>
                <p className="text-sm">Система Анализа и Синтеза Эмоционального Отклика в Контексте</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className={`rounded-full h-10 w-10 flex items-center justify-center ${isRunning ? 'bg-red-500' : 'bg-green-500'}`}
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center">
                <Save size={20} />
              </button>
              <button className="bg-purple-600 rounded-full h-10 w-10 flex items-center justify-center">
                <RefreshCw size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto">
          <div className="flex">
            <button 
              className={`py-3 px-6 flex items-center ${activeTab === 'dashboard' ? 'bg-blue-700' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <Activity size={18} className="mr-2" />
              Дашборд
            </button>
            <button 
              className={`py-3 px-6 flex items-center ${activeTab === 'emotion-analysis' ? 'bg-blue-700' : ''}`}
              onClick={() => setActiveTab('emotion-analysis')}
            >
              <BarChart2 size={18} className="mr-2" />
              Анализ эмоций
            </button>
            <button 
              className={`py-3 px-6 flex items-center ${activeTab === 'modules' ? 'bg-blue-700' : ''}`}
              onClick={() => setActiveTab('modules')}
            >
              <Layers size={18} className="mr-2" />
              Модули
            </button>
            <button 
              className={`py-3 px-6 flex items-center ${activeTab === 'settings' ? 'bg-blue-700' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={18} className="mr-2" />
              Настройки
            </button>
          </div>
        </div>
      </nav>
    
      <main className="container mx-auto p-4">
        <div className="p-4">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'emotion-analysis' && renderEmotionAnalysis()}
          {activeTab === 'modules' && renderModules()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-300 py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
            <span className="text-sm">{isRunning ? 'Система активна' : 'Система приостановлена'}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm">Модуль 1: <span className="text-green-500">ОК</span></div>
            <div className="text-sm">Модуль 2: <span className="text-green-500">ОК</span></div>
            <div className="text-sm">Модуль 3: <span className="text-green-500">ОК</span></div>
            <div className="text-sm">Модуль 4: <span className="text-green-500">ОК</span></div>
          </div>
          <div className="text-sm">v1.0.0 | ID: SASOK-NEVEOGAK-2025</div>
        </div>
      </div>
    </div>
  );
};

export default SasokInterface;
