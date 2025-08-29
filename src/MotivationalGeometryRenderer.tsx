import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const MotivationalGeometryRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // Ethereal glow intensity that builds over time
  const glowIntensity = interpolate(progress, [0, 1], [8, 20]);
  const baseOpacity = interpolate(progress, [0, 0.15, 1], [0, 1, 1]);

  // Three phases of geometric revelation
  const phase1 = interpolate(progress, [0, 0.4], [0, 1]); // Center circle + triangle
  const phase2 = interpolate(progress, [0.3, 0.7], [0, 1]); // Outer ring + hexagon
  const phase3 = interpolate(progress, [0.6, 1], [0, 1]); // Sacred geometry completion

  const centerX = 400;
  const centerY = 300;

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
        {/* Phase 1: Center circle with inner triangle (Unity & Direction) */}
        {phase1 > 0 && (
          <g opacity={phase1 * baseOpacity}>
            {/* Central circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r="40"
              fill="none"
              stroke="white"
              strokeWidth="3"
              opacity={phase1}
              filter={`drop-shadow(0 0 ${glowIntensity}px white)`}
            />
            
            {/* Inner triangle - pointing upward (aspiration) */}
            <polygon
              points={`${centerX},${centerY-25} ${centerX-20},${centerY+15} ${centerX+20},${centerY+15}`}
              fill="none"
              stroke="white"
              strokeWidth="2"
              opacity={phase1 * 0.8}
              filter={`drop-shadow(0 0 ${glowIntensity * 0.7}px white)`}
            />
            
            {/* Center dot - meditation focus */}
            <circle
              cx={centerX}
              cy={centerY}
              r="2"
              fill="white"
              opacity={phase1 * 0.9}
              filter={`drop-shadow(0 0 6px white)`}
            />
          </g>
        )}

        {/* Phase 2: Outer ring with hexagon (Harmony & Structure) */}
        {phase2 > 0 && (
          <g opacity={phase2 * baseOpacity}>
            {/* Outer circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r="80"
              fill="none"
              stroke="white"
              strokeWidth="2"
              opacity={phase2 * 0.7}
              filter={`drop-shadow(0 0 ${glowIntensity * 0.8}px white)`}
            />
            
            {/* Hexagon - perfect balance */}
            <polygon
              points={
                [0, 1, 2, 3, 4, 5].map(i => {
                  const angle = (i * Math.PI) / 3;
                  const x = centerX + 60 * Math.cos(angle);
                  const y = centerY + 60 * Math.sin(angle);
                  return `${x},${y}`;
                }).join(' ')
              }
              fill="none"
              stroke="white"
              strokeWidth="2"
              opacity={phase2 * 0.6}
              filter={`drop-shadow(0 0 ${glowIntensity * 0.6}px white)`}
            />
          </g>
        )}

        {/* Phase 3: Sacred geometry completion (Infinite Potential) */}
        {phase3 > 0 && (
          <g opacity={phase3 * baseOpacity}>
            {/* Outermost circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r="120"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              opacity={phase3 * 0.5}
              filter={`drop-shadow(0 0 ${glowIntensity * 0.5}px white)`}
            />
            
            {/* Six petals of flower of life pattern */}
            {[0, 1, 2, 3, 4, 5].map(i => {
              const angle = (i * Math.PI) / 3;
              const x = centerX + 40 * Math.cos(angle);
              const y = centerY + 40 * Math.sin(angle);
              
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="20"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  opacity={phase3 * 0.4}
                  filter={`drop-shadow(0 0 ${glowIntensity * 0.3}px white)`}
                />
              );
            })}
            
            {/* Connecting lines - creating web of unity */}
            {[0, 1, 2].map(i => {
              const angle1 = (i * 2 * Math.PI) / 3;
              const angle2 = ((i + 3) * 2 * Math.PI) / 3;
              const x1 = centerX + 100 * Math.cos(angle1);
              const y1 = centerY + 100 * Math.sin(angle1);
              const x2 = centerX + 100 * Math.cos(angle2);
              const y2 = centerY + 100 * Math.sin(angle2);
              
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="white"
                  strokeWidth="0.5"
                  opacity={phase3 * 0.3}
                  filter={`drop-shadow(0 0 ${glowIntensity * 0.2}px white)`}
                />
              );
            })}
          </g>
        )}

        {/* Motivational text revelation */}
        {progress > 0.3 && (
          <text 
            x={centerX}
            y="480"
            textAnchor="middle" 
            fill="white" 
            fontSize="20" 
            fontFamily="Arial, sans-serif"
            fontWeight="300"
            letterSpacing="3px"
            opacity={interpolate(progress, [0.3, 0.6], [0, 0.8])}
            filter={`drop-shadow(0 0 12px white)`}
          >
            INFINITE POTENTIAL
          </text>
        )}

        {progress > 0.6 && (
          <text 
            x={centerX}
            y="510"
            textAnchor="middle" 
            fill="white" 
            fontSize="14" 
            fontFamily="Arial, sans-serif"
            opacity={interpolate(progress, [0.6, 0.9], [0, 0.6])}
            letterSpacing="2px"
          >
            WITHIN SACRED GEOMETRY
          </text>
        )}

        {/* Final philosophical element */}
        {progress > 0.8 && (
          <g opacity={interpolate(progress, [0.8, 1], [0, 0.4])}>
            {/* Four cardinal direction dots */}
            <circle cx={centerX} cy={centerY - 140} r="1.5" fill="white" filter="drop-shadow(0 0 4px white)" />
            <circle cx={centerX + 140} cy={centerY} r="1.5" fill="white" filter="drop-shadow(0 0 4px white)" />
            <circle cx={centerX} cy={centerY + 140} r="1.5" fill="white" filter="drop-shadow(0 0 4px white)" />
            <circle cx={centerX - 140} cy={centerY} r="1.5" fill="white" filter="drop-shadow(0 0 4px white)" />
          </g>
        )}

        {/* Zen breathing indicator - subtle pulsing */}
        {progress > 0.9 && (
          <circle
            cx={centerX}
            cy={centerY}
            r={2 + Math.sin(frame * 0.1) * 0.5}
            fill="white"
            opacity={0.6 + Math.sin(frame * 0.1) * 0.2}
            filter="drop-shadow(0 0 8px white)"
          />
        )}
      </svg>
    </div>
  );
};