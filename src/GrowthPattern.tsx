import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';

interface GrowthPatternProps {
  concept: string;
  stages: Array<{
    label: string;
    complexity: number;
    rings: number;
  }>;
  primaryColor: string;
  backgroundColor: string;
}

export const GrowthPattern: React.FC<GrowthPatternProps> = ({
  concept,
  stages,
  primaryColor = '#ffffff',
  backgroundColor = '#000000'
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();
  
  const stageCount = stages.length;
  const framesPerStage = durationInFrames / stageCount;
  const currentStageIndex = Math.floor(frame / framesPerStage);
  const stageProgress = (frame % framesPerStage) / framesPerStage;
  
  const currentStage = stages[currentStageIndex] || stages[stages.length - 1];
  
  // Animation values
  const rotation = interpolate(frame, [0, durationInFrames], [0, 360]);
  const glow = interpolate(
    Math.sin(frame * 0.1), 
    [-1, 1], 
    [0.5, 1]
  );
  
  const renderRings = (ringCount: number, complexity: number) => {
    const rings = [];
    const centerX = width / 2;
    const centerY = height / 2;
    
    for (let i = 0; i < ringCount; i++) {
      const radius = 30 + (i * 25);
      const strokeWidth = interpolate(complexity, [1, 10], [2, 1]);
      const opacity = ringCount > 1 ? interpolate(i, [0, ringCount - 1], [1, 0.6]) : 1;
      
      rings.push(
        <circle
          key={i}
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke={primaryColor}
          strokeWidth={strokeWidth}
          opacity={opacity * glow}
          style={{
            filter: `drop-shadow(0 0 ${10 + complexity}px ${primaryColor})`,
            transform: `rotate(${rotation + (i * 15)}deg)`,
            transformOrigin: `${centerX}px ${centerY}px`
          }}
        />
      );
      
      // Add interconnecting lines for higher complexity
      if (complexity > 3 && i > 0) {
        const prevRadius = 30 + ((i - 1) * 25);
        rings.push(
          <line
            key={`line-${i}`}
            x1={centerX + Math.cos(rotation * Math.PI / 180) * prevRadius}
            y1={centerY + Math.sin(rotation * Math.PI / 180) * prevRadius}
            x2={centerX + Math.cos((rotation + 60) * Math.PI / 180) * radius}
            y2={centerY + Math.sin((rotation + 60) * Math.PI / 180) * radius}
            stroke={primaryColor}
            strokeWidth={1}
            opacity={0.4 * glow}
          />
        );
      }
    }
    
    return rings;
  };
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Main Animation */}
      <svg
        width={width}
        height={height * 0.7}
        style={{ position: 'absolute', top: '10%' }}
      >
        {renderRings(currentStage.rings, currentStage.complexity)}
      </svg>
      
      {/* Stage Label */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        color: primaryColor,
        fontSize: '24px',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',
        opacity: interpolate(stageProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
      }}>
        {currentStage.label}
      </div>
      
      {/* Concept Text */}
      <div style={{
        position: 'absolute',
        bottom: '5%',
        color: primaryColor,
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        opacity: 0.7,
        textTransform: 'uppercase',
        letterSpacing: '2px'
      }}>
        {concept}
      </div>
    </div>
  );
};