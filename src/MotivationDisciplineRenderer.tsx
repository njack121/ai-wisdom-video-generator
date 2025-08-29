import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const MotivationDisciplineRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  
  const progress = frame / durationInFrames;
  const timeInSeconds = frame / fps;

  // Phase 1: "Motivation fades." appears (0-0.5s fade in, 0.5-3s visible with breathing, 3-3.8s fade out)
  const motivationFadeIn = interpolate(timeInSeconds, [0, 0.5], [0, 1]);
  const motivationFadeOut = interpolate(timeInSeconds, [3, 3.8], [1, 0]);
  
  // Breathing animation for motivation text (95%-100%-95% over 1.5 second cycles)
  const breathingCycle = (timeInSeconds - 0.5) / 1.5; // Start breathing after fade in
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

  // Phase 2: "Discipline persists." fades in simultaneously as motivation fades out (3-3.8s)
  const disciplineFadeIn = interpolate(timeInSeconds, [3, 3.8], [0, 1]);
  const disciplineOpacity = timeInSeconds >= 3 ? disciplineFadeIn : 0;

  // Subtle geometric elements reinforcing permanence vs temporality
  const geometryOpacity = interpolate(timeInSeconds, [0, 1, 8], [0, 0.1, 0.15]);
  
  // Temporary elements (fade with motivation)
  const temporaryElementsOpacity = interpolate(timeInSeconds, [0, 1, 3, 4], [0, 0.08, 0.08, 0]);
  
  // Permanent elements (strengthen with discipline)
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
      <svg width="800" height="600" viewBox="0 0 800 600" style={{position: 'absolute', top: 0, left: 0}}>
        {/* Temporary geometric elements - circles that fade away */}
        {temporaryElementsOpacity > 0 && (
          <g opacity={temporaryElementsOpacity}>
            <circle cx="200" cy="150" r="30" fill="none" stroke="white" strokeWidth="1" opacity={0.3} />
            <circle cx="600" cy="200" r="25" fill="none" stroke="white" strokeWidth="1" opacity={0.4} />
            <circle cx="150" cy="450" r="20" fill="none" stroke="white" strokeWidth="1" opacity={0.25} />
            {/* Dashed lines - impermanent */}
            <line x1="100" y1="100" x2="200" y2="150" stroke="white" strokeWidth="1" opacity={0.2} strokeDasharray="5,5" />
            <line x1="600" y1="450" x2="700" y2="400" stroke="white" strokeWidth="1" opacity={0.2} strokeDasharray="5,5" />
          </g>
        )}

        {/* Permanent geometric elements - solid shapes that strengthen */}
        {permanentElementsOpacity > 0 && (
          <g opacity={permanentElementsOpacity}>
            {/* Solid triangles - stability */}
            <polygon points="100,500 150,400 200,500" fill="none" stroke="white" strokeWidth="2" opacity={0.3} />
            <polygon points="600,100 650,50 700,100" fill="none" stroke="white" strokeWidth="2" opacity={0.3} />
            {/* Solid lines - permanence */}
            <line x1="50" y1="300" x2="150" y2="300" stroke="white" strokeWidth="2" opacity={0.25} />
            <line x1="650" y1="300" x2="750" y2="300" stroke="white" strokeWidth="2" opacity={0.25} />
            {/* Foundation rectangles */}
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

      {/* Subtle overlay effects for emotional contrast */}
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