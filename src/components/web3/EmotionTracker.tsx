import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { EmotionAnalysisResult } from './services/emotionAnalysisService';

interface EmotionTrackerProps {
  analysisResult: EmotionAnalysisResult | null;
  isAnalyzing: boolean;
}

export const EmotionTracker: React.FC<EmotionTrackerProps> = ({ 
  analysisResult, 
  isAnalyzing 
}) => {
  const [emotionHistory, setEmotionHistory] = useState<EmotionAnalysisResult[]>([]);

  useEffect(() => {
    if (analysisResult) {
      setEmotionHistory(prev => {
        const updated = [...prev, analysisResult];
        // Keep only last 10 analyses
        return updated.slice(-10);
      });
    }
  }, [analysisResult]);

  const getEmotionColor = (emotion: string, value: number) => {
    const intensity = Math.min(value / 80, 1);
    const colors = {
      'Радость': `hsl(45, 100%, ${Math.max(50, 90 - intensity * 40)}%)`,
      'Удивление': `hsl(280, 100%, ${Math.max(50, 90 - intensity * 40)}%)`,
      'Грусть': `hsl(220, 100%, ${Math.max(30, 70 - intensity * 30)}%)`,
      'Гнев': `hsl(0, 100%, ${Math.max(40, 80 - intensity * 30)}%)`,
      'Страх': `hsl(300, 100%, ${Math.max(30, 70 - intensity * 30)}%)`,
      'Отвращение': `hsl(90, 60%, ${Math.max(30, 60 - intensity * 20)}%)`,
      'Нейтральность': `hsl(0, 0%, ${Math.max(40, 80 - intensity * 30)}%)`,
      'Заинтересованность': `hsl(200, 100%, ${Math.max(50, 90 - intensity * 40)}%)`
    };
    return colors[emotion as keyof typeof colors] || '#6b7280';
  };

  if (!analysisResult && !isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Анализ эмоций</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Сделайте фото для начала анализа эмоций
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Анализ эмоций
          {isAnalyzing && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
              <span className="text-sm text-muted-foreground">Анализирую...</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {analysisResult && (
          <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">{analysisResult.dominantEmotion}</div>
                <div className="text-sm text-muted-foreground">
                  Уверенность: {Math.round(analysisResult.confidence * 100)}%
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {Object.entries(analysisResult.emotions).map(([emotion, value]) => (
                <div key={emotion} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{emotion}</span>
                    <span className="font-medium">{Math.round(value)}%</span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={value} 
                      className="h-2"
                      style={{
                        backgroundColor: getEmotionColor(emotion, value)
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {emotionHistory.length > 1 && (
              <div className="mt-6 pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">История эмоций</h4>
                <div className="flex space-x-1 h-16 items-end">
                  {emotionHistory.slice(-8).map((result, index) => {
                    const maxEmotion = Object.entries(result.emotions).reduce((a, b) => 
                      result.emotions[a[0]] > result.emotions[b[0]] ? a : b
                    );
                    const height = (maxEmotion[1] / 100) * 100;
                    
                    return (
                      <div
                        key={index}
                        className="flex-1 bg-blue-500 rounded-t opacity-70 hover:opacity-100 transition-opacity"
                        style={{
                          height: `${height}%`,
                          backgroundColor: getEmotionColor(maxEmotion[0], maxEmotion[1])
                        }}
                        title={`${maxEmotion[0]}: ${Math.round(maxEmotion[1])}%`}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
