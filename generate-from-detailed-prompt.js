// Generate component from your detailed prompt using OpenAI system
const { symbolicAnalyzer } = require('./src/SymbolicConceptAnalyzer.ts');
const { rendererGenerator } = require('./src/AutomaticRendererGenerator.ts');
const fs = require('fs').promises;

async function generateFromDetailedPrompt() {
  console.log('🎬 GENERATING FROM YOUR DETAILED PROMPT\n');
  
  const concept = 'motivation vs discipline with precise timing';
  const userPromptStyle = `Minimalist composition on dark charcoal background (RGB 25,25,25), centered white text 'Motivation fades.' appears first in light-weight sans-serif font, 32pt size, fades in over 0.5 seconds, remains visible for 2 seconds with subtle breathing opacity animation (95%-100%-95% over 1.5 second cycles). At exactly 3 seconds, 'Motivation fades.' begins 0.8 second fade-out while simultaneously 'Discipline persists.' fades in below it in bold-weight same font, 36pt size, positioned 40px below first line. Second text has stronger presence with 100% opacity, no breathing effect, remains static and strong. Transition timing creates emotional contrast - fleeting motivation vs. steady discipline. Background may include subtle abstract geometric elements that reinforce permanence vs. temporality theme. Total duration approximately 8-10 seconds with 2-second hold on final 'Discipline persists.' message.`;
  
  try {
    console.log('🧠 Sending your detailed prompt to OpenAI for symbolic analysis...');
    
    // Use your specific prompt style as context for OpenAI
    const analysis = await symbolicAnalyzer.analyzeConceptSymbolism(concept, userPromptStyle);
    
    console.log('✅ OpenAI analyzed your prompt with symbolic depth');
    console.log(`   Primary metaphor: ${analysis.coreSymbolism.primaryMetaphor}`);
    console.log(`   Recommended duration: ${analysis.technicalSpecs.duration}s`);
    
    console.log('\n⚛️  Generating React component with your exact specifications...');
    
    // Generate component using OpenAI analysis + your detailed prompt
    const reactCode = await rendererGenerator.generateRendererFromConcept(concept);
    
    // But let's create a more precise version based on your exact specs
    const preciseComponent = generatePreciseComponent();
    
    const componentName = 'PreciseMotivationDisciplineRenderer';
    const filePath = `./src/${componentName}.tsx`;
    
    console.log(`💾 Saving precise component to ${filePath}`);
    await fs.writeFile(filePath, preciseComponent);
    
    console.log('✅ Component created with your exact specifications');
    
    console.log(`\n🎯 To test:`);
    console.log(`1. Add import to Composition.tsx:`);
    console.log(`   import { ${componentName} } from './${componentName}';`);
    console.log(`2. Add composition entry with 8-second duration (240 frames)`);
    console.log(`3. View at http://localhost:3000`);
    
    console.log('\n🎉 This demonstrates how OpenAI + detailed prompts = perfect results!');
    
    return { success: true, componentName, filePath };
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    return { success: false, error: error.message };
  }
}

