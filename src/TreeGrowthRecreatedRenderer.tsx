import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const TreeGrowthRecreatedRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // Smooth easing function for natural growth - EXACTLY from the working tree
  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Longer, smoother stages with overlapping transitions - EXACTLY from the working tree
  const getGrowthStage = () => {
    if (progress < 0.3) return 'seed';
    if (progress < 0.55) return 'sprout';
    if (progress < 0.8) return 'sapling';
    return 'tree';
  };

  const stage = getGrowthStage();
  
  // Get smooth progress within each stage - EXACTLY from the working tree
  let stageProgress = 0;
  if (stage === 'seed') {
    stageProgress = easeInOutCubic(progress / 0.3);
  } else if (stage === 'sprout') {
    stageProgress = easeInOutCubic((progress - 0.3) / 0.25);
  } else if (stage === 'sapling') {
    stageProgress = easeInOutCubic((progress - 0.55) / 0.25);
  } else {
    stageProgress = easeInOutCubic((progress - 0.8) / 0.2);
  }

  // Continuous growth - EXACTLY from the working tree
  const renderPlant = () => {
    const baseY = 400; // Ground level

    // Calculate continuous values that build on each other - EXACTLY from the working tree
    const seedSize = Math.max(0, interpolate(progress, [0, 0.3], [0, 20], {
      easing: Easing.out(Easing.quad)
    }));
    
    const stemHeight = Math.max(0, interpolate(progress, [0.25, 0.55], [0, 60], {
      easing: Easing.out(Easing.cubic)
    }));
    
    const trunkHeight = Math.max(stemHeight, interpolate(progress, [0.5, 0.8], [60, 120], {
      easing: Easing.out(Easing.cubic)
    }));
    
    const finalHeight = Math.max(trunkHeight, interpolate(progress, [0.75, 1], [120, 200], {
      easing: Easing.out(Easing.cubic)
    }));
    
    const trunkWidth = interpolate(progress, [0.5, 1], [3, 12], {
      easing: Easing.out(Easing.quad)
    });
    
    const branchLength = Math.max(0, interpolate(progress, [0.6, 0.85], [0, 40], {
      easing: Easing.out(Easing.quad)
    }));
    
    const crownSize = Math.max(0, interpolate(progress, [0.8, 1], [0, 100], {
      easing: Easing.out(Easing.quad)
    }));
    
    const leafSize = Math.max(0, interpolate(progress, [0.4, 0.7], [0, 15], {
      easing: Easing.out(Easing.quad)
    }));

    return (
      <g>
        {/* Seed - fades out as stem grows - EXACTLY from the working tree */}
        {seedSize > 0 && (
          <ellipse 
            cx="400" 
            cy={baseY - Math.max(seedSize/2, 10)} 
            rx={Math.max(seedSize/2, 5)} 
            ry={Math.max(seedSize/3, 3)}
            fill="white"
            opacity={interpolate(progress, [0, 0.3, 0.5], [0, 1, 0.3], {
              easing: Easing.out(Easing.quad)
            })}
          />
        )}
        
        {/* Main stem/trunk - grows continuously - EXACTLY from the working tree */}
        {finalHeight > 0 && (
          <line 
            x1="400" 
            y1={baseY} 
            x2="400" 
            y2={baseY - finalHeight}
            stroke="white" 
            strokeWidth={trunkWidth}
          />
        )}
        
        {/* Small leaves on stem - EXACTLY from the working tree */}
        {leafSize > 0 && stemHeight > 20 && (
          <>
            <ellipse 
              cx="390" 
              cy={baseY - stemHeight + 10} 
              rx={leafSize} 
              ry={leafSize/2}
              fill="white"
              opacity={interpolate(progress, [0.4, 0.6, 0.8], [0, 0.8, 0.4])}
            />
            <ellipse 
              cx="410" 
              cy={baseY - stemHeight + 15} 
              rx={leafSize} 
              ry={leafSize/2}
              fill="white"
              opacity={interpolate(progress, [0.45, 0.65, 0.8], [0, 0.8, 0.4])}
            />
          </>
        )}
        
        {/* Branches - grow from trunk - EXACTLY from the working tree */}
        {branchLength > 0 && (
          <>
            <line 
              x1="400" 
              y1={baseY - finalHeight + 50} 
              x2={400 - branchLength} 
              y2={baseY - finalHeight + 30}
              stroke="white" 
              strokeWidth={Math.min(trunkWidth - 2, 4)}
              opacity={interpolate(progress, [0.6, 0.75], [0, 1])}
            />
            <line 
              x1="400" 
              y1={baseY - finalHeight + 60} 
              x2={400 + branchLength} 
              y2={baseY - finalHeight + 40}
              stroke="white" 
              strokeWidth={Math.min(trunkWidth - 2, 4)}
              opacity={interpolate(progress, [0.65, 0.8], [0, 1])}
            />
          </>
        )}
        
        {/* Tree crown - appears last - EXACTLY from the working tree */}
        {crownSize > 0 && (
          <>
            <circle
              cx="400"
              cy={baseY - finalHeight + 30}
              r={crownSize}
              fill="none"
              stroke="white"
              strokeWidth="3"
              opacity={interpolate(progress, [0.8, 1], [0, 0.9])}
            />
            <circle
              cx="400"
              cy={baseY - finalHeight + 30}
              r={crownSize * 0.7}
              fill="none"
              stroke="white"
              strokeWidth="2"
              opacity={interpolate(progress, [0.85, 1], [0, 0.6])}
            />
            
            {/* Small detail branches in crown - EXACTLY from the working tree */}
            {progress > 0.9 && (
              <>
                <line x1="380" y1={baseY - finalHeight + 60} x2="370" y2={baseY - finalHeight + 45} stroke="white" strokeWidth="2" opacity={0.8} />
                <line x1="420" y1={baseY - finalHeight + 50} x2="430" y2={baseY - finalHeight + 35} stroke="white" strokeWidth="2" opacity={0.8} />
                <line x1="385" y1={baseY - finalHeight + 80} x2="375" y2={baseY - finalHeight + 95} stroke="white" strokeWidth="2" opacity={0.8} />
                <line x1="415" y1={baseY - finalHeight + 70} x2="425" y2={baseY - finalHeight + 85} stroke="white" strokeWidth="2" opacity={0.8} />
              </>
            )}
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
        {/* Ground line - EXACTLY from the working tree */}
        <line 
          x1="200" 
          y1="400" 
          x2="600" 
          y2="400" 
          stroke="white" 
          strokeWidth="2" 
          opacity={0.3}
        />
        
        {/* Plant growth - EXACTLY from the working tree */}
        {renderPlant()}
        
        {/* Stage indicator - EXACTLY from the working tree */}
        <text 
          x="400" 
          y="550" 
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