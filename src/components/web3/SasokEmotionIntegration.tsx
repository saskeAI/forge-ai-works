
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Activity, TrendingUp, Database } from 'lucide-react';
import { EmotionAnalysisResult } from './services/emotionAnalysisService';

interface SasokEmotionIntegrationProps {
  analysisResult: EmotionAnalysisResult | null;
}

export const SasokEmotionIntegration: React.FC<SasokEmotionIntegrationProps> = ({
  analysisResult
}) => {
  const [sasokIntegration, setSasokIntegration] = useState({
    isConnected: false,
    dataPoints: 0,
    lastSync: null as string | null,
    emotionTrends: [] as Array<{emotion: string, change: number}>
  });

  const connectToSasok = () => {
    setSasokIntegration(prev => ({
      ...prev,
      isConnected: true,
      lastSync: new Date().toLocaleTimeString()
    }));
  };

  const syncWithSasok = () => {
    if (!analysisResult) return;
    
    setSasokIntegration(prev => ({
      ...prev,
      dataPoints: prev.dataPoints + 1,
      lastSync: new Date().toLocaleTimeString(),
      emotionTrends: [
        ...prev.emotionTrends.slice(-4),
        {
          emotion: analysisResult.dominantEmotion,
          change: Math.random() * 20 - 10 // Simulate trend change
        }
      ]
    }));
  };

  useEffect(() => {
    if (analysisResult && sasokIntegration.isConnected) {
      syncWithSasok();
    }
  }, [analysisResult]);

  const getEmotionMapping = (emotion: string) => {
    const mapping = {
      'Радость': 'joy',
      'Удивление': 'surprise', 
      'Грусть': 'sadness',
      'Гнев': 'anger',
      'Страх': 'fear',
      'Отвращение': 'disgust',
      'Нейтральность': 'neutral',
      'Заинтересованность': 'interest'
    };
    return mapping[emotion as keyof typeof mapping] || 'neutral';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="mr-2" size={18} />
          Интеграция с SASOK
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${sasokIntegration.isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm">
              {sasokIntegration.isConnected ? 'Подключено к SASOK' : 'Не подключено'}
            </span>
          </div>
          
          {!sasokIntegration.isConnected && (
            <Button variant="outline" size="sm" onClick={connectToSasok}>
              Подключить
            </Button>
          )}
        </div>

        {sasokIntegration.isConnected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Database size={16} className="text-blue-500" />
                  <div>
                    <div className="text-sm font-medium">Точки данных</div>
                    <div className="text-lg font-bold">{sasokIntegration.dataPoints}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Activity size={16} className="text-green-500" />
                  <div>
                    <div className="text-sm font-medium">Последняя синхронизация</div>
                    <div className="text-sm">{sasokIntegration.lastSync || 'Нет данных'}</div>
                  </div>
                </div>
              </div>
            </div>

            {analysisResult && (
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="text-sm font-medium mb-3">Текущие данные эмоций</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Доминирующая эмоция:</span>
                    <Badge variant="secondary">
                      {getEmotionMapping(analysisResult.dominantEmotion)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Уверенность:</span>
                    <span className="text-sm font-medium">
                      {Math.round(analysisResult.confidence * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Временная метка:</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(analysisResult.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {sasokIntegration.emotionTrends.length > 0 && (
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <TrendingUp size={16} className="mr-1" />
                  Тренды эмоций
                </h4>
                <div className="space-y-2">
                  {sasokIntegration.emotionTrends.slice(-3).map((trend, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{getEmotionMapping(trend.emotion)}</span>
                      <span className={`text-sm font-medium ${
                        trend.change > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {trend.change > 0 ? '+' : ''}{trend.change.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
