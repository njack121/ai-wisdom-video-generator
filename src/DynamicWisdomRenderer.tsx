import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';

interface DynamicWisdomProps {
  prompt: string;
  wisdomQuote: string;
  theme: 'growth' | 'persistence' | 'balance' | 'hope' | 'courage';
}

export const DynamicWisdomRenderer: React.FC<DynamicWisdomProps> = ({
  prompt,
  wisdomQuote,
  theme
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;
  
  // Text animation timing
  const promptOpacity = interpolate(frame, [0, 30, 90, 210, 240], [0, 1, 1, 1, 0], {
    easing: Easing.out(Easing.cubic),
  });
  
  const quoteOpacity = interpolate(frame, [60, 90, 210, 240], [0, 1, 1, 0], {
    easing: Easing.out(Easing.cubic),
  });
  
  const quoteScale = interpolate(frame, [60, 90], [0.8, 1], {
    easing: Easing.out(Easing.back(1.2)),
  });

  // Theme-based visual elements
  const getThemeVisuals = () => {
    switch (theme) {
      case 'growth':
        return renderGrowthTheme();
      case 'persistence':
        return renderPersistenceTheme();
      case 'balance':
        return renderBalanceTheme();
      case 'hope':
        return renderHopeTheme();
      case 'courage':
        return renderCourageTheme();
      default:
        return renderGrowthTheme();
    }
  };

  const renderGrowthTheme = () => {
    const stemHeight = Math.max(0, interpolate(progress, [0.2, 0.8], [0, 200], {
      easing: Easing.out(Easing.cubic)
    }));
    
    const leafOpacity = Math.max(0, interpolate(progress, [0.5, 0.8], [0, 1], {
      easing: Easing.out(Easing.cubic)
    }));

    return (
      <AbsoluteFill style={{
        background: 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)'
      }}>
        {/* Growing stem */}
        <svg width="100%" height="100%" style={{ position: 'absolute' }}>
          <line
            x1="50%"
            y1="100%"
            x2="50%"
            y2={`${100 - (stemHeight / 1080 * 100)}%`}
            stroke="#4a9eff"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Leaves */}
          <g opacity={leafOpacity}>
            <ellipse cx="50%" cy="40%" rx="30" ry="15" fill="#66bb6a" transform={`translate(-20, -10) rotate(-30 ${304} 432)`} />
            <ellipse cx="50%" cy="45%" rx="25" ry="12" fill="#81c784" transform={`translate(20, -5) rotate(30 ${304} 486)`} />
          </g>
        </svg>
      </AbsoluteFill>
    );
  };

  const renderPersistenceTheme = () => {
    const dropY = interpolate(frame % 60, [0, 60], [200, 600], {
      easing: Easing.in(Easing.quad)
    });
    
    const rippleRadius = interpolate((frame + 30) % 60, [0, 20, 60], [0, 30, 0], {
      easing: Easing.out(Easing.cubic)
    });

    return (
      <AbsoluteFill style={{
        background: 'linear-gradient(180deg, #2c3e50 0%, #000000 100%)'
      }}>
        {/* Water drop */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: `${dropY}px`,
            width: 12,
            height: 16,
            background: '#3498db',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            transform: 'translateX(-50%)',
          }}
        />
        {/* Ripples */}
        <svg width="100%" height="100%" style={{ position: 'absolute' }}>
          <circle
            cx="50%"
            cy="70%"
            r={rippleRadius}
            fill="none"
            stroke="#3498db"
            strokeWidth="2"
            opacity={0.6}
          />
        </svg>
      </AbsoluteFill>
    );
  };

  const renderBalanceTheme = () => {
    const rotation = interpolate(progress, [0.2, 0.8], [-15, 0], {
      easing: Easing.out(Easing.cubic)
    });

    return (
      <AbsoluteFill style={{
        background: 'radial-gradient(circle at center, #2c3e50 0%, #000000 100%)'
      }}>
        <svg width="100%" height="100%" style={{ position: 'absolute' }}>
          {/* Balance beam */}
          <line
            x1="30%"
            y1="50%"
            x2="70%"
            y2="50%"
            stroke="#f39c12"
            strokeWidth="8"
            strokeLinecap="round"
            transform={`rotate(${rotation} 304 540)`}
          />
          {/* Center pivot */}
          <circle cx="50%" cy="50%" r="8" fill="#e67e22" />
          {/* Balance weights */}
          <circle cx="30%" cy="50%" r="20" fill="#3498db" opacity={0.8} />
          <circle cx="70%" cy="50%" r="20" fill="#e74c3c" opacity={0.8} />
        </svg>
      </AbsoluteFill>
    );
  };

  const renderHopeTheme = () => {
    const sunRadius = Math.max(0, interpolate(progress, [0.2, 0.8], [0, 80], {
      easing: Easing.out(Easing.cubic)
    }));
    
    const rayLength = interpolate(progress, [0.4, 0.8], [0, 40], {
      easing: Easing.out(Easing.cubic)
    });

    return (
      <AbsoluteFill style={{
        background: 'linear-gradient(180deg, #34495e 0%, #2c3e50 50%, #000000 100%)'
      }}>
        <svg width="100%" height="100%" style={{ position: 'absolute' }}>
          {/* Sun */}
          <circle cx="50%" cy="30%" r={sunRadius} fill="#f1c40f" opacity={0.9} />
          {/* Sun rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1="50%"
              y1="30%"
              x2="50%"
              y2={`${30 - rayLength/1080*100}%`}
              stroke="#f39c12"
              strokeWidth="4"
              strokeLinecap="round"
              transform={`rotate(${angle} 304 324)`}
              opacity={0.7}
            />
          ))}
        </svg>
      </AbsoluteFill>
    );
  };

  const renderCourageTheme = () => {
    const mountainHeight = Math.max(0, interpolate(progress, [0.2, 0.8], [0, 300], {
      easing: Easing.out(Easing.cubic)
    }));

    return (
      <AbsoluteFill style={{
        background: 'linear-gradient(180deg, #2c3e50 0%, #34495e 50%, #000000 100%)'
      }}>
        <svg width="100%" height="100%" style={{ position: 'absolute' }}>
          {/* Mountain peaks */}
          <polygon
            points={`50%,${70 - mountainHeight/1080*100}% 30%,70% 70%,70%`}
            fill="#7f8c8d"
          />
          <polygon
            points={`40%,${75 - mountainHeight/1080*100*0.8}% 20%,75% 60%,75%`}
            fill="#95a5a6"
          />
        </svg>
      </AbsoluteFill>
    );
  };

  return (
    <AbsoluteFill>
      {getThemeVisuals()}
      
      {/* Text overlay */}
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
      }}>
        {/* User prompt */}
        <div
          style={{
            fontSize: 32,
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: 40,
            opacity: promptOpacity,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 300,
            letterSpacing: '1px',
          }}
        >
          "{prompt}"
        </div>

        {/* Generated wisdom quote */}
        <div
          style={{
            fontSize: 48,
            color: '#ffffff',
            textAlign: 'center',
            opacity: quoteOpacity,
            transform: `scale(${quoteScale})`,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 600,
            lineHeight: 1.3,
            textShadow: '0 2px 10px rgba(0,0,0,0.7)',
            maxWidth: '90%',
          }}
        >
          {wisdomQuote}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};