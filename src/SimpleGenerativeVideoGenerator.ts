import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { generateAnimationWithAI } from './AIAnimationGenerator';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const generateSimpleGenerativeVideo = async (concept: string, outputPath?: string) => {
  console.log(`🎬 Generating UNIQUE video for: "${concept}"`);
  
  // Step 1: AI generates completely custom animation data
  console.log('🤖 AI is designing custom animation...');
  const animationData = await generateAnimationWithAI(concept);
  console.log('✅ AI created unique animation:', animationData.visualMetaphor);
  console.log(`📊 Generated ${animationData.svgElements.length} custom SVG elements`);
  console.log(`🎨 Color scheme: ${animationData.colorScheme.primary}`);
  
  // Step 2: Bundle Remotion project
  console.log('📦 Bundling project...');
  const bundleLocation = await bundle(path.join(__dirname, '../src/index.ts'));
  
  // Step 3: Get the generative composition
  const comps = await selectComposition({
    serveUrl: bundleLocation,
    id: 'GenerativeVideo',
    inputProps: { animationData },
  });
  
  // Step 4: Render video
  const outputLocation = outputPath || `./output/unique_${concept.replace(/\s+/g, '_')}_${Date.now()}.mp4`;
  
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
    inputProps: { animationData },
  });
  
  console.log(`✅ UNIQUE video generated: ${outputLocation}`);
  console.log(`🎭 Story arc: ${animationData.storyArc.length} stages`);
  console.log(`⚡ Elements animated: ${animationData.svgElements.length}`);
  
  return outputLocation;
};

// CLI usage
if (require.main === module) {
  const concept = process.argv[2];
  if (!concept) {
    console.log('Usage: npm run generate-unique "your concept here"');
    process.exit(1);
  }
  
  generateSimpleGenerativeVideo(concept).catch(console.error);
}