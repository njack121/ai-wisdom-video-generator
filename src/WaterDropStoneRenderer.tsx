import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const WaterDropStoneRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // "Water dripping on a stone will eventually make a hole"
  // Visual: Consistent water drops slowly carving into solid stone

  const stoneX = 304;
  const stoneY = 500;
  const stoneWidth = 200;
  const stoneHeight = 120;

  // Progressive erosion using Math.max technique
  const erosionStage1 = Math.max(0, interpolate(progress, [0.2, 0.35], [0, 8], {
    easing: Easing.out(Easing.quad)
  }));

  const erosionStage2 = Math.max(erosionStage1, interpolate(progress, [0.3, 0.5], [8, 18], {
    easing: Easing.out(Easing.quad)
  }));

  const erosionStage3 = Math.max(erosionStage2, interpolate(progress, [0.45, 0.65], [18, 32], {
    easing: Easing.out(Easing.quad)
  }));

  const erosionStage4 = Math.max(erosionStage3, interpolate(progress, [0.6, 0.8], [32, 50], {
    easing: Easing.out(Easing.quad)
  }));

  const finalErosion = Math.max(erosionStage4, interpolate(progress, [0.75, 0.95], [50, 80], {
    easing: Easing.out(Easing.quad)
  }));

  // Water drops animation - continuous throughout
  const dropCount = Math.floor(progress * 20); // About 1 drop every 5% progress
  const currentDrop = (frame % 30) / 30; // Drop cycle every second

  // Drop positions and timing
  const dropY = interpolate(currentDrop, [0, 1], [200, stoneY - 60], {
    easing: Easing.in(Easing.quad)
  });

  // Splash effect when drop hits
  const splashOpacity = currentDrop > 0.8 ? interpolate(currentDrop, [0.8, 1], [1, 0]) : 0;

  // Text reveals
  const wisdomText1 = progress > 0.1 ? interpolate(progress, [0.1, 0.25], [0, 1]) : 0;
  const wisdomText2 = progress > 0.85 ? interpolate(progress, [0.85, 1], [0, 1]) : 0;

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
        
        {/* Water source/faucet */}
        <rect
          x={stoneX - 20}
          y="180"
          width="40"
          height="20"
          fill="white"
          opacity={0.8}
        />

        {/* Falling water drop */}
        {progress > 0.05 && (
          <ellipse
            cx={stoneX}
            cy={dropY}
            rx="6"
            ry="10"
            fill="cyan"
            opacity={0.9}
            filter="drop-shadow(0 0 4px cyan)"
          />
        )}

        {/* Stone block */}
        <rect
          x={stoneX - stoneWidth/2}
          y={stoneY - stoneHeight/2}
          width={stoneWidth}
          height={stoneHeight}
          fill="rgb(120, 120, 120)"
          stroke="white"
          strokeWidth="2"
          opacity={0.9}
        />

        {/* Progressive erosion hole */}
        {finalErosion > 0 && (
          <ellipse
            cx={stoneX}
            cy={stoneY - stoneHeight/2 + 20}
            rx={finalErosion * 0.8}
            ry={finalErosion * 0.6}
            fill="black"
            stroke="darkgray"
            strokeWidth="1"
          />
        )}

        {/* Splash effect */}
        {splashOpacity > 0 && (
          <g opacity={splashOpacity}>
            {/* Splash droplets */}
            <circle cx={stoneX - 15} cy={stoneY - 45} r="2" fill="cyan" />
            <circle cx={stoneX + 12} cy={stoneY - 48} r="3" fill="cyan" />
            <circle cx={stoneX - 8} cy={stoneY - 52} r="1.5" fill="cyan" />
            <circle cx={stoneX + 18} cy={stoneY - 40} r="2.5" fill="cyan" />
            <circle cx={stoneX - 20} cy={stoneY - 35} r="2" fill="cyan" />
          </g>
        )}

        {/* Accumulated water at bottom of hole */}
        {finalErosion > 20 && (
          <ellipse
            cx={stoneX}
            cy={stoneY - stoneHeight/2 + 20 + (finalErosion * 0.3)}
            rx={finalErosion * 0.6}
            ry="4"
            fill="cyan"
            opacity={0.7}
          />
        )}

        {/* Stone debris/particles */}
        {progress > 0.3 && (
          <g opacity={interpolate(progress, [0.3, 0.5], [0, 0.6])}>
            <circle cx={stoneX - 30} cy={stoneY + 80} r="1" fill="gray" />
            <circle cx={stoneX + 25} cy={stoneY + 85} r="1.5" fill="gray" />
            <circle cx={stoneX - 15} cy={stoneY + 90} r="1" fill="gray" />
            <circle cx={stoneX + 35} cy={stoneY + 75} r="1" fill="gray" />
          </g>
        )}

        {/* Drop counter */}
        <text 
          x="50" 
          y="300" 
          fill="cyan" 
          fontSize="16" 
          fontFamily="Arial, sans-serif"
          opacity={0.8}
        >
          Drops: {dropCount}
        </text>

        {/* Erosion depth indicator */}
        {finalErosion > 10 && (
          <text 
            x="50" 
            y="320" 
            fill="white" 
            fontSize="14" 
            fontFamily="Arial, sans-serif"
            opacity={0.6}
          >
            Depth: {Math.round(finalErosion)}px
          </text>
        )}

        {/* Wisdom text */}
        {wisdomText1 > 0 && (
          <>
            <text 
              x="304" 
              y="150" 
              textAnchor="middle"
              fill="white" 
              fontSize="24" 
              fontFamily="Arial, sans-serif"
              opacity={wisdomText1}
            >
              Water dripping on a stone
            </text>
            <text 
              x="304" 
              y="180" 
              textAnchor="middle"
              fill="cyan" 
              fontSize="20" 
              fontFamily="Arial, sans-serif"
              opacity={wisdomText1 * 0.8}
            >
              drop by drop...
            </text>
          </>
        )}

        {wisdomText2 > 0 && (
          <text 
            x="304" 
            y="800" 
            textAnchor="middle"
            fill="lime" 
            fontSize="28" 
            fontFamily="Arial, sans-serif"
            opacity={wisdomText2}
            filter="drop-shadow(0 0 8px lime)"
          >
            ...will eventually make a hole
          </text>
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
          {progress < 0.2 ? 'BEGINNING' : 
           progress < 0.5 ? 'PERSISTING' : 
           progress < 0.8 ? 'DEEPENING' : 'BREAKTHROUGH'}
        </text>

      </svg>
    </div>
  );
};