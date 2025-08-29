import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface CinematicSVGRendererProps {
  svgPlan: any;
  svgAssets: Record<string, string>;
}

export const CinematicSVGRenderer: React.FC<CinematicSVGRendererProps> = ({ svgPlan, svgAssets }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  
  const progress = frame / durationInFrames;
  const timePercent = progress * 100;

  // Define cinematic stages with specific timing and effects
  const getStageByTime = (timePercent: number) => {
    const stages = [
      { 
        name: 'opening', 
        start: 0, end: 15, 
        description: 'The challenge appears',
        camera: { zoom: 0.8, panX: 0, panY: 0 },
        lighting: 'dim'
      },
      { 
        name: 'struggle', 
        start: 15, end: 35, 
        description: 'Facing adversity',
        camera: { zoom: 1.2, panX: -10, panY: 5 },
        lighting: 'dramatic'
      },
      { 
        name: 'perseverance', 
        start: 35, end: 55, 
        description: 'Pushing through',
        camera: { zoom: 1.0, panX: 0, panY: -5 },
        lighting: 'building'
      },
      { 
        name: 'breakthrough', 
        start: 55, end: 80, 
        description: 'Breaking free',
        camera: { zoom: 0.9, panX: 5, panY: 0 },
        lighting: 'bright'
      },
      { 
        name: 'triumph', 
        start: 80, end: 100, 
        description: 'Victory achieved',
        camera: { zoom: 0.7, panX: 0, panY: 0 },
        lighting: 'golden'
      }
    ];

    return stages.find(stage => timePercent >= stage.start && timePercent <= stage.end) || stages[0];
  };

  const currentStage = getStageByTime(timePercent);
  const stageProgress = (timePercent - currentStage.start) / (currentStage.end - currentStage.start);

  // Advanced animation effects based on stage
  const getCinematicStyle = (role: string, elementIndex: number = 0) => {
    const baseDelay = elementIndex * 0.3; // Stagger elements
    const adjustedFrame = Math.max(0, frame - baseDelay * fps);
    const adjustedProgress = adjustedFrame / durationInFrames;

    // Spring animations for natural movement
    const springConfig = { 
      fps, 
      frame: adjustedFrame, 
      config: { 
        damping: 10 + (elementIndex * 2),
        stiffness: 100 - (elementIndex * 10),
        mass: 1 
      } 
    };

    let transform = '';
    let opacity = 1;
    let filter = '';

    switch (currentStage.name) {
      case 'opening':
        // Fade in from darkness
        opacity = spring({
          ...springConfig,
          from: 0,
          to: 0.7,
          config: { damping: 15, stiffness: 50 }
        });
        
        const emergingScale = spring({
          ...springConfig,
          from: 0.3,
          to: 1,
          config: { damping: 8, stiffness: 80 }
        });
        
        transform = `scale(${emergingScale}) translateY(${20 - stageProgress * 20}px)`;
        filter = `brightness(0.6) contrast(1.2)`;
        break;

      case 'struggle':
        // Shaking, struggling movement
        const shakeX = Math.sin(frame * 0.5) * (3 - stageProgress * 3);
        const shakeY = Math.cos(frame * 0.7) * (2 - stageProgress * 2);
        const struggleScale = 0.9 + Math.sin(frame * 0.3) * 0.1;
        
        opacity = 0.8 + stageProgress * 0.2;
        transform = `scale(${struggleScale}) translate(${shakeX}px, ${shakeY}px) rotate(${Math.sin(frame * 0.2) * 2}deg)`;
        filter = `brightness(0.7) saturate(0.8) hue-rotate(${-10 + stageProgress * 20}deg)`;
        break;

      case 'perseverance':
        // Steady forward movement
        const forwardY = interpolate(stageProgress, [0, 1], [0, -30]);
        const growScale = interpolate(stageProgress, [0, 1], [0.9, 1.1]);
        
        opacity = 0.9;
        transform = `scale(${growScale}) translateY(${forwardY}px)`;
        filter = `brightness(${0.8 + stageProgress * 0.3}) contrast(${1 + stageProgress * 0.3})`;
        break;

      case 'breakthrough':
        // Explosive emergence
        const burstScale = spring({
          ...springConfig,
          from: 1.1,
          to: role === 'main' ? 1.3 : 1.1,
          config: { damping: 6, stiffness: 120 }
        });
        
        const burstY = spring({
          ...springConfig,
          from: -30,
          to: role === 'main' ? -50 : -20,
          config: { damping: 8, stiffness: 100 }
        });
        
        opacity = 1;
        transform = `scale(${burstScale}) translateY(${burstY}px) rotate(${stageProgress * 360}deg)`;
        filter = `brightness(${1.2 + stageProgress * 0.3}) saturate(${1.2 + stageProgress * 0.3}) drop-shadow(0 0 20px ${svgPlan.colorScheme?.primary || '#fff'})`;
        break;

      case 'triumph':
        // Glorious finale
        const finalScale = interpolate(stageProgress, [0, 1], [1.3, 1.0]);
        const finalGlow = interpolate(stageProgress, [0, 1], [20, 40]);
        
        opacity = 1;
        transform = `scale(${finalScale}) translateY(-50px)`;
        filter = `brightness(1.4) saturate(1.5) drop-shadow(0 0 ${finalGlow}px ${svgPlan.colorScheme?.primary || '#fff'})`;
        break;
    }

    // Layer-specific adjustments
    if (role === 'background') {
      opacity *= 0.3;
      transform += ` scale(1.2)`;
    } else if (role === 'accent') {
      transform += ` rotate(${frame * 2}deg)`;
      opacity *= 0.8;
    }

    return {
      transform,
      opacity: Math.max(0, Math.min(1, opacity)),
      filter,
      transition: 'filter 0.3s ease-out'
    };
  };

  // Enhanced positioning system
  const getElementPosition = (role: string, stageProgress: number) => {
    const camera = currentStage.camera;
    
    const positions = {
      main: { 
        top: `${25 + camera.panY}%`, 
        left: `${25 + camera.panX}%`, 
        width: `${50 * camera.zoom}%`, 
        height: `${50 * camera.zoom}%` 
      },
      background: { 
        top: `${5 + camera.panY * 0.5}%`, 
        left: `${5 + camera.panX * 0.5}%`, 
        width: `${90 * camera.zoom * 1.2}%`, 
        height: `${90 * camera.zoom * 1.2}%` 
      },
      accent: { 
        top: `${15 + camera.panY * 1.5}%`, 
        right: `${15 - camera.panX * 1.5}%`, 
        width: `${30 * camera.zoom}%`, 
        height: `${30 * camera.zoom}%` 
      }
    };

    return positions[role] || positions.main;
  };

  // Dynamic lighting based on stage
  const getLightingEffect = () => {
    const lighting = currentStage.lighting;
    const lightIntensity = interpolate(stageProgress, [0, 1], [0.2, 1]);
    
    switch (lighting) {
      case 'dim':
        return `radial-gradient(ellipse at 30% 30%, ${svgPlan.colorScheme?.primary || '#fff'}10 0%, transparent 60%)`;
      case 'dramatic':
        return `linear-gradient(45deg, ${svgPlan.colorScheme?.primary || '#fff'}05 0%, transparent 40%, ${svgPlan.colorScheme?.primary || '#fff'}08 100%)`;
      case 'building':
        return `radial-gradient(ellipse at center, ${svgPlan.colorScheme?.primary || '#fff'}${Math.floor(lightIntensity * 20)} 0%, transparent 70%)`;
      case 'bright':
        return `radial-gradient(circle at 60% 40%, ${svgPlan.colorScheme?.primary || '#fff'}25 0%, transparent 80%)`;
      case 'golden':
        return `radial-gradient(ellipse at center, ${svgPlan.colorScheme?.primary || '#fff'}30 0%, ${svgPlan.colorScheme?.secondary || '#ffd700'}15 50%, transparent 90%)`;
      default:
        return `radial-gradient(ellipse at center, ${svgPlan.colorScheme?.primary || '#fff'}15 0%, transparent 70%)`;
    }
  };

  // Render SVG with cinematic effects
  const renderCinematicSVG = (role: string, svgContent: string, index: number) => {
    if (!svgContent || !svgContent.includes('<svg')) {
      return null;
    }

    const position = getElementPosition(role, stageProgress);
    const style = getCinematicStyle(role, index);
    
    const zIndex = {
      background: 1,
      main: 3,
      accent: 2
    }[role] || 2;

    return (
      <div
        key={`cinematic-${role}-${index}`}
        style={{
          position: 'absolute',
          zIndex,
          ...position,
          ...style
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
      {/* Dynamic lighting background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: getLightingEffect(),
        zIndex: 0
      }} />
      
      {/* Cinematic SVG elements */}
      {Object.entries(svgAssets).map(([role, content], index) => 
        renderCinematicSVG(role, content, index)
      )}

      {/* Stage description with cinematic typography */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: svgPlan.colorScheme?.primary || '#ffffff',
        fontSize: interpolate(stageProgress, [0, 1], [24, 32]),
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',
        textShadow: `0 0 ${interpolate(stageProgress, [0, 1], [10, 25])}px ${svgPlan.colorScheme?.primary || '#ffffff'}`,
        opacity: interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.9]),
        maxWidth: '80%',
        zIndex: 10,
        letterSpacing: '1px',
        lineHeight: 1.2
      }}>
        {currentStage.description}
      </div>

      {/* Concept title */}
      <div style={{
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: svgPlan.colorScheme?.secondary || svgPlan.colorScheme?.primary || '#ffffff',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '4px',
        opacity: 0.9,
        zIndex: 10
      }}>
        {svgPlan.concept || 'MOTIVATION'}
      </div>
    </div>
  );
};