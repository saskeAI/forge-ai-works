
import React from 'react';

interface BrainRegionsProps {
  activeRegions: string[];
}

export const BrainRegions: React.FC<BrainRegionsProps> = ({ activeRegions }) => {
  // Define region positions and colors
  const regions = [
    {
      id: 'attention',
      name: 'Зона внимания',
      position: { x: '20%', y: '30%', width: '25%', height: '25%' },
      color: '#33C3F0',
      description: 'Фокусировка на входящей информации'
    },
    {
      id: 'language',
      name: 'Языковая зона',
      position: { x: '55%', y: '25%', width: '30%', height: '20%' },
      color: '#D3E4FD',
      description: 'Обработка естественного языка'
    },
    {
      id: 'memory',
      name: 'Память',
      position: { x: '15%', y: '60%', width: '30%', height: '25%' },
      color: '#9b87f5',
      description: 'Семантическое хранилище'
    },
    {
      id: 'emotion',
      name: 'Эмоциональный центр',
      position: { x: '60%', y: '55%', width: '25%', height: '20%' },
      color: '#FFDEE2',
      description: 'Эмоциональная оценка'
    },
    {
      id: 'integration',
      name: 'Интегративная зона',
      position: { x: '40%', y: '45%', width: '20%', height: '20%' },
      color: '#F2FCE2',
      description: 'Синтез информации'
    }
  ];
  
  return (
    <div className="absolute inset-0">
      {/* Brain outline */}
      <div className="absolute w-[80%] h-[80%] left-[10%] top-[10%] rounded-[50%] border border-muted-foreground/30" />
      
      {/* Brain regions */}
      {regions.map((region) => {
        const isActive = activeRegions.includes(region.id);
        const borderClasses = isActive ? 'border-[3px] shadow-glow' : 'border';
        const opacityClasses = isActive ? 'opacity-80' : 'opacity-30';
        const scaleClasses = isActive ? 'scale-110' : 'scale-100';
        
        return (
          <div 
            key={region.id}
            className={`absolute rounded-[40%] ${borderClasses} transition-all duration-500 ${opacityClasses} ${scaleClasses}`}
            style={{
              left: region.position.x,
              top: region.position.y,
              width: region.position.width,
              height: region.position.height,
              backgroundColor: region.color,
              borderColor: region.color,
              boxShadow: isActive ? `0 0 15px ${region.color}` : 'none'
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
              <div className="text-xs font-medium text-center">{region.name}</div>
              {isActive && (
                <div className="text-[10px] text-center mt-1 opacity-70">
                  {region.description}
                </div>
              )}
            </div>
          </div>
        );
      })}
      
      {/* Neural connections (simplified) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Connection: attention to language */}
        <line 
          x1="32%" y1="40%" x2="55%" y2="32%"
          stroke="#9b87f5"
          strokeWidth={activeRegions.includes('attention') && activeRegions.includes('language') ? 3 : 1}
          strokeOpacity={activeRegions.includes('attention') && activeRegions.includes('language') ? 0.8 : 0.3}
          className="transition-all duration-300"
        />
        
        {/* Connection: language to memory */}
        <line 
          x1="55%" y1="35%" x2="30%" y2="60%"
          stroke="#9b87f5"
          strokeWidth={activeRegions.includes('language') && activeRegions.includes('memory') ? 3 : 1}
          strokeOpacity={activeRegions.includes('language') && activeRegions.includes('memory') ? 0.8 : 0.3}
          className="transition-all duration-300"
        />
        
        {/* Connection: memory to emotion */}
        <line 
          x1="45%" y1="70%" x2="60%" y2="65%"
          stroke="#9b87f5"
          strokeWidth={activeRegions.includes('memory') && activeRegions.includes('emotion') ? 3 : 1}
          strokeOpacity={activeRegions.includes('memory') && activeRegions.includes('emotion') ? 0.8 : 0.3}
          className="transition-all duration-300"
        />
        
        {/* Connection: integration to all */}
        <line 
          x1="50%" y1="55%" x2="32%" y2="42%"
          stroke="#9b87f5"
          strokeWidth={activeRegions.includes('integration') ? 3 : 1}
          strokeOpacity={activeRegions.includes('integration') ? 0.8 : 0.3}
          className="transition-all duration-300"
        />
        <line 
          x1="50%" y1="55%" x2="60%" y2="35%"
          stroke="#9b87f5"
          strokeWidth={activeRegions.includes('integration') ? 3 : 1}
          strokeOpacity={activeRegions.includes('integration') ? 0.8 : 0.3}
          className="transition-all duration-300"
        />
        <line 
          x1="50%" y1="55%" x2="30%" y2="70%"
          stroke="#9b87f5"
          strokeWidth={activeRegions.includes('integration') ? 3 : 1}
          strokeOpacity={activeRegions.includes('integration') ? 0.8 : 0.3}
          className="transition-all duration-300"
        />
        <line 
          x1="50%" y1="55%" x2="65%" y2="65%"
          stroke="#9b87f5"
          strokeWidth={activeRegions.includes('integration') ? 3 : 1}
          strokeOpacity={activeRegions.includes('integration') ? 0.8 : 0.3}
          className="transition-all duration-300"
        />
      </svg>
    </div>
  );
};
