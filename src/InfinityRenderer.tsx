import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const InfinityRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // Smooth drawing animation - infinity symbol traces itself
  const drawProgress = interpolate(progress, [0, 0.8], [0, 1]);
  const fadeInOpacity = interpolate(progress, [0, 0.2], [0, 1]);
  const finalGlow = interpolate(progress, [0.8, 1], [0, 1]);

  // Perfect infinity symbol path using mathematical formula
  // Lemniscate equation: (x² + y²)² = 2a²(x² - y²)
  const createInfinityPath = (centerX: number, centerY: number, size: number) => {
    const points = [];
    const numPoints = 200;
    
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * 2 * Math.PI;
      
      // Parametric equations for infinity symbol (lemniscate)
      const x = centerX + (size * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
      const y = centerY + (size * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
      
      points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    
    return points.join(' ') + ' Z';
  };

  // Calculate path length for drawing animation
  const pathLength = 800; // Approximate path length
  const strokeDasharray = pathLength;
  const strokeDashoffset = pathLength * (1 - drawProgress);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <svg width="800" height="600" viewBox="0 0 800 600">
        {/* Main infinity symbol */}
        <path
          d={createInfinityPath(400, 300, 120)}
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={fadeInOpacity}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          filter={finalGlow > 0 ? `drop-shadow(0 0 ${15 + finalGlow * 10}px white)` : undefined}
          style={{
            transition: 'filter 0.3s ease-out'
          }}
        />

        {/* Subtle secondary glow layer for zen effect */}
        {finalGlow > 0.3 && (
          <path
            d={createInfinityPath(400, 300, 120)}
            fill="none"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={finalGlow * 0.3}
            filter="blur(2px)"
          />
        )}

        {/* Meditation focus dot in center (appears after drawing) */}
        {drawProgress > 0.9 && (
          <circle
            cx="400"
            cy="300"
            r="3"
            fill="white"
            opacity={interpolate(progress, [0.9, 1], [0, 0.8])}
            filter={`drop-shadow(0 0 8px white)`}
          />
        )}

        {/* Zen text - appears subtly at the end */}
        {drawProgress > 0.7 && (
          <text 
            x="400" 
            y="420" 
            textAnchor="middle" 
            fill="white" 
            fontSize="18" 
            fontFamily="Arial, sans-serif"
            fontWeight="300"
            letterSpacing="4px"
            opacity={interpolate(progress, [0.7, 1], [0, 0.6])}
          >
            INFINITY
          </text>
        )}

        {/* Subtle philosophical text */}
        {drawProgress > 0.8 && (
          <text 
            x="400" 
            y="450" 
            textAnchor="middle" 
            fill="white" 
            fontSize="12" 
            fontFamily="Arial, sans-serif"
            opacity={interpolate(progress, [0.8, 1], [0, 0.4])}
            letterSpacing="2px"
          >
            LIMITLESS POSSIBILITIES
          </text>
        )}
      </svg>
    </div>
  );
};