
import { useState, useEffect } from 'react';

// Hook для анимации пульсации
export const usePulseAnimation = () => {
  const [pulseSize, setPulseSize] = useState(60);
  const [pulseOpacity, setPulseOpacity] = useState(0.8);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseSize(size => (size === 60 ? 70 : 60));
      setPulseOpacity(opacity => (opacity === 0.8 ? 0.6 : 0.8));
    }, 1500);
    
    return () => clearInterval(pulseInterval);
  }, []);

  return { pulseSize, pulseOpacity };
};

// Hook для анимации графика
export const useGraphAnimation = () => {
  const [graphProgress, setGraphProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setGraphProgress(100);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const resetAndAnimateGraph = () => {
    setGraphProgress(0);
    setTimeout(() => {
      setGraphProgress(100);
    }, 10);
  };

  return { graphProgress, resetAndAnimateGraph };
};
