import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const ProgressNotPerfectionRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // Stages of progress vs perfection journey
  const getStage = () => {
    if (progress < 0.2) return 'start';
    if (progress < 0.45) return 'building';
    if (progress < 0.7) return 'stumbling';
    return 'accepting';
  };

  const stage = getStage();

  // Progressive building using Math.max - the proven tree technique
  const baseStep = Math.max(0, interpolate(progress, [0, 0.15], [0, 80], {
    easing: Easing.out(Easing.quad)
  }));

  const secondStep = Math.max(baseStep, interpolate(progress, [0.1, 0.3], [80, 160], {
    easing: Easing.out(Easing.cubic)
  }));

  const thirdStep = Math.max(secondStep, interpolate(progress, [0.2, 0.45], [160, 240], {
    easing: Easing.out(Easing.cubic)
  }));

  const fourthStep = Math.max(thirdStep, interpolate(progress, [0.35, 0.6], [240, 320], {
    easing: Easing.out(Easing.cubic)
  }));

  const finalStep = Math.max(fourthStep, interpolate(progress, [0.5, 0.75], [320, 400], {
    easing: Easing.out(Easing.cubic)
  }));

  // Imperfection indicators - cracks and wobbles
  const crackOpacity = Math.max(0, interpolate(progress, [0.25, 0.5], [0, 0.6], {
    easing: Easing.out(Easing.quad)
  }));

  const wobbleAmount = Math.sin(frame * 0.1) * Math.max(0, interpolate(progress, [0.3, 0.6], [0, 3]));

  // Acceptance phase - smoothing and calming
  const smoothingOpacity = Math.max(0, interpolate(progress, [0.65, 1], [0, 1], {
    easing: Easing.out(Easing.quad)
  }));

  // Master fade out for smooth ending
  const endingFadeOut = progress > 0.85 ? interpolate(progress, [0.85, 1], [1, 0], {
    easing: Easing.out(Easing.quad)
  }) : 1;

  const stepWidth = 120;
  const stepHeight = 40;
  const centerX = 304;
  const baseY = 800;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: endingFadeOut
    }}>
      <svg width="608" height="1080" viewBox="0 0 608 1080">
        
        {/* Ground line */}
        <line 
          x1="100" 
          y1={baseY} 
          x2="500" 
          y2={baseY} 
          stroke="white" 
          strokeWidth="2" 
          opacity={0.3}
        />

        {/* Step 1 - Foundation */}
        {baseStep > 0 && (
          <rect
            x={centerX - stepWidth/2}
            y={baseY - baseStep}
            width={stepWidth}
            height={stepHeight}
            fill="none"
            stroke="white"
            strokeWidth="3"
            opacity={interpolate(progress, [0, 0.15], [0, 1])}
            transform={`translate(0, ${wobbleAmount})`}
          />
        )}

        {/* Step 2 - Building momentum */}
        {secondStep > baseStep && (
          <rect
            x={centerX - stepWidth/2}
            y={baseY - secondStep}
            width={stepWidth}
            height={stepHeight}
            fill="none"
            stroke="white"
            strokeWidth="3"
            opacity={interpolate(progress, [0.1, 0.3], [0, 1])}
            transform={`translate(0, ${wobbleAmount * 0.8})`}
          />
        )}

        {/* Step 3 - Getting higher */}
        {thirdStep > secondStep && (
          <rect
            x={centerX - stepWidth/2}
            y={baseY - thirdStep}
            width={stepWidth}
            height={stepHeight}
            fill="none"
            stroke="white"
            strokeWidth="3"
            opacity={interpolate(progress, [0.2, 0.45], [0, 1])}
            transform={`translate(0, ${wobbleAmount * 0.6})`}
          />
        )}

        {/* Step 4 - Almost there */}
        {fourthStep > thirdStep && (
          <rect
            x={centerX - stepWidth/2}
            y={baseY - fourthStep}
            width={stepWidth}
            height={stepHeight}
            fill="none"
            stroke="white"
            strokeWidth="3"
            opacity={interpolate(progress, [0.35, 0.6], [0, 1])}
            transform={`translate(0, ${wobbleAmount * 0.4})`}
          />
        )}

        {/* Step 5 - Final step */}
        {finalStep > fourthStep && (
          <rect
            x={centerX - stepWidth/2}
            y={baseY - finalStep}
            width={stepWidth}
            height={stepHeight}
            fill="none"
            stroke="white"
            strokeWidth="3"
            opacity={interpolate(progress, [0.5, 0.75], [0, 1])}
            transform={`translate(0, ${wobbleAmount * 0.2})`}
          />
        )}

        {/* Imperfection cracks */}
        {crackOpacity > 0 && (
          <g opacity={crackOpacity}>
            <line 
              x1={centerX - 40} 
              y1={baseY - 40} 
              x2={centerX - 30} 
              y2={baseY - 60} 
              stroke="white" 
              strokeWidth="1" 
              opacity={0.4}
            />
            <line 
              x1={centerX + 30} 
              y1={baseY - 120} 
              x2={centerX + 40} 
              y2={baseY - 140} 
              stroke="white" 
              strokeWidth="1" 
              opacity={0.4}
            />
            <line 
              x1={centerX - 20} 
              y1={baseY - 200} 
              x2={centerX - 10} 
              y2={baseY - 220} 
              stroke="white" 
              strokeWidth="1" 
              opacity={0.4}
            />
          </g>
        )}

        {/* Perfection ghost outline - what we think we need */}
        {progress > 0.3 && progress < 0.7 && (
          <rect
            x={centerX - stepWidth/2}
            y={baseY - 500}
            width={stepWidth}
            height={80}
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="5,5"
            opacity={interpolate(progress, [0.3, 0.5, 0.7], [0, 0.3, 0])}
          />
        )}

        {/* Acceptance glow - embracing imperfection */}
        {smoothingOpacity > 0 && (
          <g opacity={smoothingOpacity}>
            <rect
              x={centerX - stepWidth/2 - 10}
              y={baseY - finalStep - 10}
              width={stepWidth + 20}
              height={finalStep + 10}
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity={0.2}
              filter="blur(2px)"
            />
          </g>
        )}

        {/* "PROGRESS" text - appears early */}
        {progress > 0.15 && (
          <text 
            x="150" 
            y="300" 
            fill="white" 
            fontSize="32" 
            fontFamily="Arial, sans-serif"
            opacity={interpolate(progress, [0.15, 0.3], [0, 1])}
            filter="drop-shadow(0 0 8px white)"
          >
            PROGRESS
          </text>
        )}

        {/* "NOT" text - appears in middle */}
        {progress > 0.4 && progress < 0.8 && (
          <text 
            x="304" 
            y="350" 
            textAnchor="middle"
            fill="red" 
            fontSize="28" 
            fontFamily="Arial, sans-serif"
            opacity={interpolate(progress, [0.4, 0.55, 0.8], [0, 1, 0])}
          >
            NOT
          </text>
        )}

        {/* "PERFECTION" text - fades away */}
        {progress > 0.45 && progress < 0.75 && (
          <text 
            x="450" 
            y="300" 
            fill="white" 
            fontSize="32" 
            fontFamily="Arial, sans-serif"
            opacity={interpolate(progress, [0.45, 0.6, 0.75], [0, 0.6, 0])}
            strokeDasharray="5,5"
          >
            PERFECTION
          </text>
        )}

        {/* Final message */}
        {progress > 0.7 && (
          <text 
            x="304" 
            y="400" 
            textAnchor="middle" 
            fill="white" 
            fontSize="24" 
            fontFamily="Arial, sans-serif"
            opacity={interpolate(progress, [0.7, 0.85], [0, 1])}
          >
            Every step counts.
          </text>
        )}

        {/* Stage indicator */}
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