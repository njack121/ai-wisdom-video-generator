import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const SacredGeometryRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // Four stages: DAY 1 → WEEK 1 → MONTH 1 → YEAR 1
  const getStage = () => {
    if (progress < 0.25) return 'day1';
    if (progress < 0.5) return 'week1';
    if (progress < 0.75) return 'month1';
    return 'year1';
  };

  const stage = getStage();
  
  // Get smooth progress within current stage
  let stageProgress = 0;
  if (stage === 'day1') {
    stageProgress = progress / 0.25;
  } else if (stage === 'week1') {
    stageProgress = (progress - 0.25) / 0.25;
  } else if (stage === 'month1') {
    stageProgress = (progress - 0.5) / 0.25;
  } else {
    stageProgress = (progress - 0.75) / 0.25;
  }

  // Ethereal glow effect - gets stronger over time
  const glowIntensity = interpolate(progress, [0, 1], [10, 25]);
  const baseOpacity = interpolate(progress, [0, 0.1, 1], [0, 0.9, 1]);

  const renderSacredGeometry = () => {
    const centerX = 400;
    const centerY = 300;
    const baseRadius = 60;

    switch (stage) {
      case 'day1':
        // Single circle - growing from nothing
        const radius1 = interpolate(stageProgress, [0, 1], [0, baseRadius]);
        const opacity1 = interpolate(stageProgress, [0, 0.3, 1], [0, 0.8, 1]) * baseOpacity;
        
        return (
          <g>
            {radius1 > 0 && (
              <circle
                cx={centerX}
                cy={centerY}
                r={radius1}
                fill="none"
                stroke="white"
                strokeWidth="3"
                opacity={opacity1}
                filter={`drop-shadow(0 0 ${glowIntensity}px white)`}
              />
            )}
          </g>
        );

      case 'week1':
        // Two interlocking rings
        const radius2 = baseRadius;
        const separation = interpolate(stageProgress, [0, 1], [0, baseRadius * 0.8]);
        const opacity2 = baseOpacity;
        
        return (
          <g>
            {/* First circle (from previous stage) */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius2}
              fill="none"
              stroke="white"
              strokeWidth="3"
              opacity={opacity2}
              filter={`drop-shadow(0 0 ${glowIntensity}px white)`}
            />
            
            {/* Second circle appears and moves */}
            {separation > 0 && (
              <circle
                cx={centerX + separation}
                cy={centerY}
                r={radius2}
                fill="none"
                stroke="white"
                strokeWidth="3"
                opacity={interpolate(stageProgress, [0, 0.3, 1], [0, 0.8, 1]) * baseOpacity}
                filter={`drop-shadow(0 0 ${glowIntensity}px white)`}
              />
            )}
          </g>
        );

      case 'month1':
        // Multiple intersecting rings forming rosette pattern
        const radius3 = baseRadius;
        const ringCount = Math.floor(interpolate(stageProgress, [0, 1], [2, 6]));
        const rosetteSeparation = baseRadius * 0.8;
        
        const rings = [];
        for (let i = 0; i < ringCount; i++) {
          const angle = (i * 2 * Math.PI) / 6; // 6 rings max in rosette
          const x = centerX + Math.cos(angle) * rosetteSeparation;
          const y = centerY + Math.sin(angle) * rosetteSeparation;
          const ringOpacity = interpolate(stageProgress, [i * 0.15, (i + 1) * 0.15], [0, 1]) * baseOpacity;
          
          if (i < 2) {
            // First two rings from previous stage
            rings.push(
              <circle
                key={i}
                cx={i === 0 ? centerX : centerX + rosetteSeparation}
                cy={centerY}
                r={radius3}
                fill="none"
                stroke="white"
                strokeWidth="3"
                opacity={baseOpacity}
                filter={`drop-shadow(0 0 ${glowIntensity}px white)`}
              />
            );
          } else if (ringOpacity > 0) {
            rings.push(
              <circle
                key={i}
                cx={x}
                cy={y}
                r={radius3}
                fill="none"
                stroke="white"
                strokeWidth="3"
                opacity={ringOpacity}
                filter={`drop-shadow(0 0 ${glowIntensity}px white)`}
              />
            );
          }
        }
        
        return <g>{rings}</g>;

      case 'year1':
        // Intricate seed of life pattern with many overlapping circles
        const radius4 = baseRadius;
        const seedSeparation = baseRadius * 0.8;
        
        // Seed of Life: center + 6 surrounding + 12 outer ring
        const seedCircles = [];
        
        // Center circle
        seedCircles.push(
          <circle
            key="center"
            cx={centerX}
            cy={centerY}
            r={radius4}
            fill="none"
            stroke="white"
            strokeWidth="3"
            opacity={baseOpacity}
            filter={`drop-shadow(0 0 ${glowIntensity}px white)`}
          />
        );
        
        // Inner 6 circles (Flower of Life core)
        for (let i = 0; i < 6; i++) {
          const angle = (i * 2 * Math.PI) / 6;
          const x = centerX + Math.cos(angle) * seedSeparation;
          const y = centerY + Math.sin(angle) * seedSeparation;
          const appearTime = i * 0.1;
          const circleOpacity = interpolate(stageProgress, [appearTime, appearTime + 0.2], [0, 1]) * baseOpacity;
          
          if (circleOpacity > 0) {
            seedCircles.push(
              <circle
                key={`inner-${i}`}
                cx={x}
                cy={y}
                r={radius4}
                fill="none"
                stroke="white"
                strokeWidth="3"
                opacity={circleOpacity}
                filter={`drop-shadow(0 0 ${glowIntensity}px white)`}
              />
            );
          }
        }
        
        // Outer ring (partial seed of life extension)
        const outerRingCount = Math.floor(interpolate(stageProgress, [0.6, 1], [0, 12]));
        const outerRadius = seedSeparation * 1.732; // √3 for proper geometric spacing
        
        for (let i = 0; i < outerRingCount; i++) {
          const angle = (i * 2 * Math.PI) / 12;
          const x = centerX + Math.cos(angle) * outerRadius;
          const y = centerY + Math.sin(angle) * outerRadius;
          const appearTime = 0.6 + (i * 0.03);
          const circleOpacity = interpolate(stageProgress, [appearTime, appearTime + 0.1], [0, 0.7]) * baseOpacity;
          
          if (circleOpacity > 0) {
            seedCircles.push(
              <circle
                key={`outer-${i}`}
                cx={x}
                cy={y}
                r={radius4 * 0.8}
                fill="none"
                stroke="white"
                strokeWidth="2"
                opacity={circleOpacity}
                filter={`drop-shadow(0 0 ${glowIntensity * 0.8}px white)`}
              />
            );
          }
        }
        
        return <g>{seedCircles}</g>;

      default:
        return null;
    }
  };

  // Get stage label
  const getStageLabel = () => {
    switch (stage) {
      case 'day1': return 'DAY 1';
      case 'week1': return 'WEEK 1';
      case 'month1': return 'MONTH 1';
      case 'year1': return 'YEAR 1';
      default: return '';
    }
  };

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
        {/* Sacred geometry */}
        {renderSacredGeometry()}
        
        {/* Stage label */}
        <text 
          x="400" 
          y="100" 
          textAnchor="middle" 
          fill="white" 
          fontSize="32" 
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          opacity={interpolate(progress, [0, 0.1, 0.9, 1], [0, 0.9, 1, 0.8])}
          filter={`drop-shadow(0 0 15px white)`}
        >
          {getStageLabel()}
        </text>
        
        {/* Sacred geometry description */}
        <text 
          x="400" 
          y="520" 
          textAnchor="middle" 
          fill="white" 
          fontSize="18" 
          fontFamily="Arial, sans-serif"
          opacity={0.7}
        >
          {stage === 'day1' ? 'UNITY' :
           stage === 'week1' ? 'DUALITY' :
           stage === 'month1' ? 'HARMONY' : 'INFINITY'}
        </text>
        
        {/* Subtitle */}
        <text 
          x="400" 
          y="540" 
          textAnchor="middle" 
          fill="white" 
          fontSize="14" 
          fontFamily="Arial, sans-serif"
          opacity={0.5}
          letterSpacing="2px"
        >
          SACRED GEOMETRY EVOLUTION
        </text>
      </svg>
    </div>
  );
};