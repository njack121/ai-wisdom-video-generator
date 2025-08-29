import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const TransformationPattern: React.FC<any> = ({ stages, primaryColor, backgroundColor }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  
  const centerX = width / 2;
  const centerY = height / 2;
  
  const stageCount = stages.length;
  const framesPerStage = durationInFrames / stageCount;
  const currentStageIndex = Math.floor(frame / framesPerStage);
  const stageProgress = (frame % framesPerStage) / framesPerStage;
  const currentStage = stages[currentStageIndex] || stages[stages.length - 1];
  
  // Transformation: morphing from simple to complex shapes
  const morphProgress = interpolate(stageProgress, [0, 1], [0, 1]);
  const baseRadius = 50;
  
  // Create morphing polygon
  const sides = Math.max(3, Math.floor(3 + morphProgress * (currentStage.complexity - 3)));
  const vertices = Array.from({ length: sides }, (_, i) => {
    const angle = (360 / sides) * i;
    const radius = baseRadius + morphProgress * currentStage.rings * 10;
    const x = centerX + radius * Math.cos(angle * Math.PI / 180);
    const y = centerY + radius * Math.sin(angle * Math.PI / 180);
    return `${x},${y}`;
  });
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor,
      position: 'relative'
    }}>
      <svg width={width} height={height}>
        {/* Morphing central shape */}
        <polygon
          points={vertices.join(' ')}
          fill="none"
          stroke={primaryColor}
          strokeWidth={3}
          opacity={0.8}
          style={{
            filter: `drop-shadow(0 0 15px ${primaryColor})`,
            transform: `rotate(${frame * 2}deg)`,
            transformOrigin: `${centerX}px ${centerY}px`
          }}
        />
        
        {/* Surrounding transformation rings */}
        {Array.from({ length: currentStage.rings }).map((_, i) => {
          const ringRadius = 80 + (i * 40);
          const ringVertices = Array.from({ length: sides + i }, (_, j) => {
            const angle = (360 / (sides + i)) * j + frame * (i + 1);
            const x = centerX + ringRadius * Math.cos(angle * Math.PI / 180);
            const y = centerY + ringRadius * Math.sin(angle * Math.PI / 180);
            return `${x},${y}`;
          });
          
          return (
            <polygon
              key={i}
              points={ringVertices.join(' ')}
              fill="none"
              stroke={primaryColor}
              strokeWidth={2}
              opacity={0.4 - (i * 0.1)}
              style={{
                filter: `drop-shadow(0 0 5px ${primaryColor})`
              }}
            />
          );
        })}
        
        {/* Particle system showing transformation */}
        {Array.from({ length: currentStage.complexity * 2 }).map((_, i) => {
          const particleAngle = (360 / (currentStage.complexity * 2)) * i + frame * 3;
          const particleRadius = 150 + Math.sin(frame * 0.1 + i) * 30;
          const x = centerX + particleRadius * Math.cos(particleAngle * Math.PI / 180);
          const y = centerY + particleRadius * Math.sin(particleAngle * Math.PI / 180);
          
          return (
            <circle
              key={`particle-${i}`}
              cx={x}
              cy={y}
              r={2 + Math.sin(frame * 0.05 + i) * 2}
              fill={primaryColor}
              opacity={0.6}
            />
          );
        })}
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