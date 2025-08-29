import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { createSVGPlan } from './ConceptToSVGMapper';
import { SVGioClient } from './SVGioAPI';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config();

export const generateSVGBasedVideo = async (concept: string, outputPath?: string) => {
  console.log(`🎨 Generating SVG-BASED video for: "${concept}"`);
  
  // Step 1: Create SVG plan with AI
  console.log('🤖 AI is creating SVG generation plan...');
  const svgPlan = await createSVGPlan(concept);
  console.log('✅ SVG Plan created:', svgPlan.visualMetaphor);
  console.log(`📋 ${svgPlan.svgPrompts.length} SVGs to generate`);
  console.log(`🎭 ${svgPlan.animationPlan.stages.length} animation stages`);

  // Step 2: Generate SVGs using SVG.io API
  const svgClient = new SVGioClient(process.env.SVGIO_API_KEY!);
  
  // Check remaining credits
  const credits = await svgClient.getRemainingCredits();
  console.log(`💳 SVG.io credits remaining: ${credits}`);
  
  if (credits < svgPlan.svgPrompts.length) {
    console.warn('⚠️  Insufficient credits, using fallback generation');
  }

  console.log('🎨 Generating SVGs with SVG.io API...');
  const svgAssets: Record<string, string> = {};
  
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
        
        // Download SVG content
        const filename = `${concept.replace(/\\s+/g, '_')}_${svgPrompt.role}_${Date.now()}`;
        const svgPath = await svgClient.downloadSVG(svgData.svgUrl, filename);
        
        // Read SVG content
        const svgContent = fs.readFileSync(svgPath, 'utf-8');
        svgAssets[svgPrompt.role] = svgContent;
        
        console.log(`  💾 Saved: ${svgPrompt.role} SVG`);
      } else {
        console.warn(`  ⚠️  Failed to generate ${svgPrompt.role} SVG`);
        // Create fallback SVG
        svgAssets[svgPrompt.role] = createFallbackSVG(svgPrompt.role, svgPlan.colorScheme.primary);
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`  ❌ Error generating ${svgPrompt.role} SVG:`, error);
      // Create fallback SVG
      svgAssets[svgPrompt.role] = createFallbackSVG(svgPrompt.role, svgPlan.colorScheme.primary);
    }
  }

  // Step 3: Bundle and render
  console.log('📦 Bundling SVG-based project...');
  const bundleLocation = await bundle(path.join(__dirname, '../src/index.ts'));
  
  const inputProps = { svgPlan, svgAssets };
  
  const comps = await selectComposition({
    serveUrl: bundleLocation,
    id: 'SVGVideo',
    inputProps,
  });
  
  const outputLocation = outputPath || `./output/svg_${concept.replace(/\\s+/g, '_')}_${Date.now()}.mp4`;
  
  console.log('🎥 Rendering SVG-based animation...');
  await renderMedia({
    composition: {
      ...comps,
      durationInFrames: 210, // 7 seconds at 30fps
      fps: 30,
      width: 1080,
      height: 1080,
    },
    serveUrl: bundleLocation,
    codec: 'h264',
    outputLocation,
    inputProps,
  });
  
  console.log(`\\n✅ SVG-BASED video generated: ${outputLocation}`);
  console.log(`🎨 Used ${Object.keys(svgAssets).length} custom SVGs`);
  console.log(`🎭 ${svgPlan.animationPlan.stages.length}-stage animation story`);
  console.log(`🎨 Color scheme: ${svgPlan.colorScheme.primary} / ${svgPlan.colorScheme.secondary}`);
  console.log(`🌟 Mood: ${svgPlan.mood}`);
  
  return outputLocation;
};

// Create fallback SVG if API fails
const createFallbackSVG = (role: string, color: string): string => {
  const fallbacks = {
    main: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="80" fill="none" stroke="${color}" stroke-width="4" />
      <circle cx="100" cy="100" r="40" fill="${color}" opacity="0.3" />
    </svg>`,
    background: `<svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="50" y="50" width="200" height="200" fill="none" stroke="${color}" stroke-width="2" opacity="0.5" />
    </svg>`,
    accent: `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,10 90,90 10,90" fill="${color}" opacity="0.8" />
    </svg>`,
    progression: `<svg width="150" height="50" viewBox="0 0 150 50" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="25" x2="140" y2="25" stroke="${color}" stroke-width="3" />
      <circle cx="130" cy="25" r="8" fill="${color}" />
    </svg>`
  };
  
  return fallbacks[role as keyof typeof fallbacks] || fallbacks.main;
};

// CLI usage
if (require.main === module) {
  const concept = process.argv[2];
  if (!concept) {
    console.log('Usage: npm run generate-svg "your concept here"');
    process.exit(1);
  }
  
  generateSVGBasedVideo(concept).catch(console.error);
}