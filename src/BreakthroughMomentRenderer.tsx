import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

// BREAKTHROUGH MOMENT - A different approach
// Concept: The moment when struggle transforms into clarity

export const BreakthroughMomentRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;
  const timeInSeconds = frame / 30;

  // Three distinct phases: Struggle -> Breakthrough -> Clarity
  const strugglePhase = interpolate(progress, [0, 0.4], [1, 0]);
  const breakthroughMoment = interpolate(progress, [0.35, 0.45], [0, 1]);
  const clarityPhase = interpolate(progress, [0.4, 1], [0, 1]);

  // Visual elements
  const chaosOpacity = interpolate(progress, [0, 0.4, 0.5], [0.8, 0.8, 0]);
  const lightBurst = interpolate(progress, [0.35, 0.45, 0.55], [0, 1, 0.3]);
  const orderOpacity = interpolate(progress, [0.5, 1], [0, 1]);

  // Dynamic scaling and rotation
  const chaosScale = 1 + Math.sin(timeInSeconds * 8) * 0.1; // Erratic movement
  const orderScale = interpolate(progress, [0.4, 1], [0.5, 1]);
  const lightScale = interpolate(progress, [0.35, 0.45], [0, 3]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'rgb(10,10,10)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <svg width="800" height="600" viewBox="0 0 800 600" style={{position: 'absolute'}}>
        
        {/* Phase 1: Chaos/Struggle - Jagged, broken lines */}
        {chaosOpacity > 0 && (
          <g opacity={chaosOpacity} transform={`scale(${chaosScale})`}>
            {/* Jagged struggle lines */}
            <path 
              d="M 200,300 L 250,280 L 300,320 L 350,290 L 400,310 L 450,285 L 500,305 L 550,295 L 600,315"
              fill="none"
              stroke="rgb(150,50,50)"
              strokeWidth="3"
              opacity={0.7}
            />
            <path 
              d="M 300,200 L 320,250 L 340,210 L 360,260 L 380,220 L 400,270 L 420,230 L 440,280 L 460,240"
              fill="none"
              stroke="rgb(150,50,50)"
              strokeWidth="2"
              opacity={0.5}
            />
            {/* Scattered fragments */}
            <circle cx="250" cy="200" r="3" fill="rgb(100,100,100)" opacity={0.6} />
            <circle cx="550" cy="400" r="2" fill="rgb(100,100,100)" opacity={0.4} />
            <circle cx="180" cy="350" r="2" fill="rgb(100,100,100)" opacity={0.5} />
          </g>
        )}

        {/* Phase 2: Breakthrough - Explosive light burst */}
        {lightBurst > 0 && (
          <g opacity={lightBurst}>
            {/* Central light burst */}
            <circle
              cx="400"
              cy="300"
              r={30 * lightScale}
              fill="rgba(255,255,255,0.1)"
              filter="blur(20px)"
            />
            <circle
              cx="400"
              cy="300"
              r={15 * lightScale}
              fill="rgba(255,255,255,0.3)"
              filter="blur(10px)"
            />
            <circle
              cx="400"
              cy="300"
              r={5}
              fill="white"
              opacity={0.9}
            />
            {/* Radiating lines */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
              <line
                key={angle}
                x1="400"
                y1="300"
                x2={400 + Math.cos(angle * Math.PI / 180) * 100 * lightScale}
                y2={300 + Math.sin(angle * Math.PI / 180) * 100 * lightScale}
                stroke="white"
                strokeWidth="2"
                opacity={0.7}
              />
            ))}
          </g>
        )}

        {/* Phase 3: Clarity - Clean, ordered geometry */}
        {orderOpacity > 0 && (
          <g opacity={orderOpacity} transform={`scale(${orderScale})`}>
            {/* Perfect circles - harmony */}
            <circle cx="400" cy="300" r="80" fill="none" stroke="white" strokeWidth="2" opacity={0.8} />
            <circle cx="400" cy="300" r="50" fill="none" stroke="white" strokeWidth="1.5" opacity={0.6} />
            <circle cx="400" cy="300" r="25" fill="none" stroke="white" strokeWidth="1" opacity={0.4} />
            
            {/* Sacred geometry - order from chaos */}
            <polygon
              points="400,220 460,270 440,340 360,340 340,270"
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity={0.5}
            />
          </g>
        )}
      </svg>

      {/* Text overlay */}
      <div style={{ position: 'absolute', bottom: '20%', width: '100%', textAlign: 'center', zIndex: 10 }}>
        {/* Struggle phase text */}
        {strugglePhase > 0 && (
          <div
            style={{
              color: 'rgb(200,100,100)',
              fontSize: '24px',
              fontFamily: 'Arial, sans-serif',
              opacity: strugglePhase,
              transform: `translateX(${Math.sin(timeInSeconds * 2) * 5}px)` // Shaky
            }}
          >
            resistance...
          </div>
        )}

        {/* Breakthrough moment */}
        {breakthroughMoment > 0.5 && (
          <div
            style={{
              color: 'white',
              fontSize: '36px',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              opacity: interpolate(progress, [0.4, 0.6], [0, 1]),
              filter: 'drop-shadow(0 0 20px white)'
            }}
          >
            BREAKTHROUGH
          </div>
        )}

        {/* Clarity phase text */}
        {clarityPhase > 0.7 && (
          <div
            style={{
              color: 'white',
              fontSize: '28px',
              fontFamily: 'Arial, sans-serif',
              fontWeight: '300',
              opacity: interpolate(progress, [0.7, 0.9], [0, 1]),
              marginTop: '20px'
            }}
          >
            clarity emerges
          </div>
        )}
      </div>
    </div>
  );
};