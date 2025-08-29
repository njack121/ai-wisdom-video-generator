import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { analyzeConceptWithAI } from './AIConceptMapper';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const generateMotivationalVideo = async (concept: string, outputPath?: string) => {
  console.log(`🎬 Generating video for: "${concept}"`);
  
  // Step 1: AI Analysis
  console.log('🤖 Analyzing concept with AI...');
  const analysis = await analyzeConceptWithAI(concept);
  console.log('✅ AI Analysis complete:', analysis.visualMetaphor);
  
  // Step 2: Bundle Remotion project
  console.log('📦 Bundling Remotion project...');
  const bundleLocation = await bundle(path.join(__dirname, '../src/index.ts'));
  
  // Step 3: Get composition
  const comps = await selectComposition({
    serveUrl: bundleLocation,
    id: 'MotivationalVideo',
    inputProps: analysis,
  });
  
  // Step 4: Render video
  const outputLocation = outputPath || `./output/${concept.replace(/\s+/g, '_')}_${Date.now()}.mp4`;
  
  console.log('🎥 Rendering video...');
  await renderMedia({
    composition: comps,
    serveUrl: bundleLocation,
    codec: 'h264',
    outputLocation,
    inputProps: analysis,
  });
  
  console.log(`✅ Video generated: ${outputLocation}`);
  return outputLocation;
};

// CLI usage
if (require.main === module) {
  const concept = process.argv[2];
  if (!concept) {
    console.log('Usage: npm run generate "your concept here"');
    process.exit(1);
  }
  
  generateMotivationalVideo(concept).catch(console.error);
}