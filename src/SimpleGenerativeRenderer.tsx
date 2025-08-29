import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface SimpleGenerativeProps {
  animationData: any; // Will be passed from VideoGenerator
}

export const SimpleGenerativeRenderer: React.FC<SimpleGenerativeProps> = ({ animationData }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;
  const timePercent = progress * 100;
  
  // Simple fallback if no animationData
  if (!animationData) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontSize: '24px'
      }}>
        Loading Animation...
      </div>
    );
  }

  // Find current story stage
  const currentStage = animationData.storyArc?.reduce((prev: any, curr: any) => {
    return timePercent >= curr.timePercent ? curr : prev;
  }, animationData.storyArc[0]) || { description: 'Transformation', visualState: 'Evolving' };

  // Generate basic animation based on AI data
  const renderGeneratedElements = () => {
    if (!animationData.svgElements) return null;

    return animationData.svgElements.map((element: any, index: number) => {
      // Basic animation properties
      const scale = interpolate(progress, [0, 1], [0.5, 1.5]);
      const rotation = interpolate(frame, [0, durationInFrames], [0, 360]);
      const opacity = interpolate(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
      
      const animatedProps = {
        ...element.attributes,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        opacity: opacity,
        style: {
          transformOrigin: 'center',
          filter: `drop-shadow(0 0 10px ${animationData.colorScheme.primary})`
        }
      };

      switch (element.type) {
        case 'circle':
          return <circle key={index} {...animatedProps} />;
        case 'rect':
          return <rect key={index} {...animatedProps} />;
        case 'path':
          return <path key={index} {...animatedProps} />;
        case 'polygon':
          return <polygon key={index} {...animatedProps} />;
        case 'line':
          return <line key={index} {...animatedProps} />;
        default:
          return null;
      }
    });
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <svg
        width="100%"
        height="80%"
        viewBox="0 0 1080 1080"
        style={{ position: 'absolute', top: '10%' }}
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={animationData.colorScheme?.primary || '#ffffff'} stopOpacity="0.8" />
            <stop offset="100%" stopColor={animationData.colorScheme?.primary || '#ffffff'} stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {renderGeneratedElements()}
      </svg>

      {/* Story Description */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: animationData.colorScheme?.primary || '#ffffff',
        fontSize: '24px',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',
        textShadow: `0 0 10px ${animationData.colorScheme?.primary || '#ffffff'}`
      }}>
        {currentStage.description}
      </div>

      {/* Concept */}
      <div style={{
        position: 'absolute',
        bottom: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: animationData.colorScheme?.primary || '#ffffff',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        opacity: 0.7,
        textTransform: 'uppercase',
        letterSpacing: '2px'
      }}>
        {animationData.concept}
      </div>

      {/* Visual Metaphor */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: animationData.colorScheme?.primary || '#ffffff',
        fontSize: '12px',
        fontFamily: 'Arial, sans-serif',
        opacity: 0.4,
        textAlign: 'center',
        maxWidth: '80%',
        lineHeight: 1.4
      }}>
        {animationData.visualMetaphor}
      </div>
    </div>
  );
};