import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const PersistencePattern: React.FC<any> = ({ stages, primaryColor, backgroundColor }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  
  const cycleFrames = durationInFrames / stages.length;
  const currentCycle = Math.floor(frame / cycleFrames);
  const cycleProgress = (frame % cycleFrames) / cycleFrames;
  
  // Breaking and reforming animation
  const breakPoint = 0.3;
  const reformPoint = 0.7;
  
  let shapeIntegrity = 1;
  if (cycleProgress < breakPoint) {
    shapeIntegrity = interpolate(cycleProgress, [0, breakPoint], [1, 0.2]);
  } else if (cycleProgress < reformPoint) {
    shapeIntegrity = interpolate(cycleProgress, [breakPoint, reformPoint], [0.2, 1.2]);
  } else {
    shapeIntegrity = interpolate(cycleProgress, [reformPoint, 1], [1.2, 1]);
  }
  
  const currentStage = stages[currentCycle] || stages[stages.length - 1];
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <svg width={width} height={height}>
        {/* Render breaking/reforming geometric pattern */}
        {Array.from({ length: currentStage.rings }).map((_, i) => {
          const radius = 40 + (i * 30);
          const fragments = cycleProgress < breakPoint ? 8 : 1;
          
          return Array.from({ length: fragments }).map((_, j) => {
            const angle = (360 / fragments) * j;
            const arcLength = 360 / fragments;
            
            return (
              <path
                key={`${i}-${j}`}
                d={`M ${width/2 + radius * Math.cos(angle * Math.PI / 180)} ${height/2 + radius * Math.sin(angle * Math.PI / 180)} 
                    A ${radius} ${radius} 0 0 1 ${width/2 + radius * Math.cos((angle + arcLength) * Math.PI / 180)} ${height/2 + radius * Math.sin((angle + arcLength) * Math.PI / 180)}`}
                stroke={primaryColor}
                strokeWidth={3}
                fill="none"
                opacity={shapeIntegrity}
                style={{
                  filter: `drop-shadow(0 0 10px ${primaryColor})`,
                  transform: `scale(${shapeIntegrity})`
                }}
              />
            );
          });
        })}
      </svg>
      
      <div style={{
        position: 'absolute',
        bottom: '20%',
        color: primaryColor,
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        {currentStage.label}
      </div>
    </div>
  );
};