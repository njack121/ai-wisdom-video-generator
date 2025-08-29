import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { generateAnimationWithAI } from './AIAnimationGenerator';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const generateGenerativeVideo = async (concept: string, outputPath?: string) => {
  console.log(`🎬 Generating UNIQUE video for: "${concept}"`);
  
  // Step 1: AI generates completely custom SVG animation
  console.log('🤖 AI is designing custom SVG animation...');
  const animationData = await generateAnimationWithAI(concept);
  console.log('✅ AI created unique animation:', animationData.visualMetaphor);
  console.log(`📊 Generated ${animationData.svgElements.length} custom SVG elements`);
  console.log(`🎨 Color scheme: ${animationData.colorScheme.primary}`);
  
  // Step 2: Create a temporary composition file with the AI data
  const tempCompositionPath = path.join(__dirname, 'TempGenerativeComposition.tsx');
  const compositionCode = `
import React from 'react';
import { GenerativeRenderer } from './GenerativeRenderer';

export const TempGenerativeVideo: React.FC = () => {
  const animationData = ${JSON.stringify(animationData, null, 2)};
  
  return <GenerativeRenderer animationData={animationData} />;
};
`;
  
  // Write temporary composition
  const fs = require('fs');
  fs.writeFileSync(tempCompositionPath, compositionCode);
  
  // Step 3: Bundle Remotion project
  console.log('📦 Bundling custom animation...');
  const bundleLocation = await bundle(path.join(__dirname, '../src/index.ts'));
  
  // Step 4: Register temporary composition and get it
  const comps = await selectComposition({
    serveUrl: bundleLocation,
    id: 'TempGenerativeVideo',
    inputProps: {},
  });
  
  // Step 5: Render video with custom settings
  const outputLocation = outputPath || `./output/generative_${concept.replace(/\s+/g, '_')}_${Date.now()}.mp4`;
  
  console.log('🎥 Rendering unique animation...');
  await renderMedia({
    composition: {
      ...comps,
      durationInFrames: animationData.duration,
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
  fs.unlinkSync(tempCompositionPath);
  
  console.log(`✅ UNIQUE video generated: ${outputLocation}`);
  console.log(`🎭 Story arc: ${animationData.storyArc.length} stages`);
  console.log(`⚡ Total animations: ${animationData.svgElements.reduce((sum, el) => sum + el.animationSteps.length, 0)}`);
  
  return outputLocation;
};

// CLI usage
if (require.main === module) {
  const concept = process.argv[2];
  if (!concept) {
    console.log('Usage: npm run generate-unique "your concept here"');
    process.exit(1);
  }
  
  generateGenerativeVideo(concept).catch(console.error);
}