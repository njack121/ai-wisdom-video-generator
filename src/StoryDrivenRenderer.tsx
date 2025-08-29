import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface StoryDrivenRendererProps {
  svgPlan: any;
  svgAssets: Record<string, string>;
}

export const StoryDrivenRenderer: React.FC<StoryDrivenRendererProps> = ({ svgPlan, svgAssets }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;
  const concept = svgPlan.concept || 'growth';

  // Create clear story-driven animations with obvious metaphors
  const renderStoryAnimation = () => {
    if (concept.includes('grow') || concept.includes('rise') || concept.includes('never give up')) {
      return renderSeedToTreeStory();
    } else if (concept.includes('break') || concept.includes('barrier') || concept.includes('overcome')) {
      return renderBreakingWallStory();
    } else if (concept.includes('transform') || concept.includes('change') || concept.includes('mindset')) {
      return renderCaterpillarToButterflyStory();
    } else if (concept.includes('strength') || concept.includes('power') || concept.includes('build')) {
      return renderMuscleGrowthStory();
    } else if (concept.includes('journey') || concept.includes('path') || concept.includes('hell')) {
      return renderMountainClimbStory();
    } else {
      return renderSeedToTreeStory(); // Default
    }
  };

  // STORY 1: Seed to Tree (Never Give Up)
  const renderSeedToTreeStory = () => {
    return (
      <g>
        {/* Stage 1: Small seed in soil (0-20%) */}
        {progress >= 0 && (
          <g opacity={interpolate(progress, [0, 0.2], [0, 1])}>
            <line x1="200" y1="400" x2="600" y2="400" stroke="white" strokeWidth="3" opacity={0.4} />
            <text x="400" y="450" textAnchor="middle" fill="white" fontSize="16" opacity={0.6}>SOIL</text>
            <ellipse cx="400" cy="390" rx="8" ry="5" fill="white" />
            <text x="400" y="500" textAnchor="middle" fill="white" fontSize="20">A small seed...</text>
          </g>
        )}

        {/* Stage 2: Sprout emerges (20-40%) */}
        {progress >= 0.2 && (
          <g opacity={interpolate(progress, [0.2, 0.4], [0, 1])}>
            <line x1="400" y1="400" x2="400" y2={400 - interpolate(progress, [0.2, 0.4], [0, 50])} stroke="white" strokeWidth="4" />
            <text x="400" y="500" textAnchor="middle" fill="white" fontSize="20">...pushes through...</text>
          </g>
        )}

        {/* Stage 3: Growing stronger (40-70%) */}
        {progress >= 0.4 && (
          <g opacity={interpolate(progress, [0.4, 0.7], [0, 1])}>
            <line x1="400" y1="400" x2="400" y2={400 - interpolate(progress, [0.4, 0.7], [50, 120])} stroke="white" strokeWidth="6" />
            {/* Branches */}
            <line x1="400" y1="320" x2={380} y2="300" stroke="white" strokeWidth="3" />
            <line x1="400" y1="330" x2={420} y2="310" stroke="white" strokeWidth="3" />
            <text x="400" y="500" textAnchor="middle" fill="white" fontSize="20">...against all odds...</text>
          </g>
        )}

        {/* Stage 4: Full mighty tree (70-100%) */}
        {progress >= 0.7 && (
          <g opacity={interpolate(progress, [0.7, 1], [0, 1])}>
            <line x1="400" y1="400" x2="400" y2="250" stroke="white" strokeWidth="8" />
            {/* Full branch system */}
            <line x1="400" y1="280" x2="350" y2="250" stroke="white" strokeWidth="4" />
            <line x1="400" y1="290" x2="450" y2="260" stroke="white" strokeWidth="4" />
            <line x1="400" y1="310" x2="360" y2="290" stroke="white" strokeWidth="3" />
            <line x1="400" y1="320" x2="440" y2="300" stroke="white" strokeWidth="3" />
            {/* Crown */}
            <circle cx="400" cy="260" r="50" fill="none" stroke="white" strokeWidth="4" />
            <circle cx="400" cy="260" r="35" fill="none" stroke="white" strokeWidth="2" opacity={0.6} />
            <text x="400" y="500" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">NEVER GIVE UP!</text>
          </g>
        )}
      </g>
    );
  };

  // STORY 2: Breaking Wall (Break Through Barriers)
  const renderBreakingWallStory = () => {
    const crackSize = interpolate(progress, [0.4, 0.8], [0, 50]);
    
    return (
      <g>
        {/* Stage 1: Person facing wall (0-30%) */}
        {progress < 0.8 && (
          <g>
            {/* Wall */}
            <rect x={350 - crackSize/2} y="200" width={50 + crackSize/2} height="200" fill="none" stroke="white" strokeWidth="4" />
            <rect x={400 + crackSize/2} y="200" width={50 - crackSize/2} height="200" fill="none" stroke="white" strokeWidth="4" />
            {/* Wall texture lines */}
            <line x1="360" y1="220" x2="390" y2="220" stroke="white" strokeWidth="1" opacity={0.5} />
            <line x1="360" y1="260" x2="390" y2="260" stroke="white" strokeWidth="1" opacity={0.5} />
            <line x1="410" y1="240" x2="440" y2="240" stroke="white" strokeWidth="1" opacity={0.5} />
            <line x1="410" y1="280" x2="440" y2="280" stroke="white" strokeWidth="1" opacity={0.5} />
          </g>
        )}

        {/* Stage 1: Person approaches (0-30%) */}
        {progress >= 0 && progress < 0.4 && (
          <g opacity={interpolate(progress, [0, 0.3], [0, 1])}>
            <circle cx="250" cy="340" r="15" fill="none" stroke="white" strokeWidth="2" />
            <line x1="250" y1="355" x2="250" y2="385" stroke="white" strokeWidth="3" />
            <line x1="250" y1="365" x2="270" y2="365" stroke="white" strokeWidth="2" />
            <line x1="250" y1="385" x2="240" y2="410" stroke="white" strokeWidth="2" />
            <line x1="250" y1="385" x2="260" y2="410" stroke="white" strokeWidth="2" />
            <text x="400" y="480" textAnchor="middle" fill="white" fontSize="18">Facing the barrier...</text>
          </g>
        )}

        {/* Stage 2: Person pushing (30-60%) */}
        {progress >= 0.3 && progress < 0.8 && (
          <g opacity={interpolate(progress, [0.3, 0.6], [0, 1])}>
            <circle cx="300" cy="340" r="15" fill="none" stroke="white" strokeWidth="2" />
            <line x1="300" y1="355" x2="300" y2="385" stroke="white" strokeWidth="3" />
            <line x1="300" y1="365" x2="340" y2="365" stroke="white" strokeWidth="3" />
            <line x1="300" y1="385" x2="285" y2="410" stroke="white" strokeWidth="2" />
            <line x1="300" y1="385" x2="315" y2="410" stroke="white" strokeWidth="2" />
            <text x="400" y="480" textAnchor="middle" fill="white" fontSize="18">Push with all your might...</text>
          </g>
        )}

        {/* Stage 3: Wall breaks, light emerges (60-100%) */}
        {progress >= 0.6 && (
          <g opacity={interpolate(progress, [0.6, 1], [0, 1])}>
            {/* Light rays through crack */}
            <line x1="400" y1="200" x2="400" y2="400" stroke="white" strokeWidth={crackSize/3} opacity={0.8} />
            <line x1="390" y1="210" x2="410" y2="390" stroke="white" strokeWidth={crackSize/6} opacity={0.6} />
            <line x1="410" y1="210" x2="390" y2="390" stroke="white" strokeWidth={crackSize/6} opacity={0.6} />
            {/* Success figure */}
            <circle cx="320" cy="340" r="15" fill="none" stroke="white" strokeWidth="2" />
            <line x1="320" y1="355" x2="320" y2="385" stroke="white" strokeWidth="3" />
            <line x1="320" y1="365" x2="305" y2="350" stroke="white" strokeWidth="2" />
            <line x1="320" y1="365" x2="335" y2="350" stroke="white" strokeWidth="2" />
            <text x="400" y="480" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">BREAKTHROUGH!</text>
          </g>
        )}
      </g>
    );
  };

  // STORY 3: Caterpillar to Butterfly (Transform)
  const renderCaterpillarToButterflyStory = () => {
    return (
      <g>
        {/* Stage 1: Caterpillar (0-25%) */}
        {progress < 0.5 && (
          <g opacity={interpolate(progress, [0, 0.25], [0, 1])}>
            <ellipse cx="300" cy="300" rx="40" ry="15" fill="none" stroke="white" strokeWidth="3" />
            <circle cx="280" cy="295" r="8" fill="none" stroke="white" strokeWidth="2" />
            <line x1="275" y1="290" x2="270" y2="285" stroke="white" strokeWidth="1" />
            <line x1="275" y1="290" x2="270" y2="295" stroke="white" strokeWidth="1" />
            <text x="400" y="450" textAnchor="middle" fill="white" fontSize="18">Old way of thinking...</text>
          </g>
        )}

        {/* Stage 2: Cocoon transformation (25-65%) */}
        {progress >= 0.25 && progress < 0.65 && (
          <g opacity={interpolate(progress, [0.25, 0.5], [0, 1])}>
            <ellipse cx="400" cy="300" rx="30" ry="50" fill="none" stroke="white" strokeWidth="4" />
            <line x1="380" y1="270" x2="420" y2="280" stroke="white" strokeWidth="1" opacity={0.5} />
            <line x1="380" y1="290" x2="420" y2="300" stroke="white" strokeWidth="1" opacity={0.5} />
            <line x1="380" y1="310" x2="420" y2="320" stroke="white" strokeWidth="1" opacity={0.5} />
            <text x="400" y="450" textAnchor="middle" fill="white" fontSize="18">Transformation in progress...</text>
          </g>
        )}

        {/* Stage 3: Butterfly emerges (65-100%) */}
        {progress >= 0.65 && (
          <g opacity={interpolate(progress, [0.65, 1], [0, 1])}>
            {/* Butterfly body */}
            <line x1="500" y1="280" x2="500" y2="320" stroke="white" strokeWidth="3" />
            <circle cx="500" cy="275" r="4" fill="white" />
            {/* Wings */}
            <path d="M 490 285 Q 470 270 480 300 Q 485 285 490 285" fill="none" stroke="white" strokeWidth="2" />
            <path d="M 510 285 Q 530 270 520 300 Q 515 285 510 285" fill="none" stroke="white" strokeWidth="2" />
            <path d="M 490 295 Q 475 290 485 310 Q 488 295 490 295" fill="none" stroke="white" strokeWidth="2" />
            <path d="M 510 295 Q 525 290 515 310 Q 512 295 510 295" fill="none" stroke="white" strokeWidth="2" />
            {/* Antennae */}
            <line x1="498" y1="275" x2="495" y2="265" stroke="white" strokeWidth="1" />
            <line x1="502" y1="275" x2="505" y2="265" stroke="white" strokeWidth="1" />
            <text x="400" y="450" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">TRANSFORMED!</text>
          </g>
        )}
      </g>
    );
  };

  // STORY 4: Mountain Climb (Journey/Hell)
  const renderMountainClimbStory = () => {
    const climberY = interpolate(progress, [0, 1], [400, 200]);
    const climberX = 300 + progress * 200;
    
    return (
      <g>
        {/* Mountain */}
        <path d="M 200 450 L 400 150 L 600 450 Z" fill="none" stroke="white" strokeWidth="3" />
        <line x1="250" y1="400" x2="350" y2="250" stroke="white" strokeWidth="1" opacity={0.3} />
        <line x1="450" y1="250" x2="550" y2="400" stroke="white" strokeWidth="1" opacity={0.3} />
        
        {/* Climber */}
        <g>
          <circle cx={climberX} cy={climberY - 15} r="8" fill="none" stroke="white" strokeWidth="2" />
          <line x1={climberX} y1={climberY - 7} x2={climberX} y2={climberY + 8} stroke="white" strokeWidth="2" />
          <line x1={climberX} y1={climberY - 2} x2={climberX - 10} y2={climberY + 5} stroke="white" strokeWidth="2" />
          <line x1={climberX} y1={climberY - 2} x2={climberX + 10} y2={climberY + 5} stroke="white" strokeWidth="2" />
          <line x1={climberX} y1={climberY + 8} x2={climberX - 6} y2={climberY + 18} stroke="white" strokeWidth="2" />
          <line x1={climberX} y1={climberY + 8} x2={climberX + 6} y2={climberY + 18} stroke="white" strokeWidth="2" />
        </g>
        
        {/* Progress text */}
        <text x="400" y="500" textAnchor="middle" fill="white" fontSize="18">
          {progress < 0.3 ? "Starting the climb..." :
           progress < 0.7 ? "Keep going through hell..." :
           "Reach the summit!"}
        </text>
        
        {/* Summit celebration */}
        {progress >= 0.9 && (
          <g opacity={interpolate(progress, [0.9, 1], [0, 1])}>
            <circle cx="400" cy="140" r="20" fill="none" stroke="white" strokeWidth="3" opacity={0.7} />
            <text x="400" y="480" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">VICTORY!</text>
          </g>
        )}
      </g>
    );
  };

  // STORY 5: Muscle Growth (Strength)
  const renderMuscleGrowthStory = () => {
    const muscleSize = interpolate(progress, [0, 1], [0, 25]);
    
    return (
      <g>
        {/* Person getting stronger */}
        <g>
          {/* Head */}
          <circle cx="400" cy="250" r="20" fill="none" stroke="white" strokeWidth="3" />
          
          {/* Body */}
          <line x1="400" y1="270" x2="400" y2="350" stroke="white" strokeWidth={4 + muscleSize/5} />
          
          {/* Arms growing */}
          <line x1="400" y1="290" x2={370 - muscleSize} y2="300" stroke="white" strokeWidth={3 + muscleSize/4} />
          <line x1="400" y1="290" x2={430 + muscleSize} y2="300" stroke="white" strokeWidth={3 + muscleSize/4} />
          
          {/* Muscle definition */}
          {muscleSize > 10 && (
            <>
              <circle cx={370 - muscleSize} cy="300" r={muscleSize/3} fill="none" stroke="white" strokeWidth="2" opacity={0.6} />
              <circle cx={430 + muscleSize} cy="300" r={muscleSize/3} fill="none" stroke="white" strokeWidth="2" opacity={0.6} />
              <ellipse cx="400" cy="310" rx={10 + muscleSize/2} ry="15" fill="none" stroke="white" strokeWidth="2" opacity={0.4} />
            </>
          )}
          
          {/* Legs */}
          <line x1="400" y1="350" x2="385" y2="400" stroke="white" strokeWidth={3 + muscleSize/6} />
          <line x1="400" y1="350" x2="415" y2="400" stroke="white" strokeWidth={3 + muscleSize/6} />
        </g>
        
        {/* Power emanation */}
        {progress > 0.7 && (
          <>
            <circle cx="400" cy="300" r={30 + muscleSize} fill="none" stroke="white" strokeWidth="2" opacity={0.3} />
            <circle cx="400" cy="300" r={50 + muscleSize} fill="none" stroke="white" strokeWidth="1" opacity={0.2} />
          </>
        )}
        
        <text x="400" y="480" textAnchor="middle" fill="white" fontSize="18">
          {progress < 0.4 ? "Building strength..." :
           progress < 0.8 ? "Growing stronger..." :
           "UNSTOPPABLE POWER!"}
        </text>
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
        {renderStoryAnimation()}
        
        {/* Main concept title */}
        <text 
          x="400" 
          y="80" 
          textAnchor="middle" 
          fill="white" 
          fontSize="24" 
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          opacity={interpolate(progress, [0, 0.1, 0.9, 1], [0, 0.8, 0.9, 1])}
        >
          {svgPlan.concept?.toUpperCase() || 'MOTIVATION'}
        </text>
      </svg>
    </div>
  );
};