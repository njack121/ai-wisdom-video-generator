import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const PlantingTreesWisdomRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // "The best time to plant a tree was 20 years ago. The second best time is now."
  // Visual metaphor: Two scenarios - past opportunity vs present action

  const baseY = 700;
  const leftX = 150;  // "20 years ago" tree
  const rightX = 450; // "Now" tree

  // LEFT SIDE - The tree that could have been (20 years ago)
  // Shows as ghost/outline - the missed opportunity
  const pastTreeOpacity = Math.max(0, interpolate(progress, [0.1, 0.3], [0, 0.4], {
    easing: Easing.out(Easing.quad)
  }));

  const pastTreeHeight = 180; // Fully grown tree height
  const pastTreeWidth = 15;   // Thick trunk

  // RIGHT SIDE - The tree being planted now (using proven tree technique)
  const presentSeed = Math.max(0, interpolate(progress, [0.3, 0.45], [0, 15], {
    easing: Easing.out(Easing.quad)
  }));

  const presentStem = Math.max(presentSeed, interpolate(progress, [0.4, 0.6], [15, 40], {
    easing: Easing.out(Easing.cubic)
  }));

  const presentTrunk = Math.max(presentStem, interpolate(progress, [0.55, 0.75], [40, 80], {
    easing: Easing.out(Easing.cubic)
  }));

  const presentBranches = Math.max(0, interpolate(progress, [0.7, 0.85], [0, 25], {
    easing: Easing.out(Easing.quad)
  }));

  const presentLeaves = Math.max(0, interpolate(progress, [0.8, 0.95], [0, 20], {
    easing: Easing.out(Easing.quad)
  }));

  // Text reveals
  const pastText = progress > 0.2 ? interpolate(progress, [0.2, 0.35], [0, 1]) : 0;
  const nowText = progress > 0.5 ? interpolate(progress, [0.5, 0.65], [0, 1]) : 0;
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

        {/* LEFT SIDE - Ghost tree (20 years ago opportunity) */}
        {pastTreeOpacity > 0 && (
          <g opacity={pastTreeOpacity}>
            {/* Full grown tree trunk */}
            <rect
              x={leftX - pastTreeWidth/2}
              y={baseY - pastTreeHeight}
              width={pastTreeWidth}
              height={pastTreeHeight}
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            
            {/* Full grown branches */}
            <line x1={leftX} y1={baseY - 140} x2={leftX - 40} y2={baseY - 120} stroke="white" strokeWidth="2" strokeDasharray="3,3" />
            <line x1={leftX} y1={baseY - 130} x2={leftX + 35} y2={baseY - 110} stroke="white" strokeWidth="2" strokeDasharray="3,3" />
            <line x1={leftX} y1={baseY - 110} x2={leftX - 30} y2={baseY - 90} stroke="white" strokeWidth="2" strokeDasharray="3,3" />
            <line x1={leftX} y1={baseY - 100} x2={leftX + 28} y2={baseY - 80} stroke="white" strokeWidth="2" strokeDasharray="3,3" />
            
            {/* Full grown crown */}
            <circle
              cx={leftX}
              cy={baseY - pastTreeHeight + 40}
              r="50"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity={0.8}
            />
            <circle
              cx={leftX}
              cy={baseY - pastTreeHeight + 40}
              r="35"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="3,3"
              opacity={0.6}
            />
          </g>
        )}

        {/* RIGHT SIDE - Present tree growing (using tree technique) */}
        <g>
          {/* Seed stage */}
          {presentSeed > 0 && (
            <ellipse
              cx={rightX}
              cy={baseY - presentSeed/2}
              rx={presentSeed/2}
              ry={presentSeed/3}
              fill="white"
              opacity={interpolate(progress, [0.3, 0.45], [1, 0.7])}
            />
          )}

          {/* Growing stem/trunk */}
          {presentTrunk > presentSeed && (
            <rect
              x={rightX - 3}
              y={baseY - presentTrunk}
              width={6}
              height={presentTrunk - presentSeed}
              fill="white"
              opacity={interpolate(progress, [0.4, 0.75], [0, 1])}
            />
          )}

          {/* Small branches */}
          {presentBranches > 0 && (
            <g opacity={interpolate(progress, [0.7, 0.85], [0, 1])}>
              <line x1={rightX} y1={baseY - presentTrunk + 20} x2={rightX - presentBranches} y2={baseY - presentTrunk + 10} stroke="white" strokeWidth="2" />
              <line x1={rightX} y1={baseY - presentTrunk + 30} x2={rightX + presentBranches * 0.8} y2={baseY - presentTrunk + 20} stroke="white" strokeWidth="2" />
            </g>
          )}

          {/* Small leaves/crown beginning */}
          {presentLeaves > 0 && (
            <g opacity={interpolate(progress, [0.8, 0.95], [0, 1])}>
              <circle
                cx={rightX}
                cy={baseY - presentTrunk + 10}
                r={presentLeaves}
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
            </g>
          )}
        </g>

        {/* Time labels */}
        {pastText > 0 && (
          <>
            <text 
              x={leftX} 
              y="200" 
              textAnchor="middle"
              fill="white" 
              fontSize="18" 
              fontFamily="Arial, sans-serif"
              opacity={pastText * 0.6}
            >
              20 YEARS AGO
            </text>
            <text 
              x={leftX} 
              y="220" 
              textAnchor="middle"
              fill="gray" 
              fontSize="14" 
              fontFamily="Arial, sans-serif"
              opacity={pastText * 0.8}
            >
              (missed opportunity)
            </text>
          </>
        )}

        {nowText > 0 && (
          <>
            <text 
              x={rightX} 
              y="200" 
              textAnchor="middle"
              fill="white" 
              fontSize="18" 
              fontFamily="Arial, sans-serif"
              opacity={nowText}
            >
              NOW
            </text>
            <text 
              x={rightX} 
              y="220" 
              textAnchor="middle"
              fill="lime" 
              fontSize="14" 
              fontFamily="Arial, sans-serif"
              opacity={nowText}
            >
              (taking action)
            </text>
          </>
        )}

        {/* Wisdom quote */}
        {wisdomText > 0 && (
          <>
            <text 
              x="304" 
              y="100" 
              textAnchor="middle"
              fill="white" 
              fontSize="24" 
              fontFamily="Arial, sans-serif"
              opacity={wisdomText}
            >
              The best time to plant a tree
            </text>
            <text 
              x="304" 
              y="130" 
              textAnchor="middle"
              fill="white" 
              fontSize="24" 
              fontFamily="Arial, sans-serif"
              opacity={wisdomText}
            >
              was 20 years ago.
            </text>
            <text 
              x="304" 
              y="170" 
              textAnchor="middle"
              fill="lime" 
              fontSize="28" 
              fontFamily="Arial, sans-serif"
              opacity={wisdomText}
              filter="drop-shadow(0 0 8px lime)"
            >
              The second best time is now.
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
          {progress < 0.3 ? 'REGRET' : progress < 0.7 ? 'PLANTING' : 'WISDOM'}
        </text>

      </svg>
    </div>
  );
};