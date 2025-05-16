
import React, { useState, useEffect, useRef } from 'react';
import { Brain, Waves, CircleDot } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { TactileModule } from './TactileModule';
import { BrainRegions } from './BrainRegions';
import { InputFlow } from './InputFlow';

interface RequestData {
  text: string;
  timestamp: number;
  emotionalWeight: number;
  complexity: number;
  familiarity: number;
}

export const NeuralAwarenessMap: React.FC = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeRegions, setActiveRegions] = useState<string[]>([]);
  const [currentRequest, setCurrentRequest] = useState<RequestData | null>(null);
  const [inputFlowActive, setInputFlowActive] = useState<boolean>(false);
  const [tactileSensation, setTactileSensation] = useState<{
    weight: number;
    texture: string;
    emotion: string;
  }>({ weight: 0, texture: 'нейтральный', emotion: 'нейтральный' });
  
  // Sample requests to simulate
  const sampleRequests = [
    {
      text: "Расскажи про модели машинного обучения",
      emotionalWeight: 0.3,
      complexity: 0.7,
      familiarity: 0.8
    },
    {
      text: "Мне страшно, что ИИ заменит людей",
      emotionalWeight: 0.9,
      complexity: 0.5,
      familiarity: 0.6
    },
    {
      text: "Рассчитай оптимальную траекторию полета к Марсу",
      emotionalWeight: 0.2,
      complexity: 0.95,
      familiarity: 0.3
    }
  ];

  // Simulates the brain processing a request
  const processRequest = () => {
    setIsProcessing(true);
    setActiveRegions([]);
    setInputFlowActive(true);
    
    // Random sample request
    const request = sampleRequests[Math.floor(Math.random() * sampleRequests.length)];
    const requestData = {
      ...request,
      timestamp: Date.now()
    };
    
    setCurrentRequest(requestData);
    
    // Sequence of brain region activations
    setTimeout(() => {
      setActiveRegions(['attention']);
      toast({
        title: "Активация зоны внимания",
        description: "Запрос поступил в систему обработки"
      });
    }, 1000);
    
    setTimeout(() => {
      setActiveRegions(['attention', 'language']);
      toast({
        title: "Лингвистический анализ",
        description: "Обработка естественного языка и синтаксиса"
      });
    }, 2000);
    
    setTimeout(() => {
      setActiveRegions(['attention', 'language', 'memory']);
      toast({
        title: "Доступ к памяти",
        description: "Поиск релевантной информации в базе знаний"
      });
    }, 3000);
    
    setTimeout(() => {
      setActiveRegions(['attention', 'language', 'memory', 'emotion']);
      toast({
        title: "Эмоциональная оценка",
        description: "Анализ эмоционального контекста запроса"
      });
      
      // Set tactile sensation based on request attributes
      setTactileSensation({
        weight: requestData.emotionalWeight * 10,
        texture: requestData.complexity > 0.7 ? "сложный" : "простой",
        emotion: requestData.emotionalWeight > 0.6 ? "тревожный" : "спокойный"
      });
    }, 4000);
    
    setTimeout(() => {
      setActiveRegions(['integration']);
      toast({
        title: "Интеграция информации",
        description: "Формирование целостного ответа на запрос"
      });
    }, 5000);
    
    setTimeout(() => {
      setIsProcessing(false);
      setInputFlowActive(false);
      toast({
        title: "Обработка завершена",
        description: "Ответ сформирован и готов к выдаче"
      });
    }, 6000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain size={20} />
          Карта нейроосознания запроса
        </CardTitle>
        <CardDescription>
          Визуализация работы искусственного мозга при обработке информации
        </CardDescription>
      </CardHeader>
      <CardContent className="relative p-0 overflow-hidden">
        <div className="relative h-[400px] bg-black/5 dark:bg-white/5 rounded-md overflow-hidden">
          {/* Brain visualization */}
          <BrainRegions activeRegions={activeRegions} />
          
          {/* Input flow animation */}
          {inputFlowActive && <InputFlow />}
          
          {/* Tactile module visualization */}
          <TactileModule 
            active={activeRegions.includes('emotion')} 
            sensation={tactileSensation}
          />
          
          {/* Current request display */}
          {currentRequest && (
            <div className="absolute top-4 left-4 right-4 p-3 bg-background/80 backdrop-blur-sm rounded-md border border-border shadow-sm">
              <div className="flex items-center justify-between">
                <div className="font-medium">Текущий запрос:</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(currentRequest.timestamp).toLocaleTimeString()}
                </div>
              </div>
              <div className="mt-1 text-sm">{currentRequest.text}</div>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  Эмоц: {Math.round(currentRequest.emotionalWeight * 100)}%
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Сложн: {Math.round(currentRequest.complexity * 100)}%
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Знаком: {Math.round(currentRequest.familiarity * 100)}%
                </Badge>
              </div>
            </div>
          )}
          
          {!isProcessing && !currentRequest && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Brain size={48} className="text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center px-4">
                Нажмите на кнопку "Симулировать обработку запроса" чтобы увидеть работу нейросети
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={() => {
            setCurrentRequest(null);
            setActiveRegions([]);
            setTactileSensation({ weight: 0, texture: 'нейтральный', emotion: 'нейтральный' });
          }}
          disabled={isProcessing || !currentRequest}
        >
          Сбросить
        </Button>
        <Button 
          onClick={processRequest} 
          disabled={isProcessing}
          className={isProcessing ? "bg-gradient-to-r from-nova-600 to-forge-500" : ""}
        >
          {isProcessing ? (
            <>
              <Waves className="mr-2 animate-pulse" size={18} />
              Обработка запроса...
            </>
          ) : (
            <>
              <CircleDot className="mr-2" size={18} />
              Симулировать обработку запроса
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
