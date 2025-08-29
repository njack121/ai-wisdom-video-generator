import React, { useEffect, useRef } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { GenerativeAnimation } from './GenerativeAnimationSystem';

interface UniqueAnimationProps {
  animationData: GenerativeAnimation;
}

export const UniqueAnimationRenderer: React.FC<UniqueAnimationProps> = ({ animationData }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  // Convert frame to progress (0-1)
  const progress = frame / durationInFrames;
  const timePercent = progress * 100;
  
  // Find current story arc stage
  const currentStage = animationData.storyArc.reduce((prev, curr) => {
    return timePercent >= curr.timePercent ? curr : prev;
  }, animationData.storyArc[0]);

  // Animate each SVG element based on its animation steps
  const animateElementProperties = (element: any, elementIndex: number) => {
    let animatedProps = { ...element.attributes };
    
    element.animationSteps.forEach((step: any, stepIndex: number) => {
      // Calculate when this step should start/end (as percentage of total duration)
      const stepStartPercent = (stepIndex / element.animationSteps.length) * 100;
      const stepEndPercent = ((stepIndex + 1) / element.animationSteps.length) * 100;
      
      // Only animate if we're in this step's time range
      if (timePercent >= stepStartPercent && timePercent <= stepEndPercent) {
        const stepProgress = (timePercent - stepStartPercent) / (stepEndPercent - stepStartPercent);
        
        // Animate each property in this step
        Object.entries(step.properties).forEach(([prop, values]: [string, any]) => {
          if (Array.isArray(values) && values.length === 2) {
            // Interpolate between start and end values
            const startVal = values[0];
            const endVal = values[1];
            
            if (typeof startVal === 'number' && typeof endVal === 'number') {
              animatedProps[prop] = interpolate(stepProgress, [0, 1], [startVal, endVal]);
            }
          } else if (typeof values === 'string') {
            // Handle string animations like rotate, translate
            if (values.includes('deg')) {
              const degrees = parseFloat(values);
              animatedProps.transform = `${animatedProps.transform || ''} rotate(${degrees * stepProgress}deg)`;
            }
          }
        });
      }
    });
    
    return animatedProps;
  };

  // Render SVG element with animated properties
  const renderAnimatedElement = (element: any, index: number) => {
    const animatedProps = animateElementProperties(element, index);
    const { type } = element;

    const commonProps = {
      key: index,
      style: {
        transformOrigin: 'center',
        filter: `drop-shadow(0 0 8px ${animationData.colorScheme.primary})`
      },
      ...animatedProps
    };

    switch (type) {
      case 'circle':
        return <circle {...commonProps} />;
      case 'rect':
        return <rect {...commonProps} />;
      case 'path':
        return <path {...commonProps} />;
      case 'polygon':
        return <polygon {...commonProps} />;
      case 'line':
        return <line {...commonProps} />;
      case 'polyline':
        return <polyline {...commonProps} />;
      default:
        return null;
    }
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
      {/* Main SVG Canvas */}
      <svg
        width="100%"
        height="80%"
        viewBox="0 0 1080 1080"
        style={{ 
          position: 'absolute',
          top: '10%',
        }}
      >
        <defs>
          <radialGradient id="primaryGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={animationData.colorScheme.primary} stopOpacity="0.8" />
            <stop offset="100%" stopColor={animationData.colorScheme.primary} stopOpacity="0" />
          </radialGradient>
          
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Render all animated SVG elements */}
        {animationData.svgElements.map(renderAnimatedElement)}
      </svg>

      {/* Story Arc Description */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: animationData.colorScheme.primary,
        fontSize: '28px',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',
        textShadow: `0 0 15px ${animationData.colorScheme.primary}`,
        opacity: interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
      }}>
        {currentStage?.description}
      </div>

      {/* Visual State */}
      <div style={{
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: animationData.colorScheme.secondary || animationData.colorScheme.primary,
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        opacity: 0.8
      }}>
        {currentStage?.visualState}
      </div>

      {/* Concept Title */}
      <div style={{
        position: 'absolute',
        bottom: '3%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: animationData.colorScheme.primary,
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        opacity: 0.6,
        textTransform: 'uppercase',
        letterSpacing: '2px'
      }}>
        {animationData.concept}
      </div>
    </div>
  );
};