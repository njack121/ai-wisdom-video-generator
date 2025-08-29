import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const PreciseInfinityRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  
  // 3-second loop cycle (90 frames at 30fps)
  const loopDuration = 3 * fps; // 90 frames
  const currentLoopFrame = frame % loopDuration;
  const loopProgress = currentLoopFrame / loopDuration;

  // Hand-drawn path using strokeDasharray technique for precise line drawing
  const createInfinityPath = () => {
    const centerX = 400;
    const centerY = 300;
    const width = 80;
    const height = 40;
    
    // Create complete infinity path
    const points = [];
    const numPoints = 200;
    
    for (let i = 0; i <= numPoints; i++) {
      const t = (i / numPoints) * 2 * Math.PI;
      const x = centerX + (width * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
      const y = centerY + (height * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
      points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    
    return points.join(' ') + ' Z';
  };

  // Calculate path length and dash offset for drawing effect
  const pathLength = 500; // Approximate path length
  const drawProgress = loopProgress;
  const strokeDashoffset = pathLength * (1 - drawProgress);

  // Text timing: exactly at 1.5 seconds (50% through 3-second cycle) 
  const centerCrossingTime = 0.5; // Exactly when line reaches center crossing
  const textStartTime = centerCrossingTime; // Text starts exactly at center crossing
  const textDuration = 1/3; // 1 second visible out of 3-second cycle
  const textEndTime = textStartTime + textDuration;
  
  // Text fade transitions (0.3 second = 0.1 of 3-second cycle)
  const fadeTime = 0.1; // 0.3 seconds
  let textOpacity = 0;
  
  if (loopProgress >= textStartTime && loopProgress <= textEndTime) {
    if (loopProgress <= textStartTime + fadeTime) {
      // Fade in (0.3 second)
      textOpacity = (loopProgress - textStartTime) / fadeTime;
    } else if (loopProgress >= textEndTime - fadeTime) {
      // Fade out (0.3 second)
      textOpacity = (textEndTime - loopProgress) / fadeTime;
    } else {
      // Full visibility
      textOpacity = 1;
    }
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'rgb(0,0,0)', // Pure RGB black as specified
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <svg width="800" height="600" viewBox="0 0 800 600">
        {/* Hand-drawn infinity symbol line */}
        <path
          d={createInfinityPath()}
          fill="none"
          stroke="white"
          strokeWidth="3" // Exactly 3-4 pixels thick as specified  
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          strokeDashoffset={strokeDashoffset}
          opacity={1}
          filter="drop-shadow(0 0 2px white)" // 2-pixel soft glow as specified
          style={{
            // Subtle anti-aliasing effect
            shapeRendering: 'geometricPrecision'
          }}
        />

        {/* Text overlay at bottom third - appears exactly at center crossing */}
        {textOpacity > 0 && (
          <text 
            x="400" 
            y="450" // Bottom third of 600px frame
            textAnchor="middle" 
            fill="white" 
            fontSize="32" 
            fontFamily="Arial, Helvetica, sans-serif" // Clean modern sans-serif
            fontWeight="500" // Medium weight as specified
            opacity={textOpacity}
            style={{
              // Clean typography with anti-aliasing
              textRendering: 'optimizeLegibility'
            }}
          >
            Slow down &amp; refocus.
          </text>
        )}

        {/* Debug indicator - shows exact center crossing point (remove in production) */}
        {/* Uncomment to visualize timing:
        {Math.abs(loopProgress - centerCrossingTime) < 0.02 && (
          <circle cx="400" cy="300" r="3" fill="red" opacity="0.5" />
        )}
        */}
      </svg>
    </div>
  );
};