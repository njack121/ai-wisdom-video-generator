import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const BalancePattern: React.FC<any> = ({ stages, primaryColor, backgroundColor }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  
  const centerX = width / 2;
  const centerY = height / 2;
  
  const stageCount = stages.length;
  const framesPerStage = durationInFrames / stageCount;
  const currentStageIndex = Math.floor(frame / framesPerStage);
  const stageProgress = (frame % framesPerStage) / framesPerStage;
  const currentStage = stages[currentStageIndex] || stages[stages.length - 1];
  
  // Balance: opposing forces that find equilibrium
  const oscillation = Math.sin(frame * 0.1) * 20;
  const balance = interpolate(stageProgress, [0, 1], [0.2, 1]);
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor,
      position: 'relative'
    }}>
      <svg width={width} height={height}>
        {/* Left side - expanding */}
        {Array.from({ length: currentStage.rings }).map((_, i) => (
          <g key={`left-${i}`}>
            <rect
              x={centerX - 200 - oscillation * (1 - balance)}
              y={centerY - 10 - (i * 25)}
              width={150 + (i * 20)}
              height={20 + (i * 5)}
              fill="none"
              stroke={primaryColor}
              strokeWidth={2}
              opacity={0.8}
              style={{
                filter: `drop-shadow(0 0 10px ${primaryColor})`
              }}
            />
          </g>
        ))}
        
        {/* Right side - contracting */}
        {Array.from({ length: currentStage.rings }).map((_, i) => (
          <g key={`right-${i}`}>
            <rect
              x={centerX + 50 + oscillation * (1 - balance)}
              y={centerY - 10 - (i * 25)}
              width={150 - (i * 20)}
              height={20 + (i * 5)}
              fill="none"
              stroke={primaryColor}
              strokeWidth={2}
              opacity={0.8}
              style={{
                filter: `drop-shadow(0 0 10px ${primaryColor})`
              }}
            />
          </g>
        ))}
        
        {/* Center balance point */}
        <line
          x1={centerX}
          y1={centerY - 100}
          x2={centerX}
          y2={centerY + 100}
          stroke={primaryColor}
          strokeWidth={4}
          opacity={balance}
          style={{
            filter: `drop-shadow(0 0 15px ${primaryColor})`
          }}
        />
      </svg>
      
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: primaryColor,
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        {currentStage.label}
      </div>
    </div>
  );
};