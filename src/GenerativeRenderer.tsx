import React, { useEffect, useRef } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import anime from 'animejs';
import { GenerativeAnimation } from './GenerativeAnimationSystem';

interface GenerativeRendererProps {
  animationData: GenerativeAnimation;
}

export const GenerativeRenderer: React.FC<GenerativeRendererProps> = ({ animationData }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<anime.AnimeTimelineInstance | null>(null);
  
  // Convert frame to time percentage
  const timePercent = (frame / durationInFrames) * 100;
  const currentTime = (frame / fps) * 1000; // Convert to milliseconds for anime.js

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous animations
    if (timelineRef.current) {
      timelineRef.current.pause();
    }

    // Create new timeline
    const tl = anime.timeline({
      duration: (durationInFrames / fps) * 1000,
      autoplay: false,
      easing: 'linear'
    });

    // Add element animations to timeline
    animationData.svgElements.forEach((element) => {
      element.animationSteps.forEach((step, stepIndex) => {
        tl.add({
          targets: `#${element.attributes.id}`,
          duration: step.duration,
          delay: step.delay || 0,
          easing: step.easing,
          ...step.properties,
        }, stepIndex === 0 ? 0 : '-=50%'); // Overlap animations slightly
      });
    });

    // Add global animations
    animationData.globalAnimations.forEach((globalAnim) => {
      globalAnim.timeline.forEach((step, stepIndex) => {
        tl.add({
          targets: globalAnim.selector,
          duration: step.duration,
          delay: step.delay || 0,
          easing: step.easing,
          ...step.properties,
        }, stepIndex * 500); // Stagger global animations
      });
    });

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.pause();
      }
    };
  }, [animationData, durationInFrames, fps]);

  // Sync timeline with current frame
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.seek(currentTime);
    }
  }, [currentTime]);

  // Generate SVG elements
  const renderSVGElement = (element: any, index: number) => {
    const { type, attributes } = element;
    const commonProps = {
      key: index,
      className: 'animated-element all-elements',
      style: {
        transformOrigin: 'center',
        opacity: attributes.opacity || 1,
      },
      ...attributes
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

  // Find current story arc stage
  const currentStage = animationData.storyArc.reduce((prev, curr) => {
    return timePercent >= curr.timePercent ? curr : prev;
  }, animationData.storyArc[0]);

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
        ref={svgRef}
        width="100%"
        height="80%"
        viewBox="0 0 1080 1080"
        style={{ 
          position: 'absolute',
          top: '10%',
          overflow: 'visible'
        }}
      >
        <defs>
          {/* Gradient definitions */}
          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={animationData.colorScheme.primary} stopOpacity="1" />
            <stop offset="100%" stopColor={animationData.colorScheme.primary} stopOpacity="0" />
          </radialGradient>
          
          {/* Filter effects */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Render all SVG elements */}
        {animationData.svgElements.map(renderSVGElement)}
      </svg>

      {/* Story Arc Description */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: animationData.colorScheme.primary,
        fontSize: '24px',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',
        opacity: 0.9,
        textShadow: `0 0 10px ${animationData.colorScheme.primary}`
      }}>
        {currentStage?.description}
      </div>

      {/* Concept Title */}
      <div style={{
        position: 'absolute',
        bottom: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: animationData.colorScheme.secondary || animationData.colorScheme.primary,
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        opacity: 0.7,
        textTransform: 'uppercase',
        letterSpacing: '3px'
      }}>
        {animationData.concept}
      </div>

      {/* Visual Metaphor (subtle overlay) */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: animationData.colorScheme.primary,
        fontSize: '12px',
        fontFamily: 'Arial, sans-serif',
        opacity: 0.3,
        textAlign: 'center',
        maxWidth: '80%'
      }}>
        {animationData.visualMetaphor}
      </div>
    </div>
  );
};