import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const BambooOakWisdomRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // "The bamboo that bends is stronger than the oak that resists"
  // Visual: Storm hits - rigid oak breaks, flexible bamboo survives

  const baseY = 750;
  const oakX = 200;
  const bambooX = 400;

  // STORM INTENSITY - builds up then hits hard
  const stormBuildup = Math.max(0, interpolate(progress, [0.1, 0.4], [0, 1], {
    easing: Easing.out(Easing.quad)
  }));

  const stormPeak = Math.max(stormBuildup, interpolate(progress, [0.35, 0.65], [1, 1.5], {
    easing: Easing.out(Easing.cubic)
  }));

  // OAK TREE - Rigid, breaks under pressure
  const oakHeight = 150;
  const oakWidth = 12;
  
  // Oak tries to resist - no bending until breaking point
  const oakBreakPoint = progress > 0.5;
  const oakBreakProgress = oakBreakPoint ? interpolate(progress, [0.5, 0.7], [0, 1]) : 0;

  // BAMBOO - Flexible, bends but doesn't break
  const bambooHeight = 140;
  const bambooSegments = 7;
  const bambooSegmentHeight = bambooHeight / bambooSegments;

  // Bamboo bending - graceful curve that increases with storm
  const bambooBendAngle = stormPeak * 45; // Up to 45 degree bend

  // Calculate bamboo curve points
  const getBambooPoints = () => {
    const points = [];
    for (let i = 0; i <= bambooSegments; i++) {
      const t = i / bambooSegments;
      const bendFactor = Math.sin(t * Math.PI) * bambooBendAngle; // Smooth curve
      const x = bambooX + (bendFactor * 0.8); // Horizontal displacement
      const y = baseY - (t * bambooHeight);
      points.push({ x, y });
    }
    return points;
  };

  const bambooPoints = getBambooPoints();

  // Text reveals
  const conceptText = progress > 0.15 ? interpolate(progress, [0.15, 0.3], [0, 1]) : 0;
  const stormText = progress > 0.4 && progress < 0.8 ? interpolate(progress, [0.4, 0.5, 0.8], [0, 1, 0]) : 0;
  const wisdomText = progress > 0.75 ? interpolate(progress, [0.75, 0.9], [0, 1]) : 0;

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

        {/* Storm effects - wind lines */}
        {stormPeak > 0 && (
          <g opacity={stormPeak * 0.6}>
            {/* Wind lines moving right to left */}
            <line x1="500" y1="200" x2="450" y2="205" stroke="gray" strokeWidth="2" />
            <line x1="520" y1="250" x2="460" y2="260" stroke="gray" strokeWidth="2" />
            <line x1="480" y1="300" x2="420" y2="310" stroke="gray" strokeWidth="2" />
            <line x1="510" y1="350" x2="450" y2="365" stroke="gray" strokeWidth="2" />
            <line x1="490" y1="400" x2="430" y2="415" stroke="gray" strokeWidth="2" />
            
            {/* More intense wind lines */}
            {stormPeak > 1.2 && (
              <>
                <line x1="550" y1="180" x2="480" y2="190" stroke="white" strokeWidth="1" opacity={0.8} />
                <line x1="530" y1="220" x2="470" y2="235" stroke="white" strokeWidth="1" opacity={0.8} />
                <line x1="560" y1="280" x2="490" y2="295" stroke="white" strokeWidth="1" opacity={0.8} />
              </>
            )}
          </g>
        )}

        {/* OAK TREE - Rigid and breaks */}
        <g>
          {/* Oak trunk - straight and rigid */}
          {!oakBreakPoint ? (
            <rect
              x={oakX - oakWidth/2}
              y={baseY - oakHeight}
              width={oakWidth}
              height={oakHeight}
              fill="white"
              stroke="white"
              strokeWidth="2"
            />
          ) : (
            <g>
              {/* Bottom part of broken oak */}
              <rect
                x={oakX - oakWidth/2}
                y={baseY - oakHeight * 0.6}
                width={oakWidth}
                height={oakHeight * 0.6}
                fill="white"
                stroke="white"
                strokeWidth="2"
              />
              
              {/* Top part falling/broken */}
              <rect
                x={oakX - oakWidth/2 + oakBreakProgress * 30}
                y={baseY - oakHeight + oakBreakProgress * 20}
                width={oakWidth}
                height={oakHeight * 0.4}
                fill="white"
                stroke="white"
                strokeWidth="2"
                transform={`rotate(${oakBreakProgress * 45} ${oakX + oakBreakProgress * 30} ${baseY - oakHeight * 0.8 + oakBreakProgress * 20})`}
                opacity={1 - oakBreakProgress * 0.3}
              />
              
              {/* Break debris */}
              {oakBreakProgress > 0.3 && (
                <g opacity={0.7}>
                  <circle cx={oakX + 20} cy={baseY - 80} r="2" fill="white" />
                  <circle cx={oakX + 25} cy={baseY - 85} r="1.5" fill="white" />
                  <circle cx={oakX + 15} cy={baseY - 75} r="1" fill="white" />
                </g>
              )}
            </g>
          )}

          {/* Oak branches - rigid */}
          {!oakBreakPoint && (
            <g>
              <line x1={oakX} y1={baseY - 100} x2={oakX - 30} y2={baseY - 90} stroke="white" strokeWidth="3" />
              <line x1={oakX} y1={baseY - 120} x2={oakX + 25} y2={baseY - 110} stroke="white" strokeWidth="3" />
            </g>
          )}
        </g>

        {/* BAMBOO - Flexible, bends gracefully */}
        <g>
          {/* Bamboo segments */}
          {bambooPoints.slice(0, -1).map((point, i) => {
            const nextPoint = bambooPoints[i + 1];
            return (
              <g key={i}>
                {/* Bamboo segment */}
                <line
                  x1={point.x}
                  y1={point.y}
                  x2={nextPoint.x}
                  y2={nextPoint.y}
                  stroke="lime"
                  strokeWidth="8"
                  opacity={0.9}
                />
                
                {/* Bamboo joints */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="5"
                  fill="darkgreen"
                  stroke="lime"
                  strokeWidth="1"
                />
              </g>
            );
          })}

          {/* Bamboo leaves at top */}
          {bambooPoints.length > 0 && (
            <g>
              {[-15, 0, 15].map((offset, i) => (
                <ellipse
                  key={i}
                  cx={bambooPoints[bambooPoints.length - 1].x + offset}
                  cy={bambooPoints[bambooPoints.length - 1].y - 10}
                  rx="12"
                  ry="4"
                  fill="lime"
                  opacity={0.8}
                  transform={`rotate(${offset * 2 + bambooBendAngle * 0.5} ${bambooPoints[bambooPoints.length - 1].x + offset} ${bambooPoints[bambooPoints.length - 1].y - 10})`}
                />
              ))}
            </g>
          )}
        </g>

        {/* Labels */}
        {conceptText > 0 && (
          <>
            <text 
              x={oakX} 
              y="150" 
              textAnchor="middle"
              fill="white" 
              fontSize="16" 
              fontFamily="Arial, sans-serif"
              opacity={conceptText}
            >
              OAK
            </text>
            <text 
              x={oakX} 
              y="170" 
              textAnchor="middle"
              fill="gray" 
              fontSize="12" 
              fontFamily="Arial, sans-serif"
              opacity={conceptText * 0.8}
            >
              Rigid & Strong
            </text>

            <text 
              x={bambooX} 
              y="150" 
              textAnchor="middle"
              fill="lime" 
              fontSize="16" 
              fontFamily="Arial, sans-serif"
              opacity={conceptText}
            >
              BAMBOO
            </text>
            <text 
              x={bambooX} 
              y="170" 
              textAnchor="middle"
              fill="lime" 
              fontSize="12" 
              fontFamily="Arial, sans-serif"
              opacity={conceptText * 0.8}
            >
              Flexible & Wise
            </text>
          </>
        )}

        {/* Storm indicator */}
        {stormText > 0 && (
          <text 
            x="304" 
            y="120" 
            textAnchor="middle"
            fill="red" 
            fontSize="24" 
            fontFamily="Arial, sans-serif"
            opacity={stormText}
          >
            STORM HITS!
          </text>
        )}

        {/* Wisdom quote */}
        {wisdomText > 0 && (
          <>
            <text 
              x="304" 
              y="100" 
              textAnchor="middle"
              fill="white" 
              fontSize="20" 
              fontFamily="Arial, sans-serif"
              opacity={wisdomText}
            >
              The bamboo that bends
            </text>
            <text 
              x="304" 
              y="130" 
              textAnchor="middle"
              fill="lime" 
              fontSize="24" 
              fontFamily="Arial, sans-serif"
              opacity={wisdomText}
              filter="drop-shadow(0 0 8px lime)"
            >
              is stronger than the oak that resists
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
          {progress < 0.3 ? 'CALM' : 
           progress < 0.6 ? 'STORM' : 
           progress < 0.8 ? 'BREAKING' : 'WISDOM'}
        </text>

      </svg>
    </div>
  );
};