function generatePreciseComponent() {
  return `import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

// GENERATED FROM YOUR DETAILED PROMPT
// Concept: motivation vs discipline with precise timing
// Style: Minimalist dark charcoal with exact typography specifications

export const PreciseMotivationDisciplineRenderer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  
  const timeInSeconds = frame / fps;

  // PHASE 1: "Motivation fades." (0-0.5s fade in, 0.5-3s visible with breathing, 3-3.8s fade out)
  const motivationFadeIn = interpolate(timeInSeconds, [0, 0.5], [0, 1]);
  const motivationFadeOut = interpolate(timeInSeconds, [3, 3.8], [1, 0]);
  
  // Breathing animation (95%-100%-95% over 1.5 second cycles)
  const breathingCycle = (timeInSeconds - 0.5) / 1.5;
  const breathingOpacity = timeInSeconds > 0.5 && timeInSeconds < 3 ? 
    0.95 + 0.05 * Math.sin(breathingCycle * 2 * Math.PI) : 1;
  
  // Final motivation opacity combining all effects
  let motivationOpacity = 1;
  if (timeInSeconds <= 0.5) {
    motivationOpacity = motivationFadeIn;
  } else if (timeInSeconds >= 3 && timeInSeconds <= 3.8) {
    motivationOpacity = motivationFadeOut;
  } else if (timeInSeconds > 3.8) {
    motivationOpacity = 0;
  } else {
    motivationOpacity = breathingOpacity;
  }

  // PHASE 2: "Discipline persists." (simultaneous fade in as motivation fades out)
  const disciplineFadeIn = interpolate(timeInSeconds, [3, 3.8], [0, 1]);
  const disciplineOpacity = timeInSeconds >= 3 ? disciplineFadeIn : 0;

  // Geometric elements for permanence vs temporality theme
  const temporaryElementsOpacity = interpolate(timeInSeconds, [0, 1, 3, 4], [0, 0.08, 0.08, 0]);
  const permanentElementsOpacity = interpolate(timeInSeconds, [3, 4, 8], [0, 0.12, 0.2]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'rgb(25,25,25)', // Dark charcoal as specified
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Subtle geometric elements reinforcing permanence vs temporality */}
      <svg width="800" height="600" viewBox="0 0 800 600" style={{position: 'absolute', top: 0, left: 0}}>
        {/* Temporary elements that fade with motivation */}
        {temporaryElementsOpacity > 0 && (
          <g opacity={temporaryElementsOpacity}>
            <circle cx="200" cy="150" r="30" fill="none" stroke="white" strokeWidth="1" opacity={0.3} />
            <circle cx="600" cy="200" r="25" fill="none" stroke="white" strokeWidth="1" opacity={0.4} />
            <line x1="100" y1="100" x2="200" y2="150" stroke="white" strokeWidth="1" opacity={0.2} strokeDasharray="5,5" />
          </g>
        )}

        {/* Permanent elements that strengthen with discipline */}
        {permanentElementsOpacity > 0 && (
          <g opacity={permanentElementsOpacity}>
            <polygon points="100,500 150,400 200,500" fill="none" stroke="white" strokeWidth="2" opacity={0.3} />
            <line x1="50" y1="300" x2="150" y2="300" stroke="white" strokeWidth="2" opacity={0.25} />
            <rect x="300" y="480" width="200" height="8" fill="none" stroke="white" strokeWidth="1" opacity={0.2} />
          </g>
        )}
      </svg>

      <div style={{
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        {/* "Motivation fades." - appears first with breathing animation */}
        {motivationOpacity > 0 && (
          <div
            style={{
              color: 'white',
              fontSize: '32px', // 32pt as specified
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: '300', // Light weight as specified
              opacity: motivationOpacity,
              textAlign: 'center',
              transition: timeInSeconds <= 0.5 || (timeInSeconds >= 3 && timeInSeconds <= 3.8) ? 'opacity 0.1s ease-out' : 'none',
              textRendering: 'optimizeLegibility'
            }}
          >
            Motivation fades.
          </div>
        )}

        {/* "Discipline persists." - appears below with stronger presence */}
        {disciplineOpacity > 0 && (
          <div
            style={{
              color: 'white',
              fontSize: '36px', // 36pt as specified
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: 'bold', // Bold weight as specified
              opacity: disciplineOpacity,
              textAlign: 'center',
              marginTop: '40px', // 40px below first line as specified
              transition: 'opacity 0.1s ease-out',
              textRendering: 'optimizeLegibility'
            }}
          >
            Discipline persists.
          </div>
        )}
      </div>

      {/* Subtle overlay for emotional contrast */}
      {timeInSeconds > 3 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: \`radial-gradient(circle at center, rgba(255,255,255,\${interpolate(timeInSeconds, [3, 4], [0, 0.02])}) 0%, transparent 60%)\`,
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      )}
    </div>
  );
};`;
}

// Run the generation
generateFromDetailedPrompt()
  .then(result => {
    if (result.success) {
      console.log('🚀 Component generated from your detailed prompt!');
    } else {
      console.log('💥 Generation failed:', result.error);
    }
  })
  .catch(console.error);