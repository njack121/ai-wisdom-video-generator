import React, { useEffect, useRef, useState } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, staticFile } from 'remotion';
import { ConceptSVGPlan } from './ConceptToSVGMapper';

interface SVGAnimationRendererProps {
  svgPlan: ConceptSVGPlan;
  svgAssets: Record<string, string>; // role -> SVG content
}

export const SVGAnimationRenderer: React.FC<SVGAnimationRendererProps> = ({ 
  svgPlan, 
  svgAssets 
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const [svgContents, setSvgContents] = useState<Record<string, string>>({});
  
  const progress = frame / durationInFrames;
  const timePercent = progress * 100;

  // Load SVG contents
  useEffect(() => {
    console.log('Loading SVG assets:', svgAssets);
    const contents: Record<string, string> = {};
    
    for (const [role, content] of Object.entries(svgAssets)) {
      if (content && content.includes('<svg')) {
        // Direct SVG content
        contents[role] = content;
        console.log(`Loaded ${role} SVG directly`);
      } else {
        console.warn(`Invalid SVG content for role ${role}:`, content);
      }
    }
    
    console.log('SVG contents loaded:', Object.keys(contents));
    setSvgContents(contents);
  }, [svgAssets]);

  // Find current animation stage
  const currentStage = svgPlan.animationPlan.stages.reduce((prev, curr) => {
    return timePercent >= curr.timePercent ? curr : prev;
  }, svgPlan.animationPlan.stages[0]);

  // Calculate animation properties for each element
  const getElementProps = (role: 'main' | 'background' | 'accent' | 'progression') => {
    let props = {
      opacity: 1,
      scale: 1,
      rotate: 0,
      translateX: 0,
      translateY: 0,
      filter: 'none'
    };

    // Apply animations from all stages up to current time
    for (const stage of svgPlan.animationPlan.stages) {
      if (timePercent >= stage.timePercent) {
        for (const action of stage.actions) {
          if (action.element === role) {
            // Apply animation properties
            Object.entries(action.properties).forEach(([prop, values]) => {
              if (Array.isArray(values)) {
                // Interpolate between values
                const stageProgress = Math.min(
                  (timePercent - stage.timePercent) / (100 / svgPlan.animationPlan.stages.length),
                  1
                );
                
                if (typeof values[0] === 'number' && typeof values[1] === 'number') {
                  props[prop as keyof typeof props] = interpolate(
                    stageProgress,
                    [0, 1],
                    [values[0], values[1]]
                  ) as any;
                }
              } else {
                props[prop as keyof typeof props] = values as any;
              }
            });
          }
        }
      }
    }

    return props;
  };

  // Render SVG element with animations
  const renderAnimatedSVG = (role: 'main' | 'background' | 'accent' | 'progression', index: number) => {
    const svgContent = svgContents[role];
    if (!svgContent) return null;

    const props = getElementProps(role);
    
    // Layer positioning
    const zIndex = {
      background: 1,
      main: 2,
      accent: 3,
      progression: 4
    }[role];

    const size = role === 'main' ? '60%' : role === 'background' ? '80%' : '40%';
    const position = {
      background: { top: '10%', left: '10%' },
      main: { top: '20%', left: '20%' },
      accent: { top: '15%', right: '15%' },
      progression: { bottom: '15%', left: '50%', transform: 'translateX(-50%)' }
    }[role];

    return (
      <div
        key={`${role}-${index}`}
        style={{
          position: 'absolute',
          width: size,
          height: size,
          zIndex,
          opacity: props.opacity,
          transform: `
            scale(${props.scale}) 
            rotate(${props.rotate}deg) 
            translateX(${props.translateX}px) 
            translateY(${props.translateY}px)
          `,
          filter: `${props.filter} drop-shadow(0 0 10px ${svgPlan.colorScheme.primary})`,
          transition: 'all 0.5s ease-out',
          ...position
        }}
        dangerouslySetInnerHTML={{ 
          __html: svgContent.replace(
            /<svg([^>]*)>/i, 
            `<svg$1 width="100%" height="100%" style="filter: ${props.filter}">`
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
      {/* Render all SVG elements in layer order */}
      {Object.keys(svgContents).map((role, index) => 
        renderAnimatedSVG(role as any, index)
      )}

      {/* Stage Description */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: svgPlan.colorScheme.primary,
        fontSize: '28px',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',
        textShadow: `0 0 15px ${svgPlan.colorScheme.primary}`,
        opacity: interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.8]),
        maxWidth: '80%'
      }}>
        {currentStage?.description}
      </div>

      {/* Concept Title */}
      <div style={{
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: svgPlan.colorScheme.secondary,
        fontSize: '18px',
        fontFamily: 'Arial, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        opacity: 0.8
      }}>
        {svgPlan.concept}
      </div>

      {/* Visual Metaphor (subtle) */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: svgPlan.colorScheme.primary,
        fontSize: '12px',
        fontFamily: 'Arial, sans-serif',
        opacity: 0.4,
        textAlign: 'center',
        maxWidth: '90%',
        lineHeight: 1.3
      }}>
        {svgPlan.visualMetaphor}
      </div>

      {/* Mood-based background gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `radial-gradient(ellipse at center, ${svgPlan.colorScheme.primary}15 0%, transparent 70%)`,
        zIndex: 0
      }} />
    </div>
  );
};