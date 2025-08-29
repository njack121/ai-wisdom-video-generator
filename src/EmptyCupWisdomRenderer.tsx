import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const EmptyCupWisdomRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // "You cannot pour from an empty cup. Take care of yourself first."
  // Visual: Two cups - one trying to pour while empty, one filling itself first then helping others

  const cupWidth = 80;
  const cupHeight = 100;
  const leftCupX = 180;   // Empty cup trying to help
  const rightCupX = 420;  // Cup taking care of itself first
  const cupY = 500;

  // LEFT CUP - Empty cup trying to pour (fails)
  const leftCupTilt = progress > 0.1 && progress < 0.4 ? 
    interpolate(progress, [0.1, 0.3], [0, 25]) : 
    progress >= 0.4 ? 25 : 0;

  // Nothing comes out because it's empty
  const emptyPourAttempt = progress > 0.2 && progress < 0.5;

  // RIGHT CUP - Takes care of itself first using Math.max technique
  const rightCupFill = Math.max(0, interpolate(progress, [0.4, 0.65], [0, 80], {
    easing: Easing.out(Easing.quad)
  }));

  // Then helps others - successful pour
  const rightCupTilt = progress > 0.7 ? 
    interpolate(progress, [0.7, 0.85], [0, 20]) : 0;

  const successfulPour = Math.max(0, interpolate(progress, [0.75, 0.95], [0, 60], {
    easing: Easing.out(Easing.cubic)
  }));

  // Receiving cup for successful pour
  const receivingCupFill = Math.max(0, interpolate(progress, [0.8, 0.95], [0, 40], {
    easing: Easing.out(Easing.quad)
  }));

  // Text reveals
  const problemText = progress > 0.35 ? interpolate(progress, [0.35, 0.5], [0, 1]) : 0;
  const solutionText = progress > 0.6 ? interpolate(progress, [0.6, 0.75], [0, 1]) : 0;
  const wisdomText = progress > 0.85 ? interpolate(progress, [0.85, 1], [0, 1]) : 0;

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
        
        {/* LEFT SIDE - Empty cup trying to help */}
        <g>
          {/* Empty cup */}
          <rect
            x={leftCupX - cupWidth/2}
            y={cupY - cupHeight/2}
            width={cupWidth}
            height={cupHeight}
            fill="none"
            stroke="white"
            strokeWidth="3"
            transform={`rotate(${leftCupTilt} ${leftCupX} ${cupY})`}
          />
          
          {/* Cup handle */}
          <ellipse
            cx={leftCupX + cupWidth/2 + 15}
            cy={cupY}
            rx="12"
            ry="20"
            fill="none"
            stroke="white"
            strokeWidth="2"
            transform={`rotate(${leftCupTilt} ${leftCupX} ${cupY})`}
          />

          {/* Failed pour attempt - just empty air */}
          {emptyPourAttempt && (
            <g opacity={interpolate(progress, [0.2, 0.35, 0.5], [0, 0.3, 0])}>
              <text x={leftCupX + 60} y={cupY - 20} fill="gray" fontSize="12" fontFamily="Arial, sans-serif">
                ...nothing
              </text>
              <circle cx={leftCupX + 50} cy={cupY - 10} r="1" fill="gray" opacity={0.3} />
              <circle cx={leftCupX + 55} cy={cupY - 5} r="1" fill="gray" opacity={0.2} />
            </g>
          )}

          {/* Strain/effort lines */}
          {leftCupTilt > 0 && (
            <g opacity={0.6}>
              <line x1={leftCupX - 40} y1={cupY - 60} x2={leftCupX - 35} y2={cupY - 65} stroke="red" strokeWidth="1" />
              <line x1={leftCupX - 45} y1={cupY - 55} x2={leftCupX - 40} y2={cupY - 60} stroke="red" strokeWidth="1" />
            </g>
          )}
        </g>

        {/* RIGHT SIDE - Cup taking care of itself first */}
        <g>
          {/* Self-care cup */}
          <rect
            x={rightCupX - cupWidth/2}
            y={cupY - cupHeight/2}
            width={cupWidth}
            height={cupHeight}
            fill="none"
            stroke="white"
            strokeWidth="3"
            transform={`rotate(${rightCupTilt} ${rightCupX} ${cupY})`}
          />
          
          {/* Cup handle */}
          <ellipse
            cx={rightCupX + cupWidth/2 + 15}
            cy={cupY}
            rx="12"
            ry="20"
            fill="none"
            stroke="white"
            strokeWidth="2"
            transform={`rotate(${rightCupTilt} ${rightCupX} ${cupY})`}
          />

          {/* Cup filling itself first - water level */}
          {rightCupFill > 0 && (
            <rect
              x={rightCupX - cupWidth/2 + 3}
              y={cupY + cupHeight/2 - rightCupFill - 3}
              width={cupWidth - 6}
              height={rightCupFill}
              fill="cyan"
              opacity={0.8}
              transform={`rotate(${rightCupTilt} ${rightCupX} ${cupY})`}
            />
          )}

          {/* Water stream filling the cup */}
          {rightCupFill > 0 && rightCupFill < 75 && (
            <rect
              x={rightCupX - 2}
              y={cupY - cupHeight/2 - 80}
              width="4"
              height="80"
              fill="cyan"
              opacity={0.7}
            />
          )}

          {/* Successful pour to help others */}
          {successfulPour > 0 && (
            <g>
              {/* Pour stream */}
              <path
                d={`M ${rightCupX + 30} ${cupY - 10} Q ${rightCupX + 80} ${cupY + 20} ${rightCupX + 120} ${cupY + 60}`}
                fill="none"
                stroke="cyan"
                strokeWidth="6"
                opacity={0.8}
              />
              
              {/* Receiving cup */}
              <rect
                x={rightCupX + 100}
                y={cupY + 30}
                width={cupWidth * 0.8}
                height={cupHeight * 0.8}
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
              
              {/* Water in receiving cup */}
              {receivingCupFill > 0 && (
                <rect
                  x={rightCupX + 103}
                  y={cupY + 30 + (cupHeight * 0.8) - receivingCupFill - 3}
                  width={cupWidth * 0.8 - 6}
                  height={receivingCupFill}
                  fill="cyan"
                  opacity={0.8}
                />
              )}
            </g>
          )}
        </g>

        {/* Labels and messages */}
        {problemText > 0 && (
          <>
            <text 
              x={leftCupX} 
              y="300" 
              textAnchor="middle"
              fill="red" 
              fontSize="18" 
              fontFamily="Arial, sans-serif"
              opacity={problemText}
            >
              EMPTY CUP
            </text>
            <text 
              x={leftCupX} 
              y="320" 
              textAnchor="middle"
              fill="gray" 
              fontSize="14" 
              fontFamily="Arial, sans-serif"
              opacity={problemText * 0.8}
            >
              Can't help others
            </text>
          </>
        )}

        {solutionText > 0 && (
          <>
            <text 
              x={rightCupX} 
              y="300" 
              textAnchor="middle"
              fill="lime" 
              fontSize="18" 
              fontFamily="Arial, sans-serif"
              opacity={solutionText}
            >
              FILL YOURSELF
            </text>
            <text 
              x={rightCupX} 
              y="320" 
              textAnchor="middle"
              fill="cyan" 
              fontSize="14" 
              fontFamily="Arial, sans-serif"
              opacity={solutionText * 0.8}
            >
              Then help others
            </text>
          </>
        )}

        {/* Wisdom quote */}
        {wisdomText > 0 && (
          <>
            <text 
              x="304" 
              y="120" 
              textAnchor="middle"
              fill="white" 
              fontSize="22" 
              fontFamily="Arial, sans-serif"
              opacity={wisdomText}
            >
              You cannot pour from an empty cup.
            </text>
            <text 
              x="304" 
              y="160" 
              textAnchor="middle"
              fill="lime" 
              fontSize="26" 
              fontFamily="Arial, sans-serif"
              opacity={wisdomText}
              filter="drop-shadow(0 0 8px lime)"
            >
              Take care of yourself first.
            </text>
          </>
        )}

        {/* Stage indicator */}
        <text 
          x="304" 
          y="950" 
          textAnchor="middle" 
          fill="white" 
          fontSize="20" 
          fontFamily="Arial, sans-serif"
          opacity={0.6}
        >
          {progress < 0.3 ? 'EMPTY EFFORT' : 
           progress < 0.6 ? 'BURNOUT' : 
           progress < 0.8 ? 'SELF-CARE' : 'ABUNDANCE'}
        </text>

      </svg>
    </div>
  );
};