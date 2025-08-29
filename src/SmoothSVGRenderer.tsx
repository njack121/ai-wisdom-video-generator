import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface SmoothSVGRendererProps {
  svgPlan: any;
  svgAssets: Record<string, string>;
}

export const SmoothSVGRenderer: React.FC<SmoothSVGRendererProps> = ({ svgPlan, svgAssets }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // Smooth continuous story progression - no choppy stages
  const getStoryPhase = () => {
    if (progress < 0.25) return 'emergence';
    if (progress < 0.45) return 'struggle';
    if (progress < 0.65) return 'growth';
    if (progress < 0.85) return 'transformation';
    return 'triumph';
  };

  const phase = getStoryPhase();

  // Continuous values that build on each other (like the tree growth)
  const getElementAnimation = (role: string, elementIndex: number = 0) => {
    const staggerDelay = elementIndex * 0.1; // Small stagger for multiple elements
    const adjustedProgress = Math.max(0, progress - staggerDelay);
    
    // Continuous opacity - no sudden appearances
    const opacity = interpolate(adjustedProgress, [0, 0.15, 0.9, 1], [0, 0.8, 1, 0.95]);

    // Smooth scale progression - builds continuously
    let baseScale = 0.5;
    let targetScale = 1.0;
    let scaleProgress = adjustedProgress;

    if (role === 'main') {
      // Main element grows most dramatically
      baseScale = interpolate(adjustedProgress, [0, 0.3, 0.7, 1], [0.2, 0.8, 1.2, 1.0]);
    } else if (role === 'background') {
      // Background stays subtle but grows
      baseScale = interpolate(adjustedProgress, [0, 0.4, 1], [0.8, 1.1, 1.05]);
      opacity *= 0.4; // Keep background subtle
    } else if (role === 'accent') {
      // Accent appears later, grows quickly
      baseScale = interpolate(adjustedProgress, [0, 0.5, 0.8, 1], [0, 0.3, 1.1, 0.9]);
      opacity *= interpolate(adjustedProgress, [0, 0.4, 0.8, 1], [0, 0, 0.9, 0.8]);
    }

    // Smooth position changes - no sudden jumps
    const translateY = interpolate(adjustedProgress, [0, 0.3, 0.7, 1], [30, 10, -5, 0]);

    // Gentle rotation - minimal, story-appropriate
    const rotation = interpolate(adjustedProgress, [0, 1], [0, role === 'accent' ? 15 : 5]);

    return {
      transform: `scale(${baseScale}) translateY(${translateY}px) rotate(${rotation}deg)`,
      opacity: Math.max(0, Math.min(1, opacity)),
      transition: 'filter 0.5s ease-out'
    };
  };

  // Dynamic positioning based on story progression
  const getElementPosition = (role: string) => {
    // Positions shift slightly during story progression for cinematic effect
    const cameraPanX = interpolate(progress, [0, 0.5, 1], [0, -2, 1], {
      easing: Easing.inOut(Easing.sine)
    });
    
    const cameraPanY = interpolate(progress, [0, 0.3, 0.7, 1], [0, -1, 2, 0], {
      easing: Easing.inOut(Easing.sine)
    });

    const positions = {
      main: { 
        top: `${25 + cameraPanY}%`, 
        left: `${25 + cameraPanX}%`, 
        width: '50%', 
        height: '50%' 
      },
      background: { 
        top: `${10 + cameraPanY * 0.5}%`, 
        left: `${10 + cameraPanX * 0.5}%`, 
        width: '80%', 
        height: '80%' 
      },
      accent: { 
        top: `${15 + cameraPanY * 1.5}%`, 
        right: `${15 - cameraPanX * 1.5}%`, 
        width: '35%', 
        height: '35%' 
      }
    };

    return positions[role] || positions.main;
  };

  // Continuous lighting that matches story progression
  const getStoryLighting = () => {
    // Smooth lighting transitions based on story emotion
    const lightIntensity = interpolate(progress, [0, 0.2, 0.5, 0.8, 1], [5, 10, 15, 25, 20], {
      easing: Easing.inOut(Easing.quad)
    });

    const lightColor = svgPlan.colorScheme?.primary || '#ffffff';
    
    if (progress < 0.3) {
      // Emergence - soft, growing light
      return `radial-gradient(ellipse at 40% 60%, ${lightColor}${Math.floor(lightIntensity)} 0%, transparent 70%)`;
    } else if (progress < 0.6) {
      // Struggle/Growth - dynamic lighting
      return `radial-gradient(ellipse at center, ${lightColor}${Math.floor(lightIntensity)} 0%, transparent 60%)`;
    } else {
      // Transformation/Triumph - powerful, centered light
      return `radial-gradient(circle at center, ${lightColor}${Math.floor(lightIntensity)} 0%, ${lightColor}${Math.floor(lightIntensity * 0.3)} 50%, transparent 85%)`;
    }
  };

  // Story-appropriate text that flows with animation
  const getStoryText = () => {
    const currentStage = svgPlan.animationPlan?.stages?.find((stage: any) => {
      const stageTime = stage.timePercent || 0;
      return Math.abs(progress * 100 - stageTime) < 20; // Find closest stage
    });

    return currentStage?.description || svgPlan.visualMetaphor || 'Transformation in progress';
  };

  // Render SVG with smooth, continuous animation
  const renderSmoothSVG = (role: string, svgContent: string, index: number) => {
    if (!svgContent || !svgContent.includes('<svg')) {
      return null;
    }

    const position = getElementPosition(role);
    const animation = getElementAnimation(role, index);
    
    const zIndex = {
      background: 1,
      main: 3,
      accent: 2
    }[role] || 2;

    return (
      <div
        key={`smooth-${role}-${index}`}
        style={{
          position: 'absolute',
          zIndex,
          ...position,
          ...animation
        }}
        dangerouslySetInnerHTML={{ 
          __html: svgContent.replace(
            /<svg([^>]*)>/i, 
            `<svg$1 width="100%" height="100%" style="max-width: 100%; max-height: 100%;">`
          )
        }}
      />
    );
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Smooth, continuous lighting */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: getStoryLighting(),
        zIndex: 0
      }} />
      
      {/* All SVG elements with smooth continuous animation */}
      {Object.entries(svgAssets).map(([role, content], index) => 
        renderSmoothSVG(role, content, index)
      )}

      {/* Story text with smooth transitions */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#ffffff',
        fontSize: interpolate(progress, [0, 0.5, 1], [22, 28, 24], {
          easing: Easing.inOut(Easing.quad)
        }),
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',
        textShadow: `0 0 ${interpolate(progress, [0, 1], [8, 20])}px #ffffff`,
        opacity: interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.9], {
          easing: Easing.out(Easing.quad)
        }),
        maxWidth: '80%',
        zIndex: 10,
        letterSpacing: '0.5px',
        lineHeight: 1.3
      }}>
        {getStoryText()}
      </div>

      {/* Concept title */}
      <div style={{
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#ffffff',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        opacity: interpolate(progress, [0, 0.2, 0.8, 1], [0, 0.7, 0.9, 0.8], {
          easing: Easing.out(Easing.quad)
        }),
        zIndex: 10
      }}>
        {svgPlan.concept || 'MOTIVATION'}
      </div>
    </div>
  );
};