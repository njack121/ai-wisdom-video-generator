import React from 'react';
import { StoryDrivenRenderer } from './StoryDrivenRenderer';

// This will be populated by props
export const SVGVideoComposition: React.FC<{
  svgPlan?: any;
  svgAssets?: Record<string, string>;
}> = ({ svgPlan, svgAssets }) => {
  
  // Debug logging
  console.log('SVGVideoComposition received:', { 
    hasPlan: !!svgPlan, 
    hasAssets: !!svgAssets,
    assetKeys: svgAssets ? Object.keys(svgAssets) : []
  });

  // If no data provided, show fallback
  if (!svgPlan || !svgAssets) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontSize: '24px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div>🎨 SVG Animation Ready</div>
          <div style={{ fontSize: '16px', marginTop: '10px', opacity: 0.7 }}>
            Use npm run generate-svg "concept" to create videos
          </div>
        </div>
      </div>
    );
  }

  return <StoryDrivenRenderer svgPlan={svgPlan} svgAssets={svgAssets} />;
};