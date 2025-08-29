import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const HardEasyGraphRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig(); // 360 frames (12 seconds at 30fps)
  
  const progress = frame / durationInFrames;
  const timeInSeconds = frame / 30;

  // Graph dimensions and positions
  const graphWidth = 500;
  const graphHeight = 120;
  const topGraphY = 200;
  const bottomGraphY = topGraphY + graphHeight + 160; // 60px separation + graph height + padding
  const graphStartX = 50;
  
  // Generate jagged peaks pattern (6 peaks to fit better)
  const peakCount = 6;
  const peakWidth = 50; // Width per peak
  const jaggedSectionWidth = peakCount * peakWidth; // 300px
  const peakHeight = 40;
  
  // TOP GRAPH - Hard Now/Easy Later (jagged first, then smooth)
  const topBaseY = topGraphY + graphHeight/2;
  let topJaggedPath = `M ${graphStartX} ${topBaseY}`;
  
  // Create jagged section
  for (let i = 0; i < peakCount; i++) {
    const x1 = graphStartX + (i * peakWidth);
    const x2 = x1 + peakWidth/2;
    const x3 = x1 + peakWidth;
    
    topJaggedPath += ` L ${x2} ${topBaseY - peakHeight}`;
    topJaggedPath += ` L ${x3} ${topBaseY}`;
  }
  
  // Smooth section for top graph
  const topSmoothStartX = graphStartX + jaggedSectionWidth;
  const topSmoothEndX = graphStartX + graphWidth;
  const topSmoothPath = `M ${topSmoothStartX} ${topBaseY} Q ${topSmoothStartX + (topSmoothEndX - topSmoothStartX)/2} ${topBaseY + 60} ${topSmoothEndX} ${topBaseY}`;

  // BOTTOM GRAPH - Easy Now/Hard Later (smooth first, then jagged)
  const bottomBaseY = bottomGraphY + graphHeight/2;
  const bottomSmoothEndX = graphStartX + (graphWidth - jaggedSectionWidth);
  const bottomSmoothPath = `M ${graphStartX} ${bottomBaseY} Q ${graphStartX + (bottomSmoothEndX - graphStartX)/2} ${bottomBaseY + 60} ${bottomSmoothEndX} ${bottomBaseY}`;
  
  // Jagged section for bottom graph
  let bottomJaggedPath = `M ${bottomSmoothEndX} ${bottomBaseY}`;
  
  for (let i = 0; i < peakCount; i++) {
    const x1 = bottomSmoothEndX + (i * peakWidth);
    const x2 = x1 + peakWidth/2;
    const x3 = x1 + peakWidth;
    
    bottomJaggedPath += ` L ${x2} ${bottomBaseY - peakHeight}`;
    bottomJaggedPath += ` L ${x3} ${bottomBaseY}`;
  }

  // Ball movement calculations
  const topBallSpeed = 4; // 4px per frame for faster movement
  const topBallPosition = Math.min(frame * topBallSpeed, graphWidth);
  const bottomBallPosition = Math.min(frame * topBallSpeed, graphWidth);

  // Determine which peak is being climbed for red flash effect
  const getClimbingPeak = (ballPos: number, isTopGraph: boolean) => {
    if (isTopGraph) {
      // Top graph: jagged section is first 60% (640px)
      if (ballPos <= jaggedSectionWidth) {
        const peakIndex = Math.floor(ballPos / peakWidth);
        const positionInPeak = (ballPos % peakWidth) / peakWidth;
        return positionInPeak > 0.2 && positionInPeak < 0.8 ? peakIndex : -1;
      }
    } else {
      // Bottom graph: jagged section is last 60%
      const smoothSectionWidth = graphWidth - jaggedSectionWidth;
      if (ballPos > smoothSectionWidth) {
        const jaggedPos = ballPos - smoothSectionWidth;
        const peakIndex = Math.floor(jaggedPos / peakWidth);
        const positionInPeak = (jaggedPos % peakWidth) / peakWidth;
        return positionInPeak > 0.2 && positionInPeak < 0.8 ? peakIndex : -1;
      }
    }
    return -1;
  };

  const topClimbingPeak = getClimbingPeak(topBallPosition, true);
  const bottomClimbingPeak = getClimbingPeak(bottomBallPosition, false);

  // Ball Y positions (following the path curves)
  const getTopBallY = () => {
    if (topBallPosition <= jaggedSectionWidth) {
      // Following jagged path
      const positionInPeak = (topBallPosition % peakWidth) / peakWidth;
      if (positionInPeak <= 0.5) {
        // Going up peak
        return topBaseY - (positionInPeak * 2 * peakHeight);
      } else {
        // Going down peak
        return topBaseY - ((1 - positionInPeak) * 2 * peakHeight);
      }
    } else {
      // Following smooth curve
      const smoothProgress = (topBallPosition - jaggedSectionWidth) / (graphWidth - jaggedSectionWidth);
      return topBaseY + (Math.sin(smoothProgress * Math.PI) * 60);
    }
  };

  const getBottomBallY = () => {
    const smoothSectionWidth = graphWidth - jaggedSectionWidth;
    if (bottomBallPosition <= smoothSectionWidth) {
      // Following smooth curve
      const smoothProgress = bottomBallPosition / smoothSectionWidth;
      return bottomBaseY + (Math.sin(smoothProgress * Math.PI) * 60);
    } else {
      // Following jagged path
      const jaggedPos = bottomBallPosition - smoothSectionWidth;
      const positionInPeak = (jaggedPos % peakWidth) / peakWidth;
      if (positionInPeak <= 0.5) {
        // Going up peak
        return bottomBaseY - (positionInPeak * 2 * peakHeight);
      } else {
        // Going down peak
        return bottomBaseY - ((1 - positionInPeak) * 2 * peakHeight);
      }
    }
  };

  // No fade out - keep animation visible throughout

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'rgb(0,0,0)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 1
    }}>
      <svg width="608" height="1080" viewBox="0 0 608 1080">
        
        {/* TOP GRAPH LABELS */}
        <text 
          x="20" 
          y={topGraphY - 20}
          fill="white" 
          fontSize="14" 
          fontFamily="Courier, monospace"
          fontWeight="bold"
        >
          HARD NOW
        </text>
        <text 
          x="588" 
          y={topGraphY - 20}
          textAnchor="end"
          fill="white" 
          fontSize="14" 
          fontFamily="Courier, monospace"
          fontWeight="bold"
        >
          EASY LATER
        </text>

        {/* BOTTOM GRAPH LABELS */}
        <text 
          x="20" 
          y={bottomGraphY - 20}
          fill="white" 
          fontSize="14" 
          fontFamily="Courier, monospace"
          fontWeight="bold"
        >
          EASY NOW
        </text>
        <text 
          x="588" 
          y={bottomGraphY - 20}
          textAnchor="end"
          fill="white" 
          fontSize="14" 
          fontFamily="Courier, monospace"
          fontWeight="bold"
        >
          HARD LATER
        </text>

        {/* TOP GRAPH - JAGGED PATH */}
        <path
          d={topJaggedPath}
          fill="none"
          stroke={topClimbingPeak >= 0 ? "rgb(255,0,0)" : "white"}
          strokeWidth="3"
          filter="drop-shadow(0 0 4px white)"
        />

        {/* TOP GRAPH - SMOOTH PATH */}
        <path
          d={topSmoothPath}
          fill="none"
          stroke="white"
          strokeWidth="3"
          filter="drop-shadow(0 0 4px white)"
        />

        {/* BOTTOM GRAPH - SMOOTH PATH */}
        <path
          d={bottomSmoothPath}
          fill="none"
          stroke="white"
          strokeWidth="3"
          filter="drop-shadow(0 0 4px white)"
        />

        {/* BOTTOM GRAPH - JAGGED PATH */}
        <path
          d={bottomJaggedPath}
          fill="none"
          stroke={bottomClimbingPeak >= 0 ? "rgb(255,0,0)" : "white"}
          strokeWidth="3"
          filter="drop-shadow(0 0 4px white)"
        />

        {/* TOP BALL */}
        <circle
          cx={graphStartX + topBallPosition}
          cy={getTopBallY()}
          r="12"
          fill="white"
          filter="drop-shadow(0 0 6px white)"
          opacity={topBallPosition <= graphWidth ? 1 : 0}
        />

        {/* BOTTOM BALL */}
        <circle
          cx={graphStartX + bottomBallPosition}
          cy={getBottomBallY()}
          r="12"
          fill="white"
          filter="drop-shadow(0 0 6px white)"
          opacity={bottomBallPosition <= graphWidth ? 1 : 0}
        />

        {/* LOGO */}
        <text 
          x="304" 
          y="1000"
          textAnchor="middle"
          fill="white" 
          fontSize="10" 
          fontFamily="Arial, sans-serif"
          opacity={0.7}
        >
          NEURONVISUALS
        </text>

      </svg>
    </div>
  );
};