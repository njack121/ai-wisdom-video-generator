import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

// AUTO-GENERATED COMPONENT FOR: "focus defeats distraction"
// Symbolic meaning: Geometric evolution representing focus defeats distraction
// Story arc: Visual journey showing the essence of focus defeats distraction through mathematical beauty
// Emotional journey: awareness → understanding → integration

export const FocusDefeatsDistractionRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;
  const timeInSeconds = frame / 30; // 30fps

  // beginning of journey
  const firstelementappearsOpacity = interpolate(progress, [0, 0.1, 0.2], [0, 1, 1]);
  // full understanding
  const complexitypeakOpacity = interpolate(progress, [0.4, 0.5, 0.6], [0, 1, 1]);
  // integration complete
  const textrevelationOpacity = interpolate(progress, [0.7, 0.8, 0.9], [0, 1, 1]);

  // emergence of awareness
  const fadeinProgress = interpolate(timeInSeconds, [0, 1], [0, 1]);
  // growth and understanding
  const geometricevolutionProgress = interpolate(timeInSeconds, [1, 4], [0, 1]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'rgb(0,0,0)', // Pure black for spiritual depth
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <svg width="800" height="600" viewBox="0 0 800 600" style={{position: 'absolute', top: 0, left: 0}}>
        {/* Symbolic visual elements representing: Geometric evolution representing focus defeats distraction */}
        {/* circle: wholeness and potential */}
        <circle
          cx={400}
          cy={300}
          r={30}
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity={interpolate(progress, [0, 0.2], [0, 1])}
          filter="drop-shadow(0 0 8px white)"
        />

        {/* lines: connection and progress */}
        <line
          x1={350}
          y1={300}
          x2={450}
          y2={300}
          stroke="white"
          strokeWidth="3"
          opacity={interpolate(progress, [0.2, 0.4], [0, 1])}
          filter="drop-shadow(0 0 4px white)"
        />
      </svg>


      {/* Typography: crystallized wisdom */}
      {progress > 0.7 && (
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            width: '100%',
            textAlign: 'center',
            color: 'white',
            fontSize: '32px',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontWeight: 'light',
            opacity: interpolate(progress, [0.7, 0.7999999999999999], [0, 1]),
            filter: 'drop-shadow(0 0 10px white)',
            textRendering: 'optimizeLegibility'
          }}
        >
          focus defeats distraction
        </div>
      )}

      {/* Symbolic meaning: Fallback symbolic analysis focusing on universal geometric metaphors for focus defeats distraction */}
    </div>
  );
};