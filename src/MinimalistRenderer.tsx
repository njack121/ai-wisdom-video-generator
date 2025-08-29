import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface MinimalistRendererProps {
  svgPlan: any;
  svgAssets: Record<string, string>;
}

export const MinimalistRenderer: React.FC<MinimalistRendererProps> = ({ svgPlan, svgAssets }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // Create simple line-based animations based on the concept
  const renderConceptAnimation = () => {
    const concept = svgPlan.concept || 'growth';
    const baseY = 300; // Center line
    
    // Different minimalist animations based on concept keywords
    if (concept.includes('grow') || concept.includes('rise') || concept.includes('tree') || concept.includes('seed')) {
      return renderGrowthAnimation(baseY);
    } else if (concept.includes('break') || concept.includes('barrier') || concept.includes('wall') || concept.includes('overcome')) {
      return renderBreakthroughAnimation(baseY);
    } else if (concept.includes('transform') || concept.includes('change') || concept.includes('mindset')) {
      return renderTransformAnimation(baseY);
    } else if (concept.includes('journey') || concept.includes('path') || concept.includes('hell') || concept.includes('going')) {
      return renderJourneyAnimation(baseY);
    } else if (concept.includes('strength') || concept.includes('power') || concept.includes('force')) {
      return renderStrengthAnimation(baseY);
    } else {
      // Default growth pattern
      return renderGrowthAnimation(baseY);
    }
  };

  const renderGrowthAnimation = (baseY: number) => {
    const stemHeight = interpolate(progress, [0, 0.4, 0.8, 1], [0, 40, 100, 150]);
    const branchLength = Math.max(0, interpolate(progress, [0.5, 1], [0, 60]));
    const leafCount = Math.floor(interpolate(progress, [0.6, 1], [0, 8]));
    
    return (
      <g>
        {/* Ground line */}
        <line x1="200" y1={baseY} x2="600" y2={baseY} stroke="white" strokeWidth="2" opacity={0.3} />
        
        {/* Main stem */}
        {stemHeight > 0 && (
          <line 
            x1="400" 
            y1={baseY} 
            x2="400" 
            y2={baseY - stemHeight}
            stroke="white" 
            strokeWidth="4"
          />
        )}
        
        {/* Branches */}
        {branchLength > 0 && stemHeight > 60 && (
          <>
            <line 
              x1="400" 
              y1={baseY - stemHeight + 40} 
              x2={400 - branchLength * 0.8} 
              y2={baseY - stemHeight + 20}
              stroke="white" 
              strokeWidth="3"
            />
            <line 
              x1="400" 
              y1={baseY - stemHeight + 50} 
              x2={400 + branchLength * 0.8} 
              y2={baseY - stemHeight + 30}
              stroke="white" 
              strokeWidth="3"
            />
          </>
        )}
        
        {/* Simple leaves as small lines */}
        {Array.from({ length: leafCount }, (_, i) => (
          <line
            key={i}
            x1={400 + (i % 2 === 0 ? -branchLength * 0.6 : branchLength * 0.6)}
            y1={baseY - stemHeight + 30 + (i * 8)}
            x2={400 + (i % 2 === 0 ? -branchLength * 0.6 - 8 : branchLength * 0.6 + 8)}
            y2={baseY - stemHeight + 25 + (i * 8)}
            stroke="white"
            strokeWidth="2"
            opacity={0.8}
          />
        ))}
      </g>
    );
  };

  const renderBreakthroughAnimation = (baseY: number) => {
    const wallHeight = 120;
    const crackWidth = interpolate(progress, [0, 0.3, 0.7, 1], [0, 2, 15, 30]);
    const lightIntensity = interpolate(progress, [0.6, 1], [0, 1]);
    
    return (
      <g>
        {/* Wall - left side */}
        <rect 
          x="300" 
          y={baseY - wallHeight} 
          width={100 - crackWidth/2} 
          height={wallHeight}
          fill="none"
          stroke="white"
          strokeWidth="3"
        />
        
        {/* Wall - right side */}
        <rect 
          x={400 + crackWidth/2} 
          y={baseY - wallHeight} 
          width={100 - crackWidth/2} 
          height={wallHeight}
          fill="none"
          stroke="white"
          strokeWidth="3"
        />
        
        {/* Person pushing */}
        <g opacity={interpolate(progress, [0, 0.3], [1, 0.7])}>
          {/* Head */}
          <circle cx="250" cy={baseY - 40} r="15" fill="none" stroke="white" strokeWidth="2" />
          {/* Body */}
          <line x1="250" y1={baseY - 25} x2="250" y2={baseY - 5} stroke="white" strokeWidth="3" />
          {/* Arms pushing */}
          <line x1="250" y1={baseY - 20} x2="290" y2={baseY - 20} stroke="white" strokeWidth="2" />
          {/* Legs */}
          <line x1="250" y1={baseY - 5} x2="240" y2={baseY + 10} stroke="white" strokeWidth="2" />
          <line x1="250" y1={baseY - 5} x2="260" y2={baseY + 10} stroke="white" strokeWidth="2" />
        </g>
        
        {/* Light breaking through */}
        {lightIntensity > 0 && (
          <>
            <line 
              x1="400" 
              y1={baseY - wallHeight} 
              x2="400" 
              y2={baseY}
              stroke="white" 
              strokeWidth={Math.floor(lightIntensity * 8)}
              opacity={lightIntensity}
            />
            <line 
              x1={390 + lightIntensity * 20} 
              y1={baseY - wallHeight + 20} 
              x2={410 - lightIntensity * 20} 
              y2={baseY - 20}
              stroke="white" 
              strokeWidth={Math.floor(lightIntensity * 4)}
              opacity={lightIntensity * 0.7}
            />
          </>
        )}
      </g>
    );
  };

  const renderTransformAnimation = (baseY: number) => {
    const morphProgress = interpolate(progress, [0, 1], [0, 1]);
    
    return (
      <g>
        {/* Left shape (before) */}
        <g opacity={interpolate(progress, [0, 0.5, 1], [1, 0.5, 0.2])}>
          <rect 
            x="320" 
            y={baseY - 40} 
            width="40" 
            height="40"
            fill="none"
            stroke="white"
            strokeWidth="3"
          />
        </g>
        
        {/* Transformation lines */}
        <g opacity={interpolate(progress, [0.2, 0.8], [0, 1])}>
          <line x1="360" y1={baseY - 20} x2="440" y2={baseY - 20} stroke="white" strokeWidth="2" opacity={0.6} />
          <line x1="370" y1={baseY - 10} x2="430" y2={baseY - 10} stroke="white" strokeWidth="1" opacity={0.4} />
          <line x1="370" y1={baseY - 30} x2="430" y2={baseY - 30} stroke="white" strokeWidth="1" opacity={0.4} />
        </g>
        
        {/* Right shape (after) */}
        <g opacity={interpolate(progress, [0, 0.5, 1], [0.2, 0.5, 1])}>
          <circle 
            cx="460" 
            cy={baseY - 20} 
            r="25"
            fill="none"
            stroke="white"
            strokeWidth="3"
          />
          {/* Inner detail */}
          <circle 
            cx="460" 
            cy={baseY - 20} 
            r="15"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity={0.6}
          />
        </g>
      </g>
    );
  };

  const renderJourneyAnimation = (baseY: number) => {
    const pathProgress = interpolate(progress, [0, 1], [0, 400]);
    const personX = 200 + pathProgress;
    
    return (
      <g>
        {/* Path line */}
        <line 
          x1="200" 
          y1={baseY} 
          x2="600" 
          y2={baseY}
          stroke="white" 
          strokeWidth="3"
          opacity={0.4}
        />
        
        {/* Obstacles along path */}
        <g opacity={0.6}>
          <rect x="300" y={baseY - 15} width="20" height="15" fill="none" stroke="white" strokeWidth="2" />
          <rect x="450" y={baseY - 20} width="25" height="20" fill="none" stroke="white" strokeWidth="2" />
        </g>
        
        {/* Person walking */}
        <g opacity={interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.8])}>
          {/* Head */}
          <circle cx={personX} cy={baseY - 35} r="12" fill="none" stroke="white" strokeWidth="2" />
          {/* Body */}
          <line x1={personX} y1={baseY - 23} x2={personX} y2={baseY - 5} stroke="white" strokeWidth="3" />
          {/* Arms */}
          <line x1={personX} y1={baseY - 18} x2={personX + 15} y2={baseY - 12} stroke="white" strokeWidth="2" />
          <line x1={personX} y1={baseY - 18} x2={personX - 10} y2={baseY - 15} stroke="white" strokeWidth="2" />
          {/* Legs */}
          <line x1={personX} y1={baseY - 5} x2={personX - 8} y2={baseY + 8} stroke="white" strokeWidth="2" />
          <line x1={personX} y1={baseY - 5} x2={personX + 12} y2={baseY + 8} stroke="white" strokeWidth="2" />
        </g>
        
        {/* Goal/light at end */}
        <g opacity={interpolate(progress, [0.7, 1], [0, 1])}>
          <circle cx="580" cy={baseY - 30} r="20" fill="none" stroke="white" strokeWidth="3" />
          <circle cx="580" cy={baseY - 30} r="10" fill="none" stroke="white" strokeWidth="2" opacity={0.7} />
        </g>
      </g>
    );
  };

  const renderStrengthAnimation = (baseY: number) => {
    const flexPower = interpolate(progress, [0, 0.5, 1], [0, 1, 0.8]);
    const muscleSize = interpolate(progress, [0, 1], [0, 15]);
    
    return (
      <g>
        {/* Person figure */}
        <g>
          {/* Head */}
          <circle cx="400" cy={baseY - 80} r="20" fill="none" stroke="white" strokeWidth="3" />
          
          {/* Body */}
          <line x1="400" y1={baseY - 60} x2="400" y2={baseY - 10} stroke="white" strokeWidth="4" />
          
          {/* Arms with growing muscles */}
          <line 
            x1="400" 
            y1={baseY - 45} 
            x2={370 - muscleSize} 
            y2={baseY - 35}
            stroke="white" 
            strokeWidth={3 + muscleSize/3}
          />
          <line 
            x1="400" 
            y1={baseY - 45} 
            x2={430 + muscleSize} 
            y2={baseY - 35}
            stroke="white" 
            strokeWidth={3 + muscleSize/3}
          />
          
          {/* Muscle definition */}
          {muscleSize > 5 && (
            <>
              <circle cx={370 - muscleSize} cy={baseY - 35} r={muscleSize/2} fill="none" stroke="white" strokeWidth="2" opacity={0.6} />
              <circle cx={430 + muscleSize} cy={baseY - 35} r={muscleSize/2} fill="none" stroke="white" strokeWidth="2" opacity={0.6} />
            </>
          )}
          
          {/* Legs */}
          <line x1="400" y1={baseY - 10} x2="385" y2={baseY + 15} stroke="white" strokeWidth="3" />
          <line x1="400" y1={baseY - 10} x2="415" y2={baseY + 15} stroke="white" strokeWidth="3" />
        </g>
        
        {/* Power emanation */}
        {flexPower > 0.3 && (
          <>
            <circle cx="400" cy={baseY - 40} r={flexPower * 50} fill="none" stroke="white" strokeWidth="2" opacity={flexPower * 0.4} />
            <circle cx="400" cy={baseY - 40} r={flexPower * 30} fill="none" stroke="white" strokeWidth="1" opacity={flexPower * 0.6} />
          </>
        )}
      </g>
    );
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
        {renderConceptAnimation()}
        
        {/* Concept text */}
        <text 
          x="400" 
          y="550" 
          textAnchor="middle" 
          fill="white" 
          fontSize="20" 
          fontFamily="Arial, sans-serif"
          opacity={interpolate(progress, [0, 0.1, 0.9, 1], [0, 0.8, 0.9, 0.7])}
        >
          {svgPlan.concept?.toUpperCase() || 'MOTIVATION'}
        </text>
        
        {/* Stage description */}
        <text 
          x="400" 
          y="80" 
          textAnchor="middle" 
          fill="white" 
          fontSize="16" 
          fontFamily="Arial, sans-serif"
          opacity={0.6}
        >
          {progress < 0.25 ? 'BEGINNING' :
           progress < 0.5 ? 'CHALLENGE' :
           progress < 0.75 ? 'PROGRESS' : 'TRIUMPH'}
        </text>
      </svg>
    </div>
  );
};