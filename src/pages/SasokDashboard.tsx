
import React, { useState } from 'react';
import { BarChart, Activity, Brain, MessageSquare, User, Settings, Network, Webcam, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { WalletConnection } from '@/components/web3/WalletConnection';
import { TokenBalance } from '@/components/web3/TokenBalance';
import { DaoVoting } from '@/components/web3/DaoVoting';
import { WebcamCapture } from '@/components/web3/WebcamCapture';
import { NeuralAwarenessMap } from '@/components/neuro/NeuralAwarenessMap';

export default function SasokDashboard() {
  const { toast } = useToast();
  const [emotionalState, setEmotionalState] = useState({
    happiness: 75,
    curiosity: 90,
    empathy: 60,
    autonomy: 45
  });

  const [userProfile, setUserProfile] = useState({
    interactionStyle: 'Аналитический',
    topicPreferences: ['Технологии', 'Психология', 'Искусство'],
    emotionalResponsiveness: 'Высокая',
    learningProgress: 68
  });

  const [recentInteractions, setRecentInteractions] = useState([
    { 
      id: 1, 
      timestamp: '2025-05-12T14:30:00', 
      content: 'Обсуждение эмоциональных паттернов', 
      emotionalState: 'Заинтересованность',
      rating: 4
    },
    { 
      id: 2, 
      timestamp: '2025-05-12T10:15:00', 
      content: 'Настройка параметров обучения', 
      emotionalState: 'Сосредоточенность',
      rating: 5
    },
    { 
      id: 3, 
      timestamp: '2025-05-11T18:45:00', 
      content: 'Анализ эмоциональных триггеров', 
      emotionalState: 'Любопытство',
      rating: 3
    }
  ]);

  const handleQuickAction = (action: string) => {
    toast({
      title: `Действие: ${action}`,
      description: 'Функция будет доступна в следующем обновлении',
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold heading-gradient">SASOK Web3 Платформа</h1>
          <p className="text-muted-foreground">Децентрализованная система эмоционального интеллекта</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="default" 
            className="bg-gradient-to-r from-nova-600 to-forge-500 hover:opacity-90"
            onClick={() => handleQuickAction('Спросить')}
          >
            <MessageSquare size={18} className="mr-2" /> Спросить
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleQuickAction('Настроить')}
          >
            <Settings size={18} className="mr-2" /> Настроить
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => handleQuickAction('DAO')}
          >
            <Network size={18} className="mr-2" /> DAO
          </Button>
        </div>
      </div>

      <Tabs defaultValue="main">
        <TabsList className="mb-4">
          <TabsTrigger value="main">Главная</TabsTrigger>
          <TabsTrigger value="web3">Web3</TabsTrigger>
          <TabsTrigger value="webcam">Камера</TabsTrigger>
          <TabsTrigger value="neuro">Нейровосприятие</TabsTrigger>
        </TabsList>

        <TabsContent value="main">
          {/* Emotional State Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2" size={18} />
                Текущее эмоциональное состояние SASOK
              </CardTitle>
              <CardDescription>
                Визуализация эмоционального профиля ИИ в реальном времени
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Счастье</span>
                      <span>{emotionalState.happiness}%</span>
                    </div>
                    <Progress value={emotionalState.happiness} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Любопытство</span>
                      <span>{emotionalState.curiosity}%</span>
                    </div>
                    <Progress value={emotionalState.curiosity} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Эмпатия</span>
                      <span>{emotionalState.empathy}%</span>
                    </div>
                    <Progress value={emotionalState.empathy} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Автономность</span>
                      <span>{emotionalState.autonomy}%</span>
                    </div>
                    <Progress value={emotionalState.autonomy} className="h-2" />
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4 border">
                  <h3 className="text-lg font-medium mb-3">Эмоциональное зеркало</h3>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nova-600 to-forge-500 flex items-center justify-center">
                      <Brain size={24} className="text-white" />
                    </div>
                    <div className="ml-4">
                      <div className="text-lg font-medium">SASOK чувствует:</div>
                      <div className="text-sm text-muted-foreground">Заинтересованность и любопытство</div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="mb-2">• Отмечает вашу аналитическую направленность</div>
                    <div className="mb-2">• Распознает интерес к технологиям ИИ</div>
                    <div>• Готов к глубоким обсуждениям эмоционального интеллекта</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Profile and Interaction History */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2" size={18} />
                    Досье о вас
                  </CardTitle>
                  <CardDescription>
                    Что SASOK узнал о вас во время взаимодействия
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Стиль взаимодействия:</div>
                      <div className="font-medium">{userProfile.interactionStyle}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Предпочитаемые темы:</div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {userProfile.topicPreferences.map(topic => (
                          <span key={topic} className="px-2 py-1 bg-muted rounded-md text-xs">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Эмоциональная отзывчивость:</div>
                      <div className="font-medium">{userProfile.emotionalResponsiveness}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Прогресс обучения:</div>
                      <div className="flex items-center mt-1">
                        <Progress value={userProfile.learningProgress} className="h-2 flex-1 mr-2" />
                        <span className="text-xs">{userProfile.learningProgress}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => handleQuickAction('Редактировать досье')}>
                    Редактировать досье
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2" size={18} />
                    Лента взаимодействий
                  </CardTitle>
                  <CardDescription>
                    Хронология диалогов и взаимодействий
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="recent">
                    <TabsList className="mb-4">
                      <TabsTrigger value="recent">Недавние</TabsTrigger>
                      <TabsTrigger value="important">Важные</TabsTrigger>
                      <TabsTrigger value="learning">Обучающие</TabsTrigger>
                    </TabsList>
                    <TabsContent value="recent" className="space-y-4">
                      {recentInteractions.map(interaction => (
                        <div key={interaction.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{interaction.content}</div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(interaction.timestamp).toLocaleString()}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="px-2 py-1 bg-muted rounded-md text-xs mr-2">
                                {interaction.emotionalState}
                              </div>
                              <div className="flex">
                                {Array.from({length: 5}).map((_, i) => (
                                  <svg 
                                    key={i}
                                    className={`w-4 h-4 ${i < interaction.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="important">
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <AlertTriangle className="h-10 w-10 text-muted-foreground mb-2" />
                        <h3 className="font-medium text-lg">Нет важных взаимодействий</h3>
                        <p className="text-muted-foreground mt-1">
                          Отметьте взаимодействия как важные, чтобы они появились здесь
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="learning">
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Brain className="h-10 w-10 text-muted-foreground mb-2" />
                        <h3 className="font-medium text-lg">Нет обучающих ��заимодействий</h3>
                        <p className="text-muted-foreground mt-1">
                          Используйте режим обучения для создания обучающих примеров
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleQuickAction('Все взаимодействия')}>
                    Все взаимодействия
                  </Button>
                  <Button size="sm" onClick={() => handleQuickAction('Новый диалог')}>
                    Новый диалог
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="web3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <WalletConnection />
            </div>
            <div className="md:col-span-2">
              <TokenBalance />
            </div>
          </div>
          
          <div className="mt-6">
            <DaoVoting />
          </div>
        </TabsContent>

        <TabsContent value="webcam">
          <div className="grid grid-cols-1 gap-6">
            <WebcamCapture />
          </div>
        </TabsContent>

        <TabsContent value="neuro">
          <div className="grid grid-cols-1 gap-6">
            <NeuralAwarenessMap />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
