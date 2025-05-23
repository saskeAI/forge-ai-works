
export interface EmotionAnalysisResult {
  emotions: {
    [key: string]: number;
  };
  dominantEmotion: string;
  confidence: number;
  timestamp: string;
}

export interface FaceDetectionResult {
  detected: boolean;
  count: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

// Mock emotion analysis - in a real implementation, this would connect to an AI service
export const analyzeEmotions = async (imageData: string): Promise<EmotionAnalysisResult> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate realistic emotion scores
  const baseEmotions = {
    'Радость': Math.random() * 30 + 40,
    'Удивление': Math.random() * 20 + 10,
    'Грусть': Math.random() * 15 + 5,
    'Гнев': Math.random() * 10 + 2,
    'Страх': Math.random() * 12 + 3,
    'Отвращение': Math.random() * 8 + 1,
    'Нейтральность': Math.random() * 25 + 15,
    'Заинтересованность': Math.random() * 35 + 45
  };
  
  // Find dominant emotion
  const dominantEmotion = Object.entries(baseEmotions).reduce((a, b) => 
    baseEmotions[a[0]] > baseEmotions[b[0]] ? a : b
  )[0];
  
  const confidence = Math.random() * 0.3 + 0.7; // 70-100% confidence
  
  return {
    emotions: baseEmotions,
    dominantEmotion,
    confidence,
    timestamp: new Date().toISOString()
  };
};

export const detectFaces = async (imageData: string): Promise<FaceDetectionResult> => {
  // Simulate face detection
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const detected = Math.random() > 0.1; // 90% chance of detecting a face
  
  if (detected) {
    return {
      detected: true,
      count: 1,
      boundingBox: {
        x: Math.random() * 200 + 100,
        y: Math.random() * 150 + 50,
        width: Math.random() * 100 + 150,
        height: Math.random() * 120 + 180
      }
    };
  }
  
  return {
    detected: false,
    count: 0
  };
};
