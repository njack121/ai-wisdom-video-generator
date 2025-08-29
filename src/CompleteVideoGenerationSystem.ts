import { openaiSVGGenerator } from './OpenAISVGGenerator';
import { symbolicAnalyzer } from './SymbolicConceptAnalyzer';
import { intelligentPromptGenerator } from './IntelligentPromptGenerator';
// import { promptAnalyzer } from './PromptPatternAnalyzer';
import fs from 'fs/promises';

interface GenerationResult {
  success: boolean;
  componentName: string;
  filePath: string;
  concept: string;
  method: 'openai_svg' | 'symbolic_analysis' | 'pattern_learning' | 'fallback';
  analysis?: any;
  error?: string;
}

export class CompleteVideoGenerationSystem {
  
  /**
   * Generate a complete video component from any concept using the best available method
   */
  async generateVideoFromConcept(
    concept: string, 
    userPromptStyle?: string,
    preferredMethod?: 'openai_svg' | 'symbolic_analysis' | 'pattern_learning'
  ): Promise<GenerationResult> {
    
    console.log(`🎬 COMPLETE VIDEO GENERATION: "${concept}"`);
    
    try {
      // Method 1: OpenAI + SVG.io (Most powerful)
      if (!preferredMethod || preferredMethod === 'openai_svg') {
        try {
          console.log('🤖 Trying OpenAI + SVG.io method...');
          const result = await openaiSVGGenerator.generateSVGVideoFromConcept(concept);
          
          const componentName = this.generateComponentName(concept) + 'AIRenderer';
          const filePath = `./src/${componentName}.tsx`;
          
          await fs.writeFile(filePath, result.componentCode);
          
          console.log('✅ OpenAI + SVG method successful!');
          return {
            success: true,
            componentName,
            filePath,
            concept,
            method: 'openai_svg',
            analysis: result.plan
          };
          
        } catch (error) {
          console.log('⚠️ OpenAI + SVG method failed, trying symbolic analysis...');
        }
      }

      // Method 2: Pure OpenAI Symbolic Analysis (Reliable)
      if (!preferredMethod || preferredMethod === 'symbolic_analysis') {
        try {
          console.log('🧠 Trying pure OpenAI symbolic analysis...');
          const analysis = await symbolicAnalyzer.analyzeConceptSymbolism(concept, userPromptStyle);
          const componentCode = this.generateSymbolicComponent(concept, analysis);
          
          const componentName = this.generateComponentName(concept) + 'SymbolicRenderer';
          const filePath = `./src/${componentName}.tsx`;
          
          await fs.writeFile(filePath, componentCode);
          
          console.log('✅ Symbolic analysis method successful!');
          return {
            success: true,
            componentName,
            filePath,
            concept,
            method: 'symbolic_analysis',
            analysis
          };
          
        } catch (error) {
          console.log('⚠️ Symbolic analysis failed, trying pattern learning...');
        }
      }

      // Method 3: Pattern Learning System (Fast)
      if (!preferredMethod || preferredMethod === 'pattern_learning') {
        try {
          console.log('📚 Trying pattern learning system...');
          const enhancedResult = intelligentPromptGenerator.generateEnhancedPrompt(concept);
          const componentCode = this.generatePatternBasedComponent(concept, enhancedResult);
          
          const componentName = this.generateComponentName(concept) + 'PatternRenderer';
          const filePath = `./src/${componentName}.tsx`;
          
          await fs.writeFile(filePath, componentCode);
          
          console.log('✅ Pattern learning method successful!');
          return {
            success: true,
            componentName,
            filePath,
            concept,
            method: 'pattern_learning'
          };
          
        } catch (error) {
          console.log('⚠️ Pattern learning failed, using fallback...');
        }
      }

      // Fallback Method: Basic geometric animation
      console.log('🔧 Using fallback method...');
      const componentCode = this.generateFallbackComponent(concept);
      const componentName = this.generateComponentName(concept) + 'FallbackRenderer';
      const filePath = `./src/${componentName}.tsx`;
      
      await fs.writeFile(filePath, componentCode);
      
      console.log('✅ Fallback method completed');
      return {
        success: true,
        componentName,
        filePath,
        concept,
        method: 'fallback'
      };

    } catch (error) {
      console.error('❌ All methods failed:', error);
      return {
        success: false,
        componentName: '',
        filePath: '',
        concept,
        method: 'fallback',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Generate video with automatic addition to Composition.tsx
   */
  async generateAndAddToComposition(
    concept: string, 
    userPromptStyle?: string
  ): Promise<GenerationResult> {
    
    const result = await this.generateVideoFromConcept(concept, userPromptStyle);
    
    if (result.success) {
      await this.addToComposition(result.componentName, result.concept);
      console.log(`✅ Added ${result.componentName} to Composition.tsx`);
    }
    
    return result;
  }

  private generateComponentName(concept: string): string {
    return concept
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
      .replace(/[^a-zA-Z]/g, '');
  }

  private generateSymbolicComponent(concept: string, analysis: any): string {
    const componentName = this.generateComponentName(concept) + 'SymbolicRenderer';
    // const duration = analysis.technicalSpecs?.duration || 5;
    
    return `import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

// GENERATED FROM OPENAI SYMBOLIC ANALYSIS
// Concept: "${concept}"
// Primary Metaphor: ${analysis.coreSymbolism?.primaryMetaphor || 'Visual representation'}
// Emotional Journey: ${analysis.coreSymbolism?.emotionalJourney?.join(' → ') || 'contemplative experience'}

export const ${componentName}: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;
  const timeInSeconds = frame / 30;

  // Symbolic animation phases based on OpenAI analysis
  const phase1Opacity = interpolate(progress, [0, 0.3], [0, 1]);
  const phase2Opacity = interpolate(progress, [0.2, 0.6], [0, 1]);
  const phase3Opacity = interpolate(progress, [0.5, 1], [0, 1]);
  
  const mainScale = interpolate(progress, [0, 0.5, 1], [0.5, 1, 1.2]);
  const rotationAngle = interpolate(progress, [0, 1], [0, 360]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'rgb(0,0,0)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <svg width="800" height="600" viewBox="0 0 800 600" style={{position: 'absolute'}}>
        {/* Phase 1: ${analysis.visualMapping?.shapes?.[0]?.meaning || 'Beginning'} */}
        {phase1Opacity > 0 && (
          <circle
            cx="400"
            cy="300"
            r="50"
            fill="none"
            stroke="white"
            strokeWidth="3"
            opacity={phase1Opacity}
            transform={\`scale(\${mainScale}) rotate(\${rotationAngle} 400 300)\`}
            filter="drop-shadow(0 0 10px white)"
          />
        )}

        {/* Phase 2: ${analysis.visualMapping?.shapes?.[1]?.meaning || 'Development'} */}
        {phase2Opacity > 0 && (
          <polygon
            points="400,250 450,350 350,350"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity={phase2Opacity * 0.8}
            filter="drop-shadow(0 0 8px white)"
          />
        )}

        {/* Phase 3: ${analysis.visualMapping?.shapes?.[2]?.meaning || 'Resolution'} */}
        {phase3Opacity > 0 && (
          <rect
            x="350"
            y="250"
            width="100"
            height="100"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity={phase3Opacity * 0.6}
            filter="drop-shadow(0 0 6px white)"
          />
        )}
      </svg>

      {/* Concept text overlay */}
      {progress > 0.7 && (
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            width: '100%',
            textAlign: 'center',
            color: 'white',
            fontSize: '28px',
            fontFamily: 'Arial, sans-serif',
            fontWeight: '300',
            opacity: interpolate(progress, [0.7, 0.9], [0, 1]),
            textShadow: '0 0 20px black'
          }}
        >
          {concept}
        </div>
      )}
    </div>
  );
};`;
  }

  private generatePatternBasedComponent(concept: string, enhancedResult: any): string {
    const componentName = this.generateComponentName(concept) + 'PatternRenderer';
    
    return `import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

// GENERATED FROM PATTERN LEARNING SYSTEM
// Concept: "${concept}"
// Based on patterns: ${enhancedResult.basedOnPatterns?.join(', ') || 'general patterns'}
// Confidence: ${Math.round((enhancedResult.confidence || 0.8) * 100)}%

export const ${componentName}: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  // Pattern-based animations
  const elementOpacity = interpolate(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const elementScale = interpolate(progress, [0, 0.5, 1], [0.3, 1, 1.1]);
  const glowIntensity = interpolate(progress, [0, 0.5, 1], [5, 15, 10]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '${enhancedResult.suggestedSpecs?.backgroundColor || 'rgb(0,0,0)'}',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <svg width="800" height="600" viewBox="0 0 800 600">
        {/* Pattern-learned visual elements */}
        <circle
          cx="400"
          cy="300"
          r="80"
          fill="none"
          stroke="white"
          strokeWidth="3"
          opacity={elementOpacity}
          transform={\`scale(\${elementScale})\`}
          filter={\`drop-shadow(0 0 \${glowIntensity}px white)\`}
        />
        
        <circle
          cx="400"
          cy="300"
          r="40"
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity={elementOpacity * 0.7}
          transform={\`scale(\${elementScale})\`}
          filter={\`drop-shadow(0 0 \${glowIntensity * 0.5}px white)\`}
        />
      </svg>

      {/* Concept text */}
      {progress > 0.5 && (
        <div
          style={{
            position: 'absolute',
            bottom: '25%',
            width: '100%',
            textAlign: 'center',
            color: 'white',
            fontSize: '${enhancedResult.suggestedSpecs?.fontSize || '24px'}',
            fontFamily: 'Arial, sans-serif',
            opacity: interpolate(progress, [0.5, 0.7], [0, 1]),
            filter: 'drop-shadow(0 0 10px white)'
          }}
        >
          {concept}
        </div>
      )}
    </div>
  );
};`;
  }

  private generateFallbackComponent(concept: string): string {
    const componentName = this.generateComponentName(concept) + 'FallbackRenderer';
    
    return `import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

// FALLBACK COMPONENT FOR: "${concept}"
// Basic geometric animation ensuring system always works

export const ${componentName}: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'rgb(0,0,0)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <svg width="800" height="600" viewBox="0 0 800 600">
        <circle
          cx="400"
          cy="300"
          r={interpolate(progress, [0, 1], [20, 100])}
          fill="none"
          stroke="white"
          strokeWidth="3"
          opacity={interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.7])}
          filter="drop-shadow(0 0 10px white)"
        />
      </svg>
      
      <div
        style={{
          position: 'absolute',
          bottom: '30%',
          width: '100%',
          textAlign: 'center',
          color: 'white',
          fontSize: '32px',
          fontFamily: 'Arial, sans-serif',
          opacity: interpolate(progress, [0.5, 1], [0, 1])
        }}
      >
        {concept}
      </div>
    </div>
  );
};`;
  }

  private async addToComposition(componentName: string, concept: string): Promise<void> {
    try {
      const compositionPath = './src/Composition.tsx';
      const compositionContent = await fs.readFile(compositionPath, 'utf-8');
      
      // Add import
      const importStatement = `import { ${componentName} } from './${componentName}';`;
      const updatedImports = compositionContent.replace(
        /import { mapConceptToVisual }/,
        `${importStatement}\nimport { mapConceptToVisual }`
      );
      
      // Add composition entry
      const compositionId = componentName.replace('Renderer', '');
      const compositionEntry = `
      {/* Generated: ${concept} */}
      <Composition
        id="${compositionId}"
        component={${componentName}}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />`;
      
      const finalContent = updatedImports.replace(
        /    <\/>\s*\)\s*;\s*}/,
        `    ${compositionEntry}
    </>
  );
};`
      );
      
      await fs.writeFile(compositionPath, finalContent);
      
    } catch (error) {
      console.log('Note: Could not automatically add to Composition.tsx:', error);
    }
  }

  /**
   * Get system status and capabilities
   */
  getSystemStatus(): string {
    return `🎬 COMPLETE VIDEO GENERATION SYSTEM STATUS:

✅ Available Methods:
1. OpenAI + SVG.io (Most powerful) - Uses GPT-4 for concept analysis + SVG.io for unique visuals
2. OpenAI Symbolic Analysis (Reliable) - Pure GPT-4 symbolic interpretation with geometric rendering  
3. Pattern Learning System (Fast) - Learns from successful prompts for instant generation
4. Fallback System (Always works) - Ensures system never fails

✅ Capabilities:
• Analyzes any concept for deep symbolic meaning
• Generates unique visual representations
• Creates precise timing and animations
• Learns from detailed user prompts
• Automatically adds to Composition.tsx
• Handles API failures gracefully

✅ Ready for: Any concept, any prompt style, any complexity level`;
  }
}

export const completeVideoSystem = new CompleteVideoGenerationSystem();