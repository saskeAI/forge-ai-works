
import React from 'react';

export const InputFlow: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {/* Input flow animation */}
      <div className="absolute left-0 top-[30%] h-2 bg-blue-500 rounded-full animate-flow-pulse opacity-70" 
           style={{width: '40%', animationDuration: '2s'}} />
      <div className="absolute left-0 top-[32%] h-1 bg-blue-300 rounded-full animate-flow-pulse opacity-50" 
           style={{width: '45%', animationDuration: '2.5s', animationDelay: '0.2s'}} />
      <div className="absolute left-0 top-[28%] h-1 bg-blue-400 rounded-full animate-flow-pulse opacity-60" 
           style={{width: '42%', animationDuration: '2.2s', animationDelay: '0.4s'}} />
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes flow-pulse {
            0% {
              transform: scaleX(0);
              transform-origin: left;
              opacity: 1;
            }
            50% {
              transform: scaleX(1);
              transform-origin: left;
              opacity: 0.7;
            }
            100% {
              transform: scaleX(1);
              transform-origin: left;
              opacity: 0;
            }
          }
          .animate-flow-pulse {
            animation: flow-pulse 3s infinite;
          }
        `
      }} />
    </div>
  );
};
