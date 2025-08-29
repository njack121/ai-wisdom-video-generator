import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const SlowSteadyWinsRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // Two paths: Motivation (sporadic) vs Discipline (steady)
  // Using proven tree technique with Math.max progressive building

  const baseY = 800;
  const centerX = 304;

  // DISCIPLINE PATH (Right side) - Slow but steady, consistent small steps
  const disciplineStep1 = Math.max(0, interpolate(progress, [0.1, 0.25], [0, 30], {
    easing: Easing.out(Easing.quad)
  }));

  const disciplineStep2 = Math.max(disciplineStep1, interpolate(progress, [0.2, 0.35], [30, 60], {
    easing: Easing.out(Easing.quad)
  }));

  const disciplineStep3 = Math.max(disciplineStep2, interpolate(progress, [0.3, 0.45], [60, 90], {
    easing: Easing.out(Easing.quad)
  }));

  const disciplineStep4 = Math.max(disciplineStep3, interpolate(progress, [0.4, 0.55], [90, 120], {
    easing: Easing.out(Easing.quad)
  }));

  const disciplineStep5 = Math.max(disciplineStep4, interpolate(progress, [0.5, 0.65], [120, 150], {
    easing: Easing.out(Easing.quad)
  }));

  const disciplineStep6 = Math.max(disciplineStep5, interpolate(progress, [0.6, 0.75], [150, 180], {
    easing: Easing.out(Easing.quad)
  }));

  const disciplineFinal = Math.max(disciplineStep6, interpolate(progress, [0.7, 0.85], [180, 220], {
    easing: Easing.out(Easing.quad)
  }));

  // MOTIVATION PATH (Left side) - Big bursts then stops, peaks early
  const motivationBurst1 = Math.max(0, interpolate(progress, [0.05, 0.15], [0, 60], {
    easing: Easing.out(Easing.cubic)
  }));

  // Long pause, then another burst but smaller
  const motivationBurst2 = Math.max(motivationBurst1, interpolate(progress, [0.35, 0.45], [60, 90], {
    easing: Easing.out(Easing.cubic)
  }));

  // Another long pause, then tiny final burst - motivation plateaus/declines
  const motivationBurst3 = Math.max(motivationBurst2, interpolate(progress, [0.65, 0.75], [90, 100], {
    easing: Easing.out(Easing.cubic)
  }));

  // Text reveals
  const motivationLabel = progress > 0.2 ? interpolate(progress, [0.2, 0.35], [0, 1]) : 0;
  const disciplineLabel = progress > 0.3 ? interpolate(progress, [0.3, 0.45], [0, 1]) : 0;
  const finalMessage = progress > 0.8 ? interpolate(progress, [0.8, 0.95], [0, 1]) : 0;

  // Step indicators for discipline path
  const stepWidth = 40;
  const stepHeight = 25;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <svg width="608" height="1080" viewBox="0 0 608 1080">
        
        {/* Center divider */}
        <line 
          x1={centerX} 
          y1="150" 
          x2={centerX} 
          y2={baseY + 50} 
          stroke="white" 
          strokeWidth="1"
          opacity={0.3}
        />

        {/* Ground line */}
        <line 
          x1="50" 
          y1={baseY} 
          x2="550" 
          y2={baseY} 
          stroke="white" 
          strokeWidth="2" 
          opacity={0.3}
        />

        {/* MOTIVATION PATH (Left side) - Sporadic big jumps */}
        <g>
          {/* Burst 1 - Big initial jump */}
          {motivationBurst1 > 0 && (
            <rect
              x={150}
              y={baseY - motivationBurst1}
              width={80}
              height={motivationBurst1}
              fill="none"
              stroke="red"
              strokeWidth="3"
              opacity={interpolate(progress, [0.05, 0.2], [0, 1])}
            />
          )}

          {/* Burst 2 - Another jump after pause */}
          {motivationBurst2 > motivationBurst1 && (
            <rect
              x={150}
              y={baseY - motivationBurst2}
              width={80}
              height={motivationBurst2 - motivationBurst1}
              fill="none"
              stroke="red"
              strokeWidth="3"
              opacity={interpolate(progress, [0.45, 0.55], [0, 1])}
            />
          )}

          {/* Burst 3 - Final smaller jump */}
          {motivationBurst3 > motivationBurst2 && (
            <rect
              x={150}
              y={baseY - motivationBurst3}
              width={80}
              height={motivationBurst3 - motivationBurst2}
              fill="none"
              stroke="red"
              strokeWidth="3"
              opacity={interpolate(progress, [0.75, 0.85], [0, 1])}
            />
          )}

          {/* Motivation flame effects during bursts - gets weaker over time */}
          {progress > 0.05 && progress < 0.2 && (
            <g opacity={interpolate(progress, [0.05, 0.1, 0.2], [0, 1, 0])}>
              <line x1="190" y1={baseY - motivationBurst1 - 10} x2="195" y2={baseY - motivationBurst1 - 20} stroke="red" strokeWidth="2" />
              <line x1="185" y1={baseY - motivationBurst1 - 15} x2="188" y2={baseY - motivationBurst1 - 25} stroke="orange" strokeWidth="1" />
            </g>
          )}

          {/* Weaker flame for second burst */}
          {progress > 0.35 && progress < 0.5 && (
            <g opacity={interpolate(progress, [0.35, 0.4, 0.5], [0, 0.7, 0])}>
              <line x1="190" y1={baseY - motivationBurst2 - 8} x2="193" y2={baseY - motivationBurst2 - 15} stroke="red" strokeWidth="1" />
            </g>
          )}

          {/* Barely visible flame for final burst */}
          {progress > 0.65 && progress < 0.8 && (
            <g opacity={interpolate(progress, [0.65, 0.7, 0.8], [0, 0.4, 0])}>
              <line x1="190" y1={baseY - motivationBurst3 - 5} x2="192" y2={baseY - motivationBurst3 - 8} stroke="red" strokeWidth="1" />
            </g>
          )}
        </g>

        {/* DISCIPLINE PATH (Right side) - Consistent small steps */}
        <g>
          {/* Step 1 */}
          {disciplineStep1 > 0 && (
            <rect
              x={centerX + 50}
              y={baseY - disciplineStep1}
              width={stepWidth}
              height={stepHeight}
              fill="none"
              stroke="lime"
              strokeWidth="2"
              opacity={interpolate(progress, [0.1, 0.25], [0, 1])}
            />
          )}

          {/* Step 2 */}
          {disciplineStep2 > disciplineStep1 && (
            <rect
              x={centerX + 50}
              y={baseY - disciplineStep2}
              width={stepWidth}
              height={stepHeight}
              fill="none"
              stroke="lime"
              strokeWidth="2"
              opacity={interpolate(progress, [0.2, 0.35], [0, 1])}
            />
          )}

          {/* Step 3 */}
          {disciplineStep3 > disciplineStep2 && (
            <rect
              x={centerX + 50}
              y={baseY - disciplineStep3}
              width={stepWidth}
              height={stepHeight}
              fill="none"
              stroke="lime"
              strokeWidth="2"
              opacity={interpolate(progress, [0.3, 0.45], [0, 1])}
            />
          )}

          {/* Step 4 */}
          {disciplineStep4 > disciplineStep3 && (
            <rect
              x={centerX + 50}
              y={baseY - disciplineStep4}
              width={stepWidth}
              height={stepHeight}
              fill="none"
              stroke="lime"
              strokeWidth="2"
              opacity={interpolate(progress, [0.4, 0.55], [0, 1])}
            />
          )}

          {/* Step 5 */}
          {disciplineStep5 > disciplineStep4 && (
            <rect
              x={centerX + 50}
              y={baseY - disciplineStep5}
              width={stepWidth}
              height={stepHeight}
              fill="none"
              stroke="lime"
              strokeWidth="2"
              opacity={interpolate(progress, [0.5, 0.65], [0, 1])}
            />
          )}

          {/* Step 6 */}
          {disciplineStep6 > disciplineStep5 && (
            <rect
              x={centerX + 50}
              y={baseY - disciplineStep6}
              width={stepWidth}
              height={stepHeight}
              fill="none"
              stroke="lime"
              strokeWidth="2"
              opacity={interpolate(progress, [0.6, 0.75], [0, 1])}
            />
          )}

          {/* Final step - reaches higher */}
          {disciplineFinal > disciplineStep6 && (
            <rect
              x={centerX + 50}
              y={baseY - disciplineFinal}
              width={stepWidth}
              height={disciplineFinal - disciplineStep6}
              fill="none"
              stroke="lime"
              strokeWidth="2"
              opacity={interpolate(progress, [0.7, 0.85], [0, 1])}
            />
          )}
        </g>

        {/* Labels */}
        {motivationLabel > 0 && (
          <text 
            x="190" 
            y="200" 
            textAnchor="middle"
            fill="red" 
            fontSize="24" 
            fontFamily="Arial, sans-serif"
            opacity={motivationLabel}
          >
            MOTIVATION
          </text>
        )}

        {motivationLabel > 0 && (
          <text 
            x="190" 
            y="230" 
            textAnchor="middle"
            fill="red" 
            fontSize="16" 
            fontFamily="Arial, sans-serif"
            opacity={motivationLabel * 0.8}
          >
            Sporadic Bursts
          </text>
        )}

        {disciplineLabel > 0 && (
          <text 
            x={centerX + 70} 
            y="200" 
            textAnchor="middle"
            fill="lime" 
            fontSize="24" 
            fontFamily="Arial, sans-serif"
            opacity={disciplineLabel}
          >
            DISCIPLINE
          </text>
        )}

        {disciplineLabel > 0 && (
          <text 
            x={centerX + 70} 
            y="230" 
            textAnchor="middle"
            fill="lime" 
            fontSize="16" 
            fontFamily="Arial, sans-serif"
            opacity={disciplineLabel * 0.8}
          >
            Slow & Steady
          </text>
        )}

        {/* Final message */}
        {finalMessage > 0 && (
          <text 
            x="304" 
            y="100" 
            textAnchor="middle"
            fill="white" 
            fontSize="28" 
            fontFamily="Arial, sans-serif"
            opacity={finalMessage}
            filter="drop-shadow(0 0 8px white)"
          >
            Consistency Beats Intensity
          </text>
        )}

        {/* Height indicators */}
        {progress > 0.85 && (
          <g opacity={interpolate(progress, [0.85, 1], [0, 0.6])}>
            {/* Motivation final height */}
            <text x="50" y={baseY - motivationBurst3 + 5} fill="red" fontSize="14" fontFamily="Arial, sans-serif">
              {Math.round(motivationBurst3)}px
            </text>
            
            {/* Discipline final height */}
            <text x="500" y={baseY - disciplineFinal + 5} fill="lime" fontSize="14" fontFamily="Arial, sans-serif">
              {Math.round(disciplineFinal)}px
            </text>
          </g>
        )}

      </svg>
    </div>
  );
};