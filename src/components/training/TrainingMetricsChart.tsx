
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

// Имитация данных для графиков
const generateTrainingData = (epochs: number) => {
  const data = [];
  
  let accuracy = 0.45;
  let loss = 0.8;
  let valAccuracy = 0.4;
  let valLoss = 0.85;
  
  for (let i = 0; i < epochs; i++) {
    // Симуляция прогресса обучения с небольшими колебаниями
    accuracy = Math.min(0.98, accuracy + (Math.random() * 0.04));
    loss = Math.max(0.05, loss - (Math.random() * 0.03));
    
    // Валидационные метрики с легким отставанием
    valAccuracy = Math.min(0.95, valAccuracy + (Math.random() * 0.035));
    valLoss = Math.max(0.08, valLoss - (Math.random() * 0.025));
    
    // Имитация переобучения на поздних эпохах
    if (i > epochs * 0.7) {
      accuracy = Math.min(0.99, accuracy + (Math.random() * 0.005));
      loss = Math.max(0.01, loss - (Math.random() * 0.005));
      
      valAccuracy = Math.min(0.94, valAccuracy + (Math.random() * 0.001) - 0.002);
      valLoss = Math.min(1.0, valLoss + (Math.random() * 0.01) - 0.003);
    }
    
    data.push({
      epoch: i + 1,
      accuracy: parseFloat(accuracy.toFixed(4)),
      loss: parseFloat(loss.toFixed(4)),
      valAccuracy: parseFloat(valAccuracy.toFixed(4)),
      valLoss: parseFloat(valLoss.toFixed(4))
    });
  }
  
  return data;
};

interface MetricsChartProps {
  metric: 'accuracy' | 'loss';
  title: string;
  description: string;
  color: string;
  validationColor: string;
}

const MetricsChart = ({ metric, title, description, color, validationColor }: MetricsChartProps) => {
  const data = generateTrainingData(30);
  const validationKey = `val${metric.charAt(0).toUpperCase() + metric.slice(1)}`;
  
  const chartConfig = {
    [metric]: { label: metric === 'accuracy' ? "Точность обучения" : "Потери обучения", color },
    [validationKey]: { label: metric === 'accuracy' ? "Точность валидации" : "Потери валидации", color: validationColor },
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="epoch" 
                  label={{ value: 'Эпоха', position: 'insideBottomRight', offset: -10 }} 
                />
                <YAxis 
                  label={{ 
                    value: metric === 'accuracy' ? 'Точность' : 'Потери', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }} 
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={metric}
                  name={metric === 'accuracy' ? "Точность обучения" : "Потери обучения"}
                  stroke={color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey={validationKey}
                  name={metric === 'accuracy' ? "Точность валидации" : "Потери валидации"}
                  stroke={validationColor}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export const TrainingMetricsChart = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MetricsChart
        metric="accuracy"
        title="Точность модели"
        description="Динамика точности на обучающем и валидационном наборах"
        color="#4f46e5"
        validationColor="#34d399"
      />
      <MetricsChart
        metric="loss"
        title="Функция потерь"
        description="Динамика потерь на обучающем и валидационном наборах"
        color="#f43f5e"
        validationColor="#fb923c"
      />
    </div>
  );
};
