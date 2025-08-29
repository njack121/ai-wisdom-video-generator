import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const FocusPattern: React.FC<any> = ({ stages, primaryColor, backgroundColor, visualMetaphor }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  
  const centerX = width / 2;
  const centerY = height / 2;
  
  // Focus animation: scattered points converging to center
  const convergenceProgress = interpolate(frame, [0, durationInFrames], [0, 1]);
  
  const stageCount = stages.length;
  const framesPerStage = durationInFrames / stageCount;
  const currentStageIndex = Math.floor(frame / framesPerStage);
  const currentStage = stages[currentStageIndex] || stages[stages.length - 1];
  
  // Generate scattered points that converge
  const pointCount = currentStage.complexity * 8;
  const points = Array.from({ length: pointCount }, (_, i) => {
    const angle = (360 / pointCount) * i;
    const startRadius = 200 + Math.random() * 100; // Scattered start positions
    const endRadius = 20 + (i % 3) * 15; // Final focused positions
    
    const currentRadius = interpolate(
      convergenceProgress, 
      [0, 1], 
      [startRadius, endRadius]
    );
    
    return {
      x: centerX + currentRadius * Math.cos(angle * Math.PI / 180),
      y: centerY + currentRadius * Math.sin(angle * Math.PI / 180),
      size: interpolate(convergenceProgress, [0, 1], [2, 6])
    };
  });
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor,
      position: 'relative'
    }}>
      <svg width={width} height={height}>
        {/* Converging points */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={point.size}
            fill={primaryColor}
            opacity={interpolate(convergenceProgress, [0, 1], [0.3, 1])}
            style={{
              filter: `drop-shadow(0 0 5px ${primaryColor})`
            }}
          />
        ))}
        
        {/* Central focus point */}
        <circle
          cx={centerX}
          cy={centerY}
          r={interpolate(convergenceProgress, [0, 1], [0, 30])}
          fill="none"
          stroke={primaryColor}
          strokeWidth={3}
          opacity={interpolate(convergenceProgress, [0.7, 1], [0, 1])}
          style={{
            filter: `drop-shadow(0 0 20px ${primaryColor})`
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
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        {currentStage.label}
      </div>
    </div>
  );
};