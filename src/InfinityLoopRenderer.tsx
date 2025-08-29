import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const InfinityLoopRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // Continuous loop - infinity symbol redraws every cycle
  const loopProgress = progress % 1; // Creates endless loop
  
  // Two-phase cycle: drawing (70%) + text display (30%)
  const isDrawingPhase = loopProgress < 0.7;
  const drawProgress = isDrawingPhase ? (loopProgress / 0.7) : 1;
  const textPhase = isDrawingPhase ? 0 : ((loopProgress - 0.7) / 0.3);

  // Perfect mathematical infinity symbol path
  const createInfinityPath = (centerX: number, centerY: number, size: number) => {
    const points = [];
    const numPoints = 200;
    
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * 2 * Math.PI;
      
      // Lemniscate parametric equations
      const x = centerX + (size * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
      const y = centerY + (size * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
      
      points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    
    return points.join(' ') + ' Z';
  };

  // Meditative pacing - smooth drawing animation
  const pathLength = 800;
  const strokeDasharray = pathLength;
  const strokeDashoffset = pathLength * (1 - drawProgress);

  // Gentle glow intensity
  const glowIntensity = interpolate(drawProgress, [0, 0.5, 1], [5, 15, 12]);
  const lineOpacity = interpolate(drawProgress, [0, 0.1, 1], [0, 0.8, 1]);

  // Text synchronization - appears when line completes
  const textOpacity = interpolate(textPhase, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const textScale = interpolate(textPhase, [0, 0.2, 1], [0.9, 1, 1]);

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
        {/* Infinity symbol - continuously redrawing */}
        <path
          d={createInfinityPath(400, 280, 100)}
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={lineOpacity}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          filter={`drop-shadow(0 0 ${glowIntensity}px white)`}
          style={{
            transition: 'none' // Smooth continuous animation
          }}
        />

        {/* Subtle ambient glow layer */}
        {drawProgress > 0.5 && (
          <path
            d={createInfinityPath(400, 280, 100)}
            fill="none"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={interpolate(drawProgress, [0.5, 1], [0, 0.2])}
            filter="blur(3px)"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
          />
        )}

        {/* Synchronized text overlay - appears when line completes */}
        {textOpacity > 0 && (
          <g
            opacity={textOpacity}
            transform={`scale(${textScale}) translate(${400 * (1 - textScale)}, ${380 * (1 - textScale)})`}
          >
            {/* Main message */}
            <text 
              x="400" 
              y="380" 
              textAnchor="middle" 
              fill="white" 
              fontSize="28" 
              fontFamily="Arial, sans-serif"
              fontWeight="300"
              letterSpacing="1px"
              filter="drop-shadow(0 0 10px white)"
            >
              Slow down &amp; refocus
            </text>
            
            {/* Subtle accent line */}
            <line 
              x1="320" 
              y1="400" 
              x2="480" 
              y2="400" 
              stroke="white" 
              strokeWidth="1" 
              opacity={0.6}
              filter="drop-shadow(0 0 5px white)"
            />
          </g>
        )}

        {/* Breathing indicator - subtle pulsing dot at center */}
        {drawProgress > 0.8 && (
          <circle
            cx="400"
            cy="280"
            r={1.5 + Math.sin(frame * 0.08) * 0.5}
            fill="white"
            opacity={0.4 + Math.sin(frame * 0.08) * 0.2}
            filter="drop-shadow(0 0 6px white)"
          />
        )}

        {/* Zen philosophy text - very subtle */}
        {textPhase > 0.5 && (
          <text 
            x="400" 
            y="450" 
            textAnchor="middle" 
            fill="white" 
            fontSize="12" 
            fontFamily="Arial, sans-serif"
            opacity={interpolate(textPhase, [0.5, 0.8, 1], [0, 0.4, 0.2])}
            letterSpacing="2px"
          >
            MINDFUL BREATHING
          </text>
        )}
      </svg>
    </div>
  );
};