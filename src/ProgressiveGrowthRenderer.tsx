import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const ProgressiveGrowthRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // Progressive building elements using Math.max like the tree
  const centerDot = Math.max(0, interpolate(progress, [0, 0.15], [0, 8], {
    easing: Easing.out(Easing.quad)
  }));
  
  const innerRing = Math.max(centerDot, interpolate(progress, [0.1, 0.35], [8, 40], {
    easing: Easing.out(Easing.cubic)
  }));
  
  const middleRing = Math.max(innerRing, interpolate(progress, [0.25, 0.55], [40, 80], {
    easing: Easing.out(Easing.cubic)
  }));
  
  const outerRing = Math.max(middleRing, interpolate(progress, [0.45, 0.75], [80, 120], {
    easing: Easing.out(Easing.cubic)
  }));
  
  const finalExpansion = Math.max(outerRing, interpolate(progress, [0.7, 1], [120, 180], {
    easing: Easing.out(Easing.cubic)
  }));

  // Connection lines grow with rings
  const connectionLength = Math.max(0, interpolate(progress, [0.3, 0.7], [0, 60], {
    easing: Easing.out(Easing.quad)
  }));
  
  // Text elements appear progressively
  const textOpacity = interpolate(progress, [0.8, 1], [0, 1], {
    easing: Easing.out(Easing.quad)
  });

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
        
        {/* Center dot - always present once started */}
        {centerDot > 0 && (
          <circle
            cx="400"
            cy="300"
            r={centerDot}
            fill="white"
            opacity={interpolate(progress, [0, 0.15], [0, 1])}
          />
        )}
        
        {/* Inner ring - builds from center */}
        {innerRing > centerDot && (
          <circle
            cx="400"
            cy="300"
            r={innerRing}
            fill="none"
            stroke="white"
            strokeWidth="3"
            opacity={interpolate(progress, [0.1, 0.35], [0, 0.9])}
            filter="drop-shadow(0 0 8px white)"
          />
        )}
        
        {/* Middle ring - expands from inner */}
        {middleRing > innerRing && (
          <circle
            cx="400"
            cy="300"
            r={middleRing}
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity={interpolate(progress, [0.25, 0.55], [0, 0.7])}
            filter="drop-shadow(0 0 6px white)"
          />
        )}
        
        {/* Outer ring - grows from middle */}
        {outerRing > middleRing && (
          <circle
            cx="400"
            cy="300"
            r={outerRing}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            opacity={interpolate(progress, [0.45, 0.75], [0, 0.5])}
            filter="drop-shadow(0 0 4px white)"
          />
        )}
        
        {/* Final expansion - ultimate growth */}
        {finalExpansion > outerRing && (
          <circle
            cx="400"
            cy="300"
            r={finalExpansion}
            fill="none"
            stroke="white"
            strokeWidth="1"
            opacity={interpolate(progress, [0.7, 1], [0, 0.3])}
            filter="drop-shadow(0 0 2px white)"
          />
        )}
        
        {/* Connection lines - radiate outward like tree branches */}
        {connectionLength > 0 && (
          <g opacity={interpolate(progress, [0.3, 0.7], [0, 0.8])}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
              <line
                key={angle}
                x1="400"
                y1="300"
                x2={400 + Math.cos(angle * Math.PI / 180) * connectionLength}
                y2={300 + Math.sin(angle * Math.PI / 180) * connectionLength}
                stroke="white"
                strokeWidth="2"
                opacity={0.6}
              />
            ))}
          </g>
        )}
        
        {/* Detail elements - appear in final phase like tree crown details */}
        {progress > 0.8 && (
          <g opacity={interpolate(progress, [0.8, 1], [0, 0.6])}>
            {/* Small accent circles */}
            <circle cx="340" cy="240" r="3" fill="white" opacity={0.7} />
            <circle cx="460" cy="360" r="3" fill="white" opacity={0.7} />
            <circle cx="340" cy="360" r="3" fill="white" opacity={0.7} />
            <circle cx="460" cy="240" r="3" fill="white" opacity={0.7} />
          </g>
        )}
        
        {/* Progressive text - like the tree stage indicator */}
        {textOpacity > 0 && (
          <text 
            x="400" 
            y="500" 
            textAnchor="middle" 
            fill="white" 
            fontSize="28" 
            fontFamily="Arial, sans-serif"
            opacity={textOpacity}
            filter="drop-shadow(0 0 10px white)"
          >
            GROWTH
          </text>
        )}
        
      </svg>
    </div>
  );
};