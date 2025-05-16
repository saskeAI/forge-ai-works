
import React, { useRef, useState, useEffect } from 'react';
import { Webcam } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const WebcamCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const { toast } = useToast();

  const getVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 600, height: 400 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsStreaming(true);
      }
      
      toast({
        title: "Веб-камера подключена",
        description: "Вы можете сделать фото для анализа"
      });
    } catch (err) {
      console.error("Error accessing webcam:", err);
      toast({
        variant: "destructive",
        title: "Ошибка доступа к камере",
        description: "Убедитесь, что вы дали разрешение на использование камеры"
      });
    }
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => {
        track.stop();
      });
      
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || !photoRef.current) return;
    
    const video = videoRef.current;
    const photo = photoRef.current;
    const width = video.videoWidth;
    const height = video.videoHeight;
    
    photo.width = width;
    photo.height = height;
    
    const ctx = photo.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, width, height);
      setHasPhoto(true);
      
      toast({
        title: "Фото сделано",
        description: "Изображение готово к анализу в системе SASOK"
      });
    }
  };

  const closePhoto = () => {
    if (!photoRef.current) return;
    
    const photo = photoRef.current;
    const ctx = photo.getContext('2d');
    
    if (ctx) {
      ctx.clearRect(0, 0, photo.width, photo.height);
      setHasPhoto(false);
    }
  };

  const analyzePhoto = () => {
    toast({
      title: "Анализ изображения",
      description: "SASOK начинает анализ эмоционального состояния"
    });
    
    // Здесь будет код для отправки фото на анализ
    setTimeout(() => {
      toast({
        title: "Анализ завершен",
        description: "Обнаружены эмоции: Заинтересованность (85%), Радость (65%)"
      });
    }, 2000);
  };

  useEffect(() => {
    return () => {
      stopVideo();
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Webcam className="mr-2" size={18} />
          Видео-анализ эмоций
        </CardTitle>
        <CardDescription>
          Используйте камеру для анализа эмоционального состояния
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-full">
          <video 
            ref={videoRef} 
            className={`rounded-md border border-border shadow-sm ${isStreaming ? 'block' : 'hidden'}`}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <canvas 
            ref={photoRef} 
            className={`rounded-md border border-border shadow-sm mt-2 ${hasPhoto ? 'block' : 'hidden'}`}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          {!isStreaming && !hasPhoto && (
            <div className="flex flex-col items-center justify-center p-8 border border-dashed border-border rounded-md">
              <Webcam size={48} className="text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Нажмите кнопку "Включить камеру" для начала</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {!isStreaming && !hasPhoto && (
          <Button variant="default" onClick={getVideo} className="flex-1">
            <Webcam size={18} className="mr-2" /> Включить камеру
          </Button>
        )}
        {isStreaming && !hasPhoto && (
          <>
            <Button variant="default" onClick={takePhoto} className="flex-1">
              Сделать фото
            </Button>
            <Button variant="outline" onClick={stopVideo} className="flex-1">
              Выключить камеру
            </Button>
          </>
        )}
        {hasPhoto && (
          <>
            <Button variant="default" onClick={analyzePhoto} className="flex-1">
              Анализировать
            </Button>
            <Button variant="secondary" onClick={closePhoto} className="flex-1">
              Сбросить
            </Button>
            <Button variant="outline" onClick={getVideo} className="flex-1">
              Новое фото
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export { WebcamCapture };
