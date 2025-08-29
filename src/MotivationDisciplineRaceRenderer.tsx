import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const MotivationDisciplineRaceRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // Race to finish line - two runners taking different approaches
  // Using tree technique with Math.max progressive building

  const raceDistance = 400; // Total race distance
  const startX = 100;
  const finishX = startX + raceDistance;
  
  // MOTIVATION RUNNER (Top lane) - Fast sprints with long burnout stops - NEVER FINISHES
  const motivationSprint1 = Math.max(0, interpolate(progress, [0, 0.08], [0, 60], {
    easing: Easing.out(Easing.cubic)
  }));
  
  // Long burnout stop - no progress for huge chunk of time
  const motivationRest1 = motivationSprint1; // Stays same position during 8-45%
  
  const motivationSprint2 = Math.max(motivationRest1, interpolate(progress, [0.45, 0.52], [60, 120], {
    easing: Easing.out(Easing.cubic)
  }));
  
  // Another massive burnout stop
  const motivationRest2 = motivationSprint2; // Stays same during 52-80%
  
  const motivationSprint3 = Math.max(motivationRest2, interpolate(progress, [0.8, 0.87], [120, 160], {
    easing: Easing.out(Easing.cubic)
  }));

  // Final position - gets EXHAUSTED and never reaches finish line (400px)
  const motivationFinal = motivationSprint3; // Only reaches 160px - WAY short of 400px finish

  // DISCIPLINE RUNNER (Bottom lane) - Consistent steady pace that wins
  const disciplineProgress = Math.max(0, interpolate(progress, [0.05, 0.9], [0, 420], {
    easing: Easing.linear // Perfectly steady - crosses finish line at 400px
  }));

  // Current positions
  const motivationX = startX + (progress < 0.08 ? motivationSprint1 :
                              progress < 0.45 ? motivationRest1 :
                              progress < 0.52 ? motivationSprint2 :
                              progress < 0.8 ? motivationRest2 :
                              progress < 0.87 ? motivationSprint3 : motivationFinal);
  
  const disciplineX = startX + disciplineProgress;

  // Runner states for visual feedback
  const motivationRunning = (progress < 0.08) || (progress > 0.45 && progress < 0.52) || (progress > 0.8 && progress < 0.87);
  const motivationTired = (progress > 0.08 && progress < 0.45) || (progress > 0.52 && progress < 0.8) || (progress > 0.87);

  // Text reveals
  const labelOpacity = progress > 0.2 ? interpolate(progress, [0.2, 0.35], [0, 1]) : 0;
  const winnerText = disciplineX >= finishX ? interpolate(progress, [0.9, 1], [0, 1]) : 0;

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
        
        {/* Race track lanes */}
        <line x1={startX} y1="350" x2={finishX + 100} y2="350" stroke="white" strokeWidth="2" opacity={0.3} />
        <line x1={startX} y1="450" x2={finishX + 100} y2="450" stroke="white" strokeWidth="2" opacity={0.3} />
        
        {/* Starting line */}
        <line x1={startX} y1="320" x2={startX} y2="480" stroke="white" strokeWidth="3" />
        
        {/* Finish line */}
        <line x1={finishX} y1="320" x2={finishX} y2="480" stroke="lime" strokeWidth="4" />
        <text x={finishX + 10} y="310" fill="lime" fontSize="16" fontFamily="Arial, sans-serif">FINISH</text>

        {/* MOTIVATION RUNNER (Top lane) */}
        <g>
          {/* Runner body */}
          <circle cx={motivationX} cy="340" r="12" fill={motivationRunning ? "red" : motivationTired ? "darkred" : "red"} />
          <line x1={motivationX} y1="352" x2={motivationX} y2="380" stroke={motivationRunning ? "red" : "darkred"} strokeWidth="3" />
          
          {/* Running legs animation */}
          {motivationRunning && (
            <g>
              <line 
                x1={motivationX} 
                y1="380" 
                x2={motivationX + Math.sin(frame * 0.8) * 8} 
                y2="395" 
                stroke="red" 
                strokeWidth="2" 
              />
              <line 
                x1={motivationX} 
                y1="380" 
                x2={motivationX - Math.sin(frame * 0.8) * 8} 
                y2="395" 
                stroke="red" 
                strokeWidth="2" 
              />
            </g>
          )}
          
          {/* Tired/resting legs */}
          {motivationTired && (
            <g>
              <line x1={motivationX} y1="380" x2={motivationX - 5} y2="395" stroke="darkred" strokeWidth="2" />
              <line x1={motivationX} y1="380" x2={motivationX + 5} y2="395" stroke="darkred" strokeWidth="2" />
              {/* Tired particles */}
              <circle cx={motivationX + 15} cy="335" r="2" fill="gray" opacity={0.6} />
              <circle cx={motivationX + 20} cy="340" r="1.5" fill="gray" opacity={0.4} />
            </g>
          )}
          
          {/* Speed lines when sprinting */}
          {motivationRunning && (
            <g opacity={0.7}>
              <line x1={motivationX - 20} y1="340" x2={motivationX - 10} y2="340" stroke="red" strokeWidth="1" />
              <line x1={motivationX - 25} y1="345" x2={motivationX - 15} y2="345" stroke="red" strokeWidth="1" />
            </g>
          )}
        </g>

        {/* DISCIPLINE RUNNER (Bottom lane) */}
        <g>
          {/* Runner body */}
          <circle cx={disciplineX} cy="440" r="12" fill="lime" />
          <line x1={disciplineX} y1="452" x2={disciplineX} y2="480" stroke="lime" strokeWidth="3" />
          
          {/* Steady walking legs - consistent rhythm */}
          <line 
            x1={disciplineX} 
            y1="480" 
            x2={disciplineX + Math.sin(frame * 0.2) * 5} 
            y2="495" 
            stroke="lime" 
            strokeWidth="2" 
          />
          <line 
            x1={disciplineX} 
            y1="480" 
            x2={disciplineX - Math.sin(frame * 0.2) * 5} 
            y2="495" 
            stroke="lime" 
            strokeWidth="2" 
          />
          
          {/* Steady progress indicator */}
          <circle cx={disciplineX + 10} cy="435" r="1" fill="lime" opacity={0.8} />
        </g>

        {/* Labels */}
        {labelOpacity > 0 && (
          <>
            <text 
              x="50" 
              y="280" 
              fill="red" 
              fontSize="20" 
              fontFamily="Arial, sans-serif"
              opacity={labelOpacity}
            >
              MOTIVATION
            </text>
            <text 
              x="50" 
              y="300" 
              fill="red" 
              fontSize="14" 
              fontFamily="Arial, sans-serif"
              opacity={labelOpacity * 0.8}
            >
              Sprint → Burnout → Sprint
            </text>
            
            <text 
              x="50" 
              y="520" 
              fill="lime" 
              fontSize="20" 
              fontFamily="Arial, sans-serif"
              opacity={labelOpacity}
            >
              DISCIPLINE
            </text>
            <text 
              x="50" 
              y="540" 
              fill="lime" 
              fontSize="14" 
              fontFamily="Arial, sans-serif"
              opacity={labelOpacity * 0.8}
            >
              Steady Consistent Pace
            </text>
          </>
        )}

        {/* Winner announcement */}
        {winnerText > 0 && (
          <text 
            x="304" 
            y="200" 
            textAnchor="middle"
            fill="lime" 
            fontSize="32" 
            fontFamily="Arial, sans-serif"
            opacity={winnerText}
            filter="drop-shadow(0 0 10px lime)"
          >
            DISCIPLINE WINS!
          </text>
        )}

        {/* Progress indicators with actual positions */}
        <text x="50" y="600" fill="white" fontSize="12" fontFamily="Arial, sans-serif" opacity={0.8}>
          Motivation: {Math.round(motivationX)}px ({Math.round((motivationX - startX) / raceDistance * 100)}%)
        </text>
        <text x="50" y="620" fill="white" fontSize="12" fontFamily="Arial, sans-serif" opacity={0.8}>
          Discipline: {Math.round(disciplineX)}px ({Math.round(Math.min((disciplineX - startX) / raceDistance * 100, 100))}%)
        </text>
        <text x="50" y="640" fill="white" fontSize="12" fontFamily="Arial, sans-serif" opacity={0.8}>
          Finish Line: {finishX}px
        </text>

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
          {progress < 0.2 ? 'RACE BEGINS' : 
           progress < 0.5 ? 'MOTIVATION LEADS' : 
           progress < 0.8 ? 'DISCIPLINE CATCHING UP' : 'DISCIPLINE WINS'}
        </text>

      </svg>
    </div>
  );
};