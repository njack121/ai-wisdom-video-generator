import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const TestSVGComponent: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;
  const scale = interpolate(progress, [0, 1], [0.5, 1.5]);
  const rotation = interpolate(frame, [0, durationInFrames], [0, 360]);
  const opacity = interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.8]);

  // Create a motivational geometric pattern
  const motivationalSVG = `
    <svg viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#00ff00;stop-opacity:0.3" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="none" stroke="#00ff00" stroke-width="3" opacity="0.8"/>
      <circle cx="100" cy="100" r="60" fill="none" stroke="#00ff00" stroke-width="2" opacity="0.6"/>
      <circle cx="100" cy="100" r="40" fill="none" stroke="#00ff00" stroke-width="2" opacity="0.4"/>
      <circle cx="100" cy="100" r="20" fill="url(#centerGlow)" opacity="0.9"/>
      <polygon points="100,60 120,140 80,140" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.7"/>
    </svg>
  `;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Simple test SVG */}
      <div
        style={{
          width: '400px',
          height: '400px',
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          opacity: opacity,
          filter: 'drop-shadow(0 0 20px #00ff00)'
        }}
        dangerouslySetInnerHTML={{ __html: motivationalSVG }}
      />
      
      {/* Motivational text overlay */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#00ff00',
        fontSize: '28px',
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        textShadow: '0 0 15px #00ff00',
        opacity: opacity * 0.9
      }}>
        NEVER GIVE UP
      </div>
    </div>
  );
};