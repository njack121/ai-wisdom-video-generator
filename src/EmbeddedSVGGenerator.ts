import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { createSVGPlan } from './ConceptToSVGMapper';
import { SVGioClient } from './SVGioAPI';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config();

export const generateEmbeddedSVGVideo = async (concept: string, outputPath?: string) => {
  console.log(`🎨 Generating EMBEDDED SVG video for: "${concept}"`);
  
  // Step 1: Create SVG plan with AI
  console.log('🤖 AI is creating SVG generation plan...');
  const svgPlan = await createSVGPlan(concept);
  console.log('✅ SVG Plan created:', svgPlan.visualMetaphor);

  // Step 2: Generate and embed SVGs
  const svgClient = new SVGioClient(process.env.SVGIO_API_KEY!);
  
  console.log('🎨 Generating SVGs with SVG.io API...');
  const svgContents: Record<string, string> = {};
  
  for (let i = 0; i < svgPlan.svgPrompts.length; i++) {
    const svgPrompt = svgPlan.svgPrompts[i];
    
    try {
      console.log(`  🎨 Generating ${svgPrompt.role} SVG...`);
      const svgResponse = await svgClient.generateSVG({
        prompt: svgPrompt.prompt,
        negativePrompt: svgPrompt.negativePrompt,
        style: svgPrompt.style
      });

      if (svgResponse.success && svgResponse.data.length > 0) {
        const svgData = svgResponse.data[0];
        console.log(`  ✅ Generated: ${svgData.description}`);
        
        // Download and read SVG content directly
        const filename = `${concept.replace(/\\s+/g, '_')}_${svgPrompt.role}_${Date.now()}`;
        const svgPath = await svgClient.downloadSVG(svgData.svgUrl, filename);
        const svgContent = fs.readFileSync(svgPath, 'utf-8');
        
        svgContents[svgPrompt.role] = svgContent;
        console.log(`  💾 Embedded: ${svgPrompt.role} SVG content`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`  ❌ Error generating ${svgPrompt.role} SVG:`, error);
      svgContents[svgPrompt.role] = createFallbackSVG(svgPrompt.role, svgPlan.colorScheme.primary);
    }
  }

  // Step 3: Create a direct embedded component
  const embeddedComponentPath = path.join(__dirname, 'EmbeddedSVGComponent.tsx');
  const componentCode = `
import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const EmbeddedSVGComponent: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;
  const timePercent = progress * 100;

  // Animation values
  const scale = interpolate(progress, [0, 1], [0.8, 1.2]);
  const rotation = interpolate(frame, [0, durationInFrames], [0, 360]);
  const opacity = interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.9]);

  // SVG Contents (embedded directly)
  const svgContents = ${JSON.stringify(svgContents, null, 2)};
  
  // Plan data
  const plan = ${JSON.stringify(svgPlan, null, 2)};

  // Current stage
  const currentStage = plan.animationPlan.stages.reduce((prev, curr) => {
    return timePercent >= curr.timePercent ? curr : prev;
  }, plan.animationPlan.stages[0]) || { description: 'Transforming' };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background */}
      {svgContents.background && (
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '5%',
            width: '90%',
            height: '90%',
            opacity: opacity * 0.3,
            transform: \`scale(\${scale * 0.9}) rotate(\${rotation * 0.2}deg)\`,
            zIndex: 1
          }}
          dangerouslySetInnerHTML={{ __html: svgContents.background }}
        />
      )}
      
      {/* Main */}
      {svgContents.main && (
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '15%',
            width: '70%',
            height: '70%',
            opacity: opacity,
            transform: \`scale(\${scale}) rotate(\${rotation * 0.5}deg)\`,
            filter: \`drop-shadow(0 0 15px \${plan.colorScheme.primary})\`,
            zIndex: 2
          }}
          dangerouslySetInnerHTML={{ __html: svgContents.main }}
        />
      )}
      
      {/* Accent */}
      {svgContents.accent && (
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '30%',
            height: '30%',
            opacity: opacity * 0.8,
            transform: \`scale(\${scale * 1.1}) rotate(\${rotation}deg)\`,
            zIndex: 3
          }}
          dangerouslySetInnerHTML={{ __html: svgContents.accent }}
        />
      )}

      {/* Text overlays */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: plan.colorScheme.primary,
        fontSize: '28px',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',
        textShadow: \`0 0 15px \${plan.colorScheme.primary}\`,
        opacity: opacity,
        maxWidth: '80%',
        zIndex: 10
      }}>
        {currentStage.description}
      </div>

      <div style={{
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: plan.colorScheme.secondary || plan.colorScheme.primary,
        fontSize: '18px',
        fontFamily: 'Arial, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        opacity: 0.8,
        zIndex: 10
      }}>
        {plan.concept}
      </div>
    </div>
  );
};
`;
  
  fs.writeFileSync(embeddedComponentPath, componentCode);

  // Step 4: Bundle and render
  console.log('📦 Bundling embedded SVG project...');
  const bundleLocation = await bundle(path.join(__dirname, '../src/index.ts'));
  
  const comps = await selectComposition({
    serveUrl: bundleLocation,
    id: 'EmbeddedSVGTest',
    inputProps: {},
  });
  
  const outputLocation = outputPath || `./output/embedded_${concept.replace(/\\s+/g, '_')}_${Date.now()}.mp4`;
  
  console.log('🎥 Rendering embedded SVG animation...');
  await renderMedia({
    composition: {
      ...comps,
      durationInFrames: svgPlan.animationPlan.duration,
      fps: 30,
      width: 1080,
      height: 1080,
    },
    serveUrl: bundleLocation,
    codec: 'h264',
    outputLocation,
    inputProps: {},
  });

  // Cleanup
  fs.unlinkSync(embeddedComponentPath);
  
  console.log(`\\n✅ EMBEDDED SVG video generated: ${outputLocation}`);
  
  return outputLocation;
};

// Create fallback SVG if API fails
const createFallbackSVG = (role: string, color: string): string => {
  const fallbacks = {
    main: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="80" fill="none" stroke="${color}" stroke-width="4" />
      <circle cx="100" cy="100" r="40" fill="${color}" opacity="0.3" />
    </svg>`,
    background: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="50" y="50" width="200" height="200" fill="none" stroke="${color}" stroke-width="2" opacity="0.5" />
    </svg>`,
    accent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,10 90,90 10,90" fill="${color}" opacity="0.8" />
    </svg>`
  };
  
  return fallbacks[role as keyof typeof fallbacks] || fallbacks.main;
};

// CLI usage
if (require.main === module) {
  const concept = process.argv[2];
  if (!concept) {
    console.log('Usage: npm run generate-embedded "your concept here"');
    process.exit(1);
  }
  
  generateEmbeddedSVGVideo(concept).catch(console.error);
}