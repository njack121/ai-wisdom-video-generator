import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const ProgressNotPerfectionSimpleRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // Single clear metaphor: steps building upward but imperfect
  // Like the tree - each element builds on the previous using Math.max

  const groundLine = Math.max(0, interpolate(progress, [0, 0.15], [0, 1], {
    easing: Easing.out(Easing.quad)
  }));

  const step1Height = Math.max(0, interpolate(progress, [0.1, 0.3], [0, 40], {
    easing: Easing.out(Easing.cubic)
  }));

  const step2Height = Math.max(step1Height, interpolate(progress, [0.25, 0.45], [40, 80], {
    easing: Easing.out(Easing.cubic)
  }));

  const step3Height = Math.max(step2Height, interpolate(progress, [0.4, 0.6], [80, 120], {
    easing: Easing.out(Easing.cubic)
  }));

  const step4Height = Math.max(step3Height, interpolate(progress, [0.55, 0.75], [120, 160], {
    easing: Easing.out(Easing.cubic)
  }));

  const finalStep = Math.max(step4Height, interpolate(progress, [0.7, 0.85], [160, 200], {
    easing: Easing.out(Easing.cubic)
  }));

  // Imperfection wobbles - like cracks in the tree
  const wobble1 = Math.sin(frame * 0.05) * Math.max(0, interpolate(progress, [0.3, 0.6], [0, 2]));
  const wobble2 = Math.cos(frame * 0.03) * Math.max(0, interpolate(progress, [0.5, 0.8], [0, 3]));

  // Text progression
  const progressText = progress > 0.6 ? interpolate(progress, [0.6, 0.75], [0, 1]) : 0;
  const notText = progress > 0.75 ? interpolate(progress, [0.75, 0.9], [0, 1]) : 0;

  // Master fade out
  const endingFadeOut = progress > 0.9 ? interpolate(progress, [0.9, 1], [1, 0], {
    easing: Easing.out(Easing.quad)
  }) : 1;

  const baseY = 800;
  const centerX = 304;
  const stepWidth = 80;

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
        
        {/* Ground line - like tree ground */}
        {groundLine > 0 && (
          <line 
            x1="150" 
            y1={baseY} 
            x2="450" 
            y2={baseY} 
            stroke="white" 
            strokeWidth="2" 
            opacity={groundLine * 0.3}
          />
        )}

        {/* Step 1 - Foundation but imperfect */}
        {step1Height > 0 && (
          <rect
            x={centerX - stepWidth/2}
            y={baseY - step1Height + wobble1}
            width={stepWidth}
            height={step1Height}
            fill="none"
            stroke="white"
            strokeWidth="3"
            opacity={interpolate(progress, [0.1, 0.3], [0, 1])}
          />
        )}

        {/* Step 2 - Building but wobbly */}
        {step2Height > step1Height && (
          <rect
            x={centerX - stepWidth/2 + 5}
            y={baseY - step2Height + wobble1 * 0.8}
            width={stepWidth - 10}
            height={step2Height - step1Height}
            fill="none"
            stroke="white"
            strokeWidth="3"
            opacity={interpolate(progress, [0.25, 0.45], [0, 1])}
          />
        )}

        {/* Step 3 - Getting higher, still imperfect */}
        {step3Height > step2Height && (
          <rect
            x={centerX - stepWidth/2 - 3}
            y={baseY - step3Height + wobble2}
            width={stepWidth + 6}
            height={step3Height - step2Height}
            fill="none"
            stroke="white"
            strokeWidth="3"
            opacity={interpolate(progress, [0.4, 0.6], [0, 1])}
          />
        )}

        {/* Step 4 - Almost there */}
        {step4Height > step3Height && (
          <rect
            x={centerX - stepWidth/2 + 8}
            y={baseY - step4Height + wobble2 * 0.6}
            width={stepWidth - 16}
            height={step4Height - step3Height}
            fill="none"
            stroke="white"
            strokeWidth="3"
            opacity={interpolate(progress, [0.55, 0.75], [0, 1])}
          />
        )}

        {/* Final step - Highest but still not perfect */}
        {finalStep > step4Height && (
          <rect
            x={centerX - stepWidth/2 + 2}
            y={baseY - finalStep + wobble1 * 0.3}
            width={stepWidth - 4}
            height={finalStep - step4Height}
            fill="none"
            stroke="white"
            strokeWidth="3"
            opacity={interpolate(progress, [0.7, 0.85], [0, 1])}
          />
        )}

        {/* Small imperfection marks */}
        {progress > 0.4 && (
          <g opacity={interpolate(progress, [0.4, 0.6], [0, 0.6])}>
            <line x1={centerX - 20} y1={baseY - 30} x2={centerX - 15} y2={baseY - 35} stroke="white" strokeWidth="1" />
            <line x1={centerX + 15} y1={baseY - 70} x2={centerX + 20} y2={baseY - 75} stroke="white" strokeWidth="1" />
            <line x1={centerX - 10} y1={baseY - 110} x2={centerX - 5} y2={baseY - 115} stroke="white" strokeWidth="1" />
          </g>
        )}

        {/* PROGRESS text */}
        {progressText > 0 && (
          <text 
            x="304" 
            y="300" 
            textAnchor="middle"
            fill="white" 
            fontSize="42" 
            fontFamily="Arial, sans-serif"
            opacity={progressText}
            filter="drop-shadow(0 0 10px white)"
          >
            PROGRESS
          </text>
        )}

        {/* NOT PERFECTION text */}
        {notText > 0 && (
          <text 
            x="304" 
            y="400" 
            textAnchor="middle"
            fill="white" 
            fontSize="24" 
            fontFamily="Arial, sans-serif"
            opacity={notText}
          >
            Not Perfection
          </text>
        )}

        {/* Stage indicator like tree */}
        <text 
          x="304" 
          y="950" 
          textAnchor="middle" 
          fill="white" 
          fontSize="20" 
          fontFamily="Arial, sans-serif"
          opacity={0.6}
        >
          {progress < 0.3 ? 'START' : progress < 0.6 ? 'BUILDING' : progress < 0.85 ? 'CLIMBING' : 'GROWING'}
        </text>

      </svg>
    </div>
  );
};