import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const ProgressNotPerfectionSplitRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // Simple clear metaphor using tree technique
  // Left side: Person stuck trying to be perfect (never moves)
  // Right side: Person taking imperfect steps forward (keeps growing)

  // Progressive building using Math.max - the proven tree technique
  const leftStuckOpacity = Math.max(0, interpolate(progress, [0, 0.2], [0, 1], {
    easing: Easing.out(Easing.quad)
  }));

  const rightStep1 = Math.max(0, interpolate(progress, [0.1, 0.3], [0, 1], {
    easing: Easing.out(Easing.cubic)
  }));

  const rightStep2 = Math.max(rightStep1, interpolate(progress, [0.25, 0.45], [1, 2], {
    easing: Easing.out(Easing.cubic)
  }));

  const rightStep3 = Math.max(rightStep2, interpolate(progress, [0.4, 0.6], [2, 3], {
    easing: Easing.out(Easing.cubic)
  }));

  const rightStep4 = Math.max(rightStep3, interpolate(progress, [0.55, 0.75], [3, 4], {
    easing: Easing.out(Easing.cubic)
  }));

  const rightStep5 = Math.max(rightStep4, interpolate(progress, [0.7, 0.9], [4, 5], {
    easing: Easing.out(Easing.cubic)
  }));

  // Text reveals
  const perfectionText = progress > 0.3 ? interpolate(progress, [0.3, 0.45], [0, 1]) : 0;
  const progressText = progress > 0.5 ? interpolate(progress, [0.5, 0.65], [0, 1]) : 0;
  const finalMessage = progress > 0.8 ? interpolate(progress, [0.8, 0.95], [0, 1]) : 0;

  // Master fade out for smooth ending
  const endingFadeOut = progress > 0.95 ? interpolate(progress, [0.95, 1], [1, 0], {
    easing: Easing.out(Easing.quad)
  }) : 1;

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
        
        {/* Center divider */}
        <line 
          x1="304" 
          y1="0" 
          x2="304" 
          y2="1080" 
          stroke="white" 
          strokeWidth="2"
          opacity={0.3}
        />

        {/* LEFT SIDE - PERFECTION (Stuck person) */}
        {leftStuckOpacity > 0 && (
          <g opacity={leftStuckOpacity}>
            {/* Person stuck at starting line */}
            <circle cx="152" cy="800" r="15" fill="white" />
            <line x1="152" y1="815" x2="152" y2="850" stroke="white" strokeWidth="3" />
            <line x1="152" y1="835" x2="135" y2="860" stroke="white" strokeWidth="2" />
            <line x1="152" y1="835" x2="169" y2="860" stroke="white" strokeWidth="2" />
            <line x1="152" y1="850" x2="135" y2="880" stroke="white" strokeWidth="2" />
            <line x1="152" y1="850" x2="169" y2="880" stroke="white" strokeWidth="2" />
            
            {/* Starting line */}
            <line x1="100" y1="890" x2="200" y2="890" stroke="white" strokeWidth="2" />
          </g>
        )}

        {/* RIGHT SIDE - PROGRESS (Moving forward) */}
        <g>
          {/* Step 1 */}
          {rightStep1 > 0 && (
            <g opacity={Math.min(rightStep1, 1)}>
              <circle cx="456" cy="800" r="15" fill="white" />
              <line x1="456" y1="815" x2="456" y2="850" stroke="white" strokeWidth="3" />
              <line x1="456" y1="835" x2="439" y2="860" stroke="white" strokeWidth="2" />
              <line x1="456" y1="835" x2="473" y2="860" stroke="white" strokeWidth="2" />
              <line x1="456" y1="850" x2="439" y2="880" stroke="white" strokeWidth="2" />
              <line x1="456" y1="850" x2="473" y2="880" stroke="white" strokeWidth="2" />
            </g>
          )}

          {/* Step 2 */}
          {rightStep2 > 1 && (
            <g opacity={Math.min(rightStep2 - 1, 1)}>
              <circle cx="480" cy="750" r="15" fill="white" />
              <line x1="480" y1="765" x2="480" y2="800" stroke="white" strokeWidth="3" />
              <line x1="480" y1="785" x2="463" y2="810" stroke="white" strokeWidth="2" />
              <line x1="480" y1="785" x2="497" y2="810" stroke="white" strokeWidth="2" />
              <line x1="480" y1="800" x2="463" y2="830" stroke="white" strokeWidth="2" />
              <line x1="480" y1="800" x2="497" y2="830" stroke="white" strokeWidth="2" />
            </g>
          )}

          {/* Step 3 */}
          {rightStep3 > 2 && (
            <g opacity={Math.min(rightStep3 - 2, 1)}>
              <circle cx="504" cy="700" r="15" fill="white" />
              <line x1="504" y1="715" x2="504" y2="750" stroke="white" strokeWidth="3" />
              <line x1="504" y1="735" x2="487" y2="760" stroke="white" strokeWidth="2" />
              <line x1="504" y1="735" x2="521" y2="760" stroke="white" strokeWidth="2" />
              <line x1="504" y1="750" x2="487" y2="780" stroke="white" strokeWidth="2" />
              <line x1="504" y1="750" x2="521" y2="780" stroke="white" strokeWidth="2" />
            </g>
          )}

          {/* Step 4 */}
          {rightStep4 > 3 && (
            <g opacity={Math.min(rightStep4 - 3, 1)}>
              <circle cx="528" cy="650" r="15" fill="white" />
              <line x1="528" y1="665" x2="528" y2="700" stroke="white" strokeWidth="3" />
              <line x1="528" y1="685" x2="511" y2="710" stroke="white" strokeWidth="2" />
              <line x1="528" y1="685" x2="545" y2="710" stroke="white" strokeWidth="2" />
              <line x1="528" y1="700" x2="511" y2="730" stroke="white" strokeWidth="2" />
              <line x1="528" y1="700" x2="545" y2="730" stroke="white" strokeWidth="2" />
            </g>
          )}

          {/* Step 5 */}
          {rightStep5 > 4 && (
            <g opacity={Math.min(rightStep5 - 4, 1)}>
              <circle cx="552" cy="600" r="15" fill="white" />
              <line x1="552" y1="615" x2="552" y2="650" stroke="white" strokeWidth="3" />
              <line x1="552" y1="635" x2="535" y2="660" stroke="white" strokeWidth="2" />
              <line x1="552" y1="635" x2="569" y2="660" stroke="white" strokeWidth="2" />
              <line x1="552" y1="650" x2="535" y2="680" stroke="white" strokeWidth="2" />
              <line x1="552" y1="650" x2="569" y2="680" stroke="white" strokeWidth="2" />
            </g>
          )}
        </g>

        {/* Text messages */}
        {perfectionText > 0 && (
          <text 
            x="152" 
            y="500" 
            textAnchor="middle"
            fill="red" 
            fontSize="24" 
            fontFamily="Arial, sans-serif"
            opacity={perfectionText}
          >
            STUCK
          </text>
        )}

        {progressText > 0 && (
          <text 
            x="456" 
            y="500" 
            textAnchor="middle"
            fill="lime" 
            fontSize="24" 
            fontFamily="Arial, sans-serif"
            opacity={progressText}
          >
            MOVING
          </text>
        )}

        {finalMessage > 0 && (
          <text 
            x="304" 
            y="300" 
            textAnchor="middle"
            fill="white" 
            fontSize="32" 
            fontFamily="Arial, sans-serif"
            opacity={finalMessage}
          >
            Progress Not Perfection
          </text>
        )}

      </svg>
    </div>
  );
};