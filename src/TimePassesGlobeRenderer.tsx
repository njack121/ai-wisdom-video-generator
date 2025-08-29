import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

export const TimePassesGlobeRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Globe dimensions and positions (9:16 format)
  const globeRadius = 90; // 180px diameter
  const centerX = 304 * 0.6; // Left 60% of frame
  const topGlobeY = 200;
  const middleGlobeY = 400;
  const bottomGlobeY = 600;
  
  // Rotation calculations for different speeds
  // Sunday: 1 rotation every 4 seconds (120 frames at 30fps)
  const sundayRotation = (frame / 120) * 360;
  
  // Friday/Saturday: 1 rotation every 0.3 seconds (9 frames at 30fps)
  const weekendRotation = (frame / 9) * 360;
  
  // Monday-Thursday: 1 rotation every 20 seconds (600 frames at 30fps)
  const weekdayRotation = (frame / 600) * 360;
  
  // Create continent patterns using simple shapes
  const ContinentPattern: React.FC<{ rotation: number; blur?: boolean }> = ({ rotation, blur }) => (
    <g transform={`rotate(${rotation} 0 0)`}>
      {/* Simple continent shapes */}
      <ellipse cx="-30" cy="-20" rx="25" ry="15" fill="rgb(120,120,120)" />
      <ellipse cx="20" cy="-35" rx="20" ry="12" fill="rgb(120,120,120)" />
      <ellipse cx="-10" cy="25" rx="30" ry="18" fill="rgb(120,120,120)" />
      <ellipse cx="40" cy="10" rx="15" ry="20" fill="rgb(120,120,120)" />
      <ellipse cx="-45" cy="15" rx="12" ry="25" fill="rgb(120,120,120)" />
      <rect x="-15" y="-45" width="20" height="10" fill="rgb(120,120,120)" rx="5" />
    </g>
  );

  const Globe: React.FC<{ 
    x: number; 
    y: number; 
    rotation: number; 
    blur?: boolean;
    pauseEffect?: boolean;
  }> = ({ x, y, rotation, blur, pauseEffect }) => {
    
    // Pause effect for weekday globe
    const effectiveRotation = pauseEffect && Math.sin(frame * 0.1) > 0.8 ? 
      Math.floor(rotation / 10) * 10 : rotation;
    
    return (
      <g>
        {/* Globe shadow/3D effect */}
        <circle
          cx={x + 2}
          cy={y + 2}
          r={globeRadius}
          fill="rgba(0,0,0,0.3)"
        />
        
        {/* Ocean base */}
        <circle
          cx={x}
          cy={y}
          r={globeRadius}
          fill="rgb(60,60,60)"
          filter={blur ? "blur(3px)" : "drop-shadow(0 0 4px rgba(255,255,255,0.3))"}
        />
        
        {/* Continents */}
        <g clipPath="url(#globeClip)">
          <g transform={`translate(${x}, ${y})`}>
            <ContinentPattern rotation={effectiveRotation} blur={blur} />
          </g>
        </g>
        
        {/* 3D highlight effect */}
        <ellipse
          cx={x - 20}
          cy={y - 20}
          rx="40"
          ry="30"
          fill="rgba(255,255,255,0.1)"
          transform={`rotate(-15 ${x-20} ${y-20})`}
        />
        
        {/* Motion blur lines for fast globe */}
        {blur && (
          <g opacity={0.6}>
            <line x1={x - globeRadius - 15} y1={y} x2={x - globeRadius} y2={y} stroke="rgba(120,120,120,0.5)" strokeWidth="2" />
            <line x1={x + globeRadius} y1={y} x2={x + globeRadius + 15} y2={y} stroke="rgba(120,120,120,0.5)" strokeWidth="2" />
            <line x1={x - globeRadius - 10} y1={y - 10} x2={x - globeRadius} y2={y - 10} stroke="rgba(120,120,120,0.3)" strokeWidth="1" />
            <line x1={x + globeRadius} y1={y + 10} x2={x + globeRadius + 10} y2={y + 10} stroke="rgba(120,120,120,0.3)" strokeWidth="1" />
          </g>
        )}
        
        {/* Glow effect */}
        <circle
          cx={x}
          cy={y}
          r={globeRadius + 2}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
          filter="blur(1px)"
        />
      </g>
    );
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'rgb(0,0,0)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <svg width="608" height="1080" viewBox="0 0 608 1080">
        
        {/* Clip path for globe */}
        <defs>
          <clipPath id="globeClip">
            <circle cx={centerX} cy={topGlobeY} r={globeRadius} />
            <circle cx={centerX} cy={middleGlobeY} r={globeRadius} />
            <circle cx={centerX} cy={bottomGlobeY} r={globeRadius} />
          </clipPath>
        </defs>
        
        {/* Title */}
        <text 
          x="304" 
          y="80"
          textAnchor="middle"
          fill="white" 
          fontSize="24" 
          fontFamily="Courier, monospace"
          fontWeight="bold"
        >
          HOW FAST TIME PASSES
        </text>

        {/* Sunday Globe - Normal speed */}
        <Globe 
          x={centerX} 
          y={topGlobeY} 
          rotation={sundayRotation}
        />
        
        {/* Friday & Saturday Globe - Very fast */}
        <Globe 
          x={centerX} 
          y={middleGlobeY} 
          rotation={weekendRotation}
          blur={true}
        />
        
        {/* Monday-Thursday Globe - Very slow with pauses */}
        <Globe 
          x={centerX} 
          y={bottomGlobeY} 
          rotation={weekdayRotation}
          pauseEffect={true}
        />

        {/* Labels */}
        <text 
          x={centerX + globeRadius + 40} 
          y={topGlobeY + 8}
          fill="white" 
          fontSize="18" 
          fontFamily="Courier, monospace"
          fontWeight="bold"
        >
          SUNDAY
        </text>
        
        <text 
          x={centerX + globeRadius + 40} 
          y={middleGlobeY + 8}
          fill="white" 
          fontSize="18" 
          fontFamily="Courier, monospace"
          fontWeight="bold"
        >
          FRIDAY & SATURDAY
        </text>
        
        <text 
          x={centerX + globeRadius + 40} 
          y={bottomGlobeY + 8}
          fill="white" 
          fontSize="18" 
          fontFamily="Courier, monospace"
          fontWeight="bold"
        >
          MONDAY - THURSDAY
        </text>

      </svg>
    </div>
  );
};