import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const PingPongNeverGiveUpRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // Stages of the ping pong metaphor - using tree approach
  const getGameStage = () => {
    if (progress < 0.25) return 'serve';
    if (progress < 0.5) return 'rally';
    if (progress < 0.75) return 'struggle';
    return 'victory';
  };

  const stage = getGameStage();

  // Progressive building using Math.max - the key to working animations
  const tableOpacity = Math.max(0, interpolate(progress, [0, 0.15], [0, 1], {
    easing: Easing.out(Easing.quad)
  }));

  const ballTrailLength = Math.max(0, interpolate(progress, [0.1, 0.4], [0, 50], {
    easing: Easing.out(Easing.cubic)
  }));

  const rallyIntensity = Math.max(ballTrailLength, interpolate(progress, [0.3, 0.6], [50, 120], {
    easing: Easing.out(Easing.cubic)
  }));

  const struggleChaos = Math.max(rallyIntensity, interpolate(progress, [0.5, 0.8], [120, 200], {
    easing: Easing.out(Easing.cubic)
  }));

  const finalTriumph = Math.max(struggleChaos, interpolate(progress, [0.75, 1], [200, 300], {
    easing: Easing.out(Easing.cubic)
  }));

  // Ball position - bounces back and forth, getting more intense
  const ballX = 400 + Math.sin(frame * 0.3 * (1 + progress * 3)) * (100 * (1 + progress * 2));
  const ballY = 200 + Math.abs(Math.sin(frame * 0.2 * (1 + progress * 2))) * 50;

  // Score progression - you're always behind until the end
  const yourScore = Math.floor(interpolate(progress, [0, 0.8], [0, 8]));
  const opponentScore = Math.floor(interpolate(progress, [0, 0.7], [0, 10]));
  const finalYourScore = progress > 0.85 ? 11 : yourScore;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#001122',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <svg width="800" height="600" viewBox="0 0 800 600">
        
        {/* Ping pong table - appears first like the ground line in tree */}
        {tableOpacity > 0 && (
          <>
            <rect 
              x="150" 
              y="250" 
              width="500" 
              height="200" 
              fill="none" 
              stroke="white" 
              strokeWidth="3"
              opacity={tableOpacity}
            />
            {/* Net in the middle */}
            <line 
              x1="400" 
              y1="250" 
              x2="400" 
              y2="450" 
              stroke="white" 
              strokeWidth="2"
              opacity={tableOpacity * 0.8}
            />
            {/* Table surface indication */}
            <line 
              x1="150" 
              y1="350" 
              x2="650" 
              y2="350" 
              stroke="white" 
              strokeWidth="1"
              opacity={tableOpacity * 0.4}
            />
          </>
        )}

        {/* Ball trail - grows with intensity like tree trunk */}
        {ballTrailLength > 0 && (
          <g opacity={interpolate(progress, [0.1, 0.4], [0, 0.8])}>
            {/* Trail dots showing ball movement */}
            {Array.from({ length: Math.floor(ballTrailLength / 10) }).map((_, i) => (
              <circle
                key={i}
                cx={ballX - (i * 15)}
                cy={ballY + Math.sin(i * 0.5) * 10}
                r={3 - (i * 0.2)}
                fill="white"
                opacity={0.8 - (i * 0.15)}
              />
            ))}
          </g>
        )}

        {/* The ball - gets more frantic as game progresses */}
        <circle
          cx={ballX}
          cy={ballY}
          r={6}
          fill="white"
          opacity={interpolate(progress, [0.05, 0.2], [0, 1])}
          filter={`drop-shadow(0 0 ${Math.max(5, finalTriumph / 20)}px white)`}
        />

        {/* Rally intensity indicators - like tree branches */}
        {rallyIntensity > ballTrailLength && (
          <g opacity={interpolate(progress, [0.3, 0.6], [0, 0.6])}>
            {/* Speed lines */}
            <line x1="100" y1="100" x2="120" y2="105" stroke="white" strokeWidth="1" opacity={0.4} />
            <line x1="680" y1="120" x2="700" y2="115" stroke="white" strokeWidth="1" opacity={0.4} />
            <line x1="90" y1="500" x2="110" y2="495" stroke="white" strokeWidth="1" opacity={0.4} />
            <line x1="690" y1="480" x2="710" y2="485" stroke="white" strokeWidth="1" opacity={0.4} />
          </g>
        )}

        {/* Struggle phase - chaos like the complex tree crown details */}
        {struggleChaos > rallyIntensity && (
          <g opacity={interpolate(progress, [0.5, 0.8], [0, 0.8])}>
            {/* Sweat drops - you're struggling */}
            <circle cx="200" cy="180" r="2" fill="white" opacity={0.3} />
            <circle cx="210" cy="190" r="1.5" fill="white" opacity={0.4} />
            <circle cx="195" cy="175" r="1" fill="white" opacity={0.5} />
            
            {/* Opponent confidence - steady lines */}
            <line x1="580" y1="160" x2="620" y2="160" stroke="white" strokeWidth="2" opacity={0.6} />
            <line x1="590" y1="150" x2="610" y2="150" stroke="white" strokeWidth="1" opacity={0.4} />
          </g>
        )}

        {/* Final triumph - like tree crown appearing */}
        {finalTriumph > struggleChaos && (
          <g opacity={interpolate(progress, [0.75, 1], [0, 1])}>
            {/* Victory burst */}
            <circle
              cx="400"
              cy="200"
              r={interpolate(progress, [0.8, 1], [20, 60])}
              fill="none"
              stroke="white"
              strokeWidth="2"
              opacity={0.6}
            />
            <circle
              cx="400"
              cy="200"
              r={interpolate(progress, [0.85, 1], [10, 40])}
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity={0.4}
            />
            
            {/* Victory lines radiating out */}
            {progress > 0.9 && (
              <>
                <line x1="400" y1="200" x2="350" y2="150" stroke="white" strokeWidth="2" opacity={0.8} />
                <line x1="400" y1="200" x2="450" y2="150" stroke="white" strokeWidth="2" opacity={0.8} />
                <line x1="400" y1="200" x2="350" y2="250" stroke="white" strokeWidth="2" opacity={0.8} />
                <line x1="400" y1="200" x2="450" y2="250" stroke="white" strokeWidth="2" opacity={0.8} />
              </>
            )}
          </g>
        )}

        {/* Score display */}
        <text x="150" y="50" fill="white" fontSize="36" fontFamily="Arial, sans-serif" opacity={0.9}>
          YOU: {finalYourScore}
        </text>
        <text x="550" y="50" fill="white" fontSize="36" fontFamily="Arial, sans-serif" opacity={0.9}>
          THEM: {opponentScore}
        </text>

        {/* Behind/ahead indicator */}
        {progress < 0.85 && (
          <text x="400" y="100" textAnchor="middle" fill="red" fontSize="20" fontFamily="Arial, sans-serif" opacity={0.7}>
            BEHIND
          </text>
        )}
        {progress >= 0.85 && (
          <text x="400" y="100" textAnchor="middle" fill="lime" fontSize="24" fontFamily="Arial, sans-serif" opacity={1}>
            COMEBACK!
          </text>
        )}

        {/* Stage indicator - like tree stage labels */}
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

        {/* Final message - the metaphor payoff */}
        {progress > 0.9 && (
          <text 
            x="400" 
            y="520" 
            textAnchor="middle" 
            fill="white" 
            fontSize="20" 
            fontFamily="Arial, sans-serif"
            opacity={interpolate(progress, [0.9, 1], [0, 1])}
          >
            Every rally matters. Never give up.
          </text>
        )}

      </svg>
    </div>
  );
};