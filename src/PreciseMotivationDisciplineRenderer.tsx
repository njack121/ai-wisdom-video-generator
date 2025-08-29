import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

// GENERATED FROM YOUR DETAILED PROMPT
// Concept: motivation vs discipline with precise timing
// Style: Minimalist dark charcoal with exact typography specifications

export const PreciseMotivationDisciplineRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  
  const timeInSeconds = frame / fps;

  // PHASE 1: "Motivation fades." (0-0.5s fade in, 0.5-3s visible with breathing, 3-3.8s fade out)
  const motivationFadeIn = interpolate(timeInSeconds, [0, 0.5], [0, 1]);
  const motivationFadeOut = interpolate(timeInSeconds, [3, 3.8], [1, 0]);
  
  // Breathing animation (95%-100%-95% over 1.5 second cycles)
  const breathingCycle = (timeInSeconds - 0.5) / 1.5;
  const breathingOpacity = timeInSeconds > 0.5 && timeInSeconds < 3 ? 
    0.95 + 0.05 * Math.sin(breathingCycle * 2 * Math.PI) : 1;
  
  // Final motivation opacity combining all effects
  let motivationOpacity = 1;
  if (timeInSeconds <= 0.5) {
    motivationOpacity = motivationFadeIn;
  } else if (timeInSeconds >= 3 && timeInSeconds <= 3.8) {
    motivationOpacity = motivationFadeOut;
  } else if (timeInSeconds > 3.8) {
    motivationOpacity = 0;
  } else {
    motivationOpacity = breathingOpacity;
  }

  // PHASE 2: "Discipline persists." (simultaneous fade in as motivation fades out)
  const disciplineFadeIn = interpolate(timeInSeconds, [3, 3.8], [0, 1]);
  const disciplineOpacity = timeInSeconds >= 3 ? disciplineFadeIn : 0;

  // Geometric elements for permanence vs temporality theme
  const temporaryElementsOpacity = interpolate(timeInSeconds, [0, 1, 3, 4], [0, 0.08, 0.08, 0]);
  const permanentElementsOpacity = interpolate(timeInSeconds, [3, 4, 8], [0, 0.12, 0.2]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'rgb(25,25,25)', // Dark charcoal as specified
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Subtle geometric elements reinforcing permanence vs temporality */}
      <svg width="800" height="600" viewBox="0 0 800 600" style={{position: 'absolute', top: 0, left: 0}}>
        {/* Temporary elements that fade with motivation */}
        {temporaryElementsOpacity > 0 && (
          <g opacity={temporaryElementsOpacity}>
            <circle cx="200" cy="150" r="30" fill="none" stroke="white" strokeWidth="1" opacity={0.3} />
            <circle cx="600" cy="200" r="25" fill="none" stroke="white" strokeWidth="1" opacity={0.4} />
            <line x1="100" y1="100" x2="200" y2="150" stroke="white" strokeWidth="1" opacity={0.2} strokeDasharray="5,5" />
          </g>
        )}

        {/* Permanent elements that strengthen with discipline */}
        {permanentElementsOpacity > 0 && (
          <g opacity={permanentElementsOpacity}>
            <polygon points="100,500 150,400 200,500" fill="none" stroke="white" strokeWidth="2" opacity={0.3} />
            <line x1="50" y1="300" x2="150" y2="300" stroke="white" strokeWidth="2" opacity={0.25} />
            <rect x="300" y="480" width="200" height="8" fill="none" stroke="white" strokeWidth="1" opacity={0.2} />
          </g>
        )}
      </svg>

      <div style={{
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        {/* "Motivation fades." - appears first with breathing animation */}
        {motivationOpacity > 0 && (
          <div
            style={{
              color: 'white',
              fontSize: '32px', // 32pt as specified
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: '300', // Light weight as specified
              opacity: motivationOpacity,
              textAlign: 'center',
              transition: timeInSeconds <= 0.5 || (timeInSeconds >= 3 && timeInSeconds <= 3.8) ? 'opacity 0.1s ease-out' : 'none',
              textRendering: 'optimizeLegibility'
            }}
          >
            Motivation fades.
          </div>
        )}

        {/* "Discipline persists." - appears below with stronger presence */}
        {disciplineOpacity > 0 && (
          <div
            style={{
              color: 'white',
              fontSize: '36px', // 36pt as specified
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: 'bold', // Bold weight as specified
              opacity: disciplineOpacity,
              textAlign: 'center',
              marginTop: '40px', // 40px below first line as specified
              transition: 'opacity 0.1s ease-out',
              textRendering: 'optimizeLegibility'
            }}
          >
            Discipline persists.
          </div>
        )}
      </div>

      {/* Subtle overlay for emotional contrast */}
      {timeInSeconds > 3 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle at center, rgba(255,255,255,${interpolate(timeInSeconds, [3, 4], [0, 0.02])}) 0%, transparent 60%)`,
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      )}
    </div>
  );
};