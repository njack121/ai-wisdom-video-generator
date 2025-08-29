import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const SimplePingPongRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // Longer stages with proper ending hold AND fade out
  const getStage = () => {
    if (progress < 0.15) return 'setup';
    if (progress < 0.4) return 'losing';
    if (progress < 0.6) return 'fighting';
    if (progress < 0.85) return 'winning';
    return 'ending';
  };

  const stage = getStage();

  // Build to completion by 60%, hold until 85%, then fade out
  const tableOpacity = Math.max(0, interpolate(progress, [0, 0.1], [0, 1], {
    easing: Easing.out(Easing.quad)
  }));

  const ballBounces = Math.max(0, interpolate(progress, [0.08, 0.35], [0, 6], {
    easing: Easing.out(Easing.cubic)
  }));

  const scoreDisplay = Math.max(ballBounces, interpolate(progress, [0.15, 0.5], [6, 8], {
    easing: Easing.out(Easing.cubic)
  }));

  // Win happens at 55% and HOLDS until 85%, then all elements fade out
  const finalWin = Math.max(scoreDisplay, interpolate(progress, [0.55, 0.65], [8, 11], {
    easing: Easing.out(Easing.cubic)
  }));

  // Master fade out - everything fades together at the end
  const endingFadeOut = progress > 0.85 ? interpolate(progress, [0.85, 1], [1, 0], {
    easing: Easing.out(Easing.quad)
  }) : 1;

  // Simple ball position - just bouncing left and right
  const ballX = 304 + Math.sin(progress * Math.PI * ballBounces) * 150;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: endingFadeOut // Master fade out applied to entire container
    }}>
      <svg width="608" height="1080" viewBox="0 0 608 1080">
        
        {/* Table - simple like tree ground line */}
        {tableOpacity > 0 && (
          <>
            <rect 
              x="104" 
              y="500" 
              width="400" 
              height="120" 
              fill="none" 
              stroke="white" 
              strokeWidth="3"
              opacity={tableOpacity}
            />
            <line 
              x1="304" 
              y1="500" 
              x2="304" 
              y2="620" 
              stroke="white" 
              strokeWidth="2"
              opacity={tableOpacity * 0.8}
            />
          </>
        )}

        {/* Ball - visible longer */}
        {ballBounces > 0 && (
          <circle
            cx={ballX}
            cy={480}
            r={8}
            fill="white"
            opacity={interpolate(progress, [0.1, 0.2], [0, 1])}
          />
        )}

        {/* Score - visible much longer so you can see the progression */}
        {scoreDisplay > ballBounces && (
          <>
            <text x="100" y="200" fill="white" fontSize="48" fontFamily="Arial, sans-serif" opacity={0.9}>
              {Math.floor(scoreDisplay)}
            </text>
            <text x="450" y="200" fill="white" fontSize="48" fontFamily="Arial, sans-serif" opacity={0.9}>
              10
            </text>
            {/* Show you're behind for longer */}
            {progress < 0.55 && (
              <text x="304" y="250" textAnchor="middle" fill="red" fontSize="24" fontFamily="Arial, sans-serif" opacity={0.7}>
                YOU'RE BEHIND
              </text>
            )}
          </>
        )}

        {/* Win moment - comes in at 55% and STAYS until fade out */}
        {finalWin > scoreDisplay && (
          <text 
            x="304" 
            y="350" 
            textAnchor="middle" 
            fill="lime" 
            fontSize="42" 
            fontFamily="Arial, sans-serif"
            opacity={interpolate(progress, [0.55, 0.6], [0, 1])}
            filter="drop-shadow(0 0 10px lime)"
          >
            11-10 COMEBACK!
          </text>
        )}

        {/* Final message - appears at 65% and HOLDS until fade out */}
        {progress > 0.65 && (
          <text 
            x="304" 
            y="400" 
            textAnchor="middle" 
            fill="white" 
            fontSize="28" 
            fontFamily="Arial, sans-serif"
            opacity={interpolate(progress, [0.65, 0.7], [0, 1])}
          >
            Never give up.
          </text>
        )}

        {/* Stage indicator like tree */}
        <text 
          x="304" 
          y="950" 
          textAnchor="middle" 
          fill="white" 
          fontSize="24" 
          fontFamily="Arial, sans-serif"
          opacity={0.8}
        >
          {stage.toUpperCase()}
        </text>

      </svg>
    </div>
  );
};