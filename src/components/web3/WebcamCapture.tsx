
import React, { useRef, useState, useEffect } from 'react';
import { Webcam, Camera, Square, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { EmotionTracker } from './EmotionTracker';
import { analyzeEmotions, detectFaces, EmotionAnalysisResult, FaceDetectionResult } from './services/emotionAnalysisService';

const WebcamCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<EmotionAnalysisResult | null>(null);
  const [faceDetection, setFaceDetection] = useState<FaceDetectionResult | null>(null);
  const [autoAnalysis, setAutoAnalysis] = useState<boolean>(false);
  
  const { toast } = useToast();

  const getVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsStreaming(true);
        
        if (autoAnalysis) {
          startContinuousAnalysis();
        }
      }
      
      toast({
        title: "Веб-камера подключена",
        description: "Система готова к анализу эмоций"
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
      setIsRecording(false);
      setAutoAnalysis(false);
    }
  };

  const takePhoto = async () => {
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
      
      // Auto-analyze the photo
      const imageData = photo.toDataURL('image/jpeg', 0.8);
      await performAnalysis(imageData);
      
      toast({
        title: "Фото сделано",
        description: "Запущен анализ эмоционального состояния"
      });
    }
  };

  const performAnalysis = async (imageData: string) => {
    setIsAnalyzing(true);
    
    try {
      // Perform face detection and emotion analysis in parallel
      const [emotions, faces] = await Promise.all([
        analyzeEmotions(imageData),
        detectFaces(imageData)
      ]);
      
      setAnalysisResult(emotions);
      setFaceDetection(faces);
      
      if (faces.detected) {
        drawFaceBoundingBox(faces);
      }
      
      toast({
        title: "Анализ завершен",
        description: `Доминирующая эмоция: ${emotions.dominantEmotion} (${Math.round(emotions.confidence * 100)}%)`
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        variant: "destructive",
        title: "Ошибка анализа",
        description: "Не удалось проанализировать изображение"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const drawFaceBoundingBox = (faces: FaceDetectionResult) => {
    if (!overlayRef.current || !faces.boundingBox) return;
    
    const canvas = overlayRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.strokeRect(
      faces.boundingBox.x,
      faces.boundingBox.y,
      faces.boundingBox.width,
      faces.boundingBox.height
    );
  };

  const startContinuousAnalysis = () => {
    if (!isStreaming) return;
    
    setIsRecording(true);
    setAutoAnalysis(true);
    
    const interval = setInterval(async () => {
      if (!videoRef.current || !autoAnalysis) {
        clearInterval(interval);
        return;
      }
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.6);
      await performAnalysis(imageData);
    }, 3000); // Analyze every 3 seconds
    
    toast({
      title: "Непрерывный анализ запущен",
      description: "Система анализирует эмоции в реальном времени"
    });
  };

  const stopContinuousAnalysis = () => {
    setIsRecording(false);
    setAutoAnalysis(false);
    
    toast({
      title: "Непрерывный анализ остановлен",
      description: "Переключение в ручной режим"
    });
  };

  const closePhoto = () => {
    if (!photoRef.current || !overlayRef.current) return;
    
    const photo = photoRef.current;
    const overlay = overlayRef.current;
    
    const photoCtx = photo.getContext('2d');
    const overlayCtx = overlay.getContext('2d');
    
    if (photoCtx && overlayCtx) {
      photoCtx.clearRect(0, 0, photo.width, photo.height);
      overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
      setHasPhoto(false);
      setAnalysisResult(null);
      setFaceDetection(null);
    }
  };

  useEffect(() => {
    return () => {
      stopVideo();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Webcam className="mr-2" size={18} />
            Видео-анализ эмоций SASOK
          </CardTitle>
          <CardDescription>
            Система анализа эмоционального состояния в реальном времени
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
              ref={overlayRef}
              className={`absolute top-0 left-0 pointer-events-none ${isStreaming ? 'block' : 'hidden'}`}
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
                <p className="text-muted-foreground text-center">
                  Активируйте камеру для начала анализа эмоций
                </p>
              </div>
            )}
            
            {isRecording && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                LIVE
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
              <Button variant="default" onClick={takePhoto} className="flex-1" disabled={isAnalyzing}>
                <Camera size={18} className="mr-2" /> Сделать фото
              </Button>
              
              {!isRecording ? (
                <Button variant="secondary" onClick={startContinuousAnalysis} className="flex-1">
                  <Play size={18} className="mr-2" /> Непрерывный анализ
                </Button>
              ) : (
                <Button variant="secondary" onClick={stopContinuousAnalysis} className="flex-1">
                  <Pause size={18} className="mr-2" /> Стоп анализ
                </Button>
              )}
              
              <Button variant="outline" onClick={stopVideo} className="flex-1">
                <Square size={18} className="mr-2" /> Выключить
              </Button>
            </>
          )}
          
          {hasPhoto && (
            <>
              <Button variant="secondary" onClick={closePhoto} className="flex-1">
                <RotateCcw size={18} className="mr-2" /> Сбросить
              </Button>
              <Button variant="outline" onClick={getVideo} className="flex-1">
                <Webcam size={18} className="mr-2" /> Новое фото
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
      
      <EmotionTracker 
        analysisResult={analysisResult}
        isAnalyzing={isAnalyzing}
      />
    </div>
  );
};

export { WebcamCapture };
