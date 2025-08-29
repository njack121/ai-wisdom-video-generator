import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface DirectSVGRendererProps {
  svgPlan: any;
  svgAssets: Record<string, string>;
}

export const DirectSVGRenderer: React.FC<DirectSVGRendererProps> = ({ svgPlan, svgAssets }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;
  const timePercent = progress * 100;

  // Find current animation stage
  const currentStage = svgPlan.animationPlan?.stages?.reduce((prev: any, curr: any) => {
    return timePercent >= curr.timePercent ? curr : prev;
  }, svgPlan.animationPlan.stages[0]) || { 
    description: 'Transformation', 
    actions: [] 
  };

  // Simple animation properties based on progress
  const getElementStyle = (role: string) => {
    const baseScale = role === 'main' ? 1 : 0.8;
    const scale = interpolate(progress, [0, 1], [baseScale * 0.5, baseScale * 1.2]);
    const opacity = interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.9]);
    const rotation = interpolate(frame, [0, durationInFrames], [0, role === 'main' ? 360 : 180]);
    
    return {
      transform: `scale(${scale}) rotate(${rotation}deg)`,
      opacity,
      filter: `drop-shadow(0 0 10px ${svgPlan.colorScheme?.primary || '#ffffff'})`,
      transition: 'all 0.5s ease-out'
    };
  };

  // Render SVG with inline content
  const renderSVGElement = (role: string, svgContent: string, index: number) => {
    if (!svgContent || !svgContent.includes('<svg')) {
      return null;
    }

    const position = {
      main: { top: '20%', left: '20%', width: '60%', height: '60%' },
      background: { top: '10%', left: '10%', width: '80%', height: '80%' },
      accent: { top: '15%', right: '15%', width: '40%', height: '40%' }
    }[role] || { top: '25%', left: '25%', width: '50%', height: '50%' };

    const zIndex = {
      background: 1,
      main: 2,
      accent: 3
    }[role] || 2;

    return (
      <div
        key={`${role}-${index}`}
        style={{
          position: 'absolute',
          zIndex,
          ...position,
          ...getElementStyle(role)
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
      {/* Mood-based background gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `radial-gradient(ellipse at center, ${svgPlan.colorScheme?.primary || '#ffffff'}15 0%, transparent 70%)`,
        zIndex: 0
      }} />
      
      {/* Render all SVG elements */}
      {Object.entries(svgAssets).map(([role, content], index) => 
        renderSVGElement(role, content, index)
      )}

      {/* Stage Description */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: svgPlan.colorScheme?.primary || '#ffffff',
        fontSize: '28px',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',
        textShadow: `0 0 15px ${svgPlan.colorScheme?.primary || '#ffffff'}`,
        opacity: interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.8]),
        maxWidth: '80%',
        zIndex: 10
      }}>
        {currentStage?.description || 'Transforming'}
      </div>

      {/* Concept Title */}
      <div style={{
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: svgPlan.colorScheme?.secondary || svgPlan.colorScheme?.primary || '#ffffff',
        fontSize: '18px',
        fontFamily: 'Arial, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        opacity: 0.8,
        zIndex: 10
      }}>
        {svgPlan.concept || 'MOTIVATION'}
      </div>

      {/* Visual Metaphor */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: svgPlan.colorScheme?.primary || '#ffffff',
        fontSize: '12px',
        fontFamily: 'Arial, sans-serif',
        opacity: 0.4,
        textAlign: 'center',
        maxWidth: '90%',
        lineHeight: 1.3,
        zIndex: 10
      }}>
        {svgPlan.visualMetaphor || 'A journey of growth and transformation'}
      </div>
    </div>
  );
};