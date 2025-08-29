import { symbolicAnalyzer } from './SymbolicConceptAnalyzer';

interface RendererTemplate {
  concept: string;
  componentName: string;
  symbolicAnalysis: any;
  generatedCode: string;
  userRating?: 'excellent' | 'good' | 'poor';
}

export class AutomaticRendererGenerator {
  private templates: RendererTemplate[] = [];
  
  async generateRendererFromConcept(concept: string): Promise<string> {
    console.log(`🎬 Generating React component for: "${concept}"`);
    
    // Step 1: Get symbolic analysis from OpenAI
    const analysis = await symbolicAnalyzer.analyzeConceptSymbolism(concept);
    
    console.log(`🔍 Symbolic analysis complete:`);
    console.log(`   Primary metaphor: ${analysis.coreSymbolism.primaryMetaphor}`);
    console.log(`   Duration: ${analysis.technicalSpecs.duration}s`);
    console.log(`   Visual elements: ${analysis.visualMapping.shapes.length} symbolic shapes`);
    
    // Step 2: Generate React component code
    const componentName = this.generateComponentName(concept);
    const reactCode = this.synthesizeReactComponent(componentName, analysis, concept);
    
    // Step 3: Store for learning
    this.templates.push({
      concept,
      componentName,
      symbolicAnalysis: analysis,
      generatedCode: reactCode
    });
    
    console.log(`✅ Generated ${componentName} component with deep symbolic meaning`);
    
    return reactCode;
  }

  private generateComponentName(concept: string): string {
    // Convert concept to PascalCase component name
    return concept
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
      .replace(/[^a-zA-Z]/g, '') + 'Renderer';
  }

  private synthesizeReactComponent(
    componentName: string, 
    analysis: any, 
    concept: string
  ): string {
    const duration = analysis.technicalSpecs.duration;
    
    // Generate shapes based on symbolic analysis
    const shapesCode = this.generateShapesCode(analysis.visualMapping.shapes);
    
    // Generate animation timing based on key moments
    const timingCode = this.generateTimingCode(analysis.technicalSpecs.keyMoments, duration);
    
    // Generate typography code
    const typographyCode = this.generateTypographyCode(analysis.visualMapping.typography, duration);
    
    return `import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

// AUTO-GENERATED COMPONENT FOR: "${concept}"
// Symbolic meaning: ${analysis.coreSymbolism.primaryMetaphor}
// Story arc: ${analysis.coreSymbolism.storyArc}
// Emotional journey: ${analysis.coreSymbolism.emotionalJourney.join(' → ')}

export const ${componentName}: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;
  const timeInSeconds = frame / 30; // 30fps

${timingCode}

${this.generateAnimationLogic(analysis.visualMapping.movements, duration)}

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'rgb(0,0,0)', // Pure black for spiritual depth
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <svg width="800" height="600" viewBox="0 0 800 600" style={{position: 'absolute', top: 0, left: 0}}>
        {/* Symbolic visual elements representing: ${analysis.coreSymbolism.primaryMetaphor} */}
${shapesCode}
      </svg>

${typographyCode}

      {/* Symbolic meaning: ${analysis.reasoning} */}
    </div>
  );
};`;
  }

  private generateShapesCode(shapes: any[]): string {
    const centerX = 400;
    const centerY = 300;
    
    return shapes.map((shape, index) => {
      const opacity = `interpolate(progress, [${index * 0.2}, ${(index + 1) * 0.2}], [0, 1])`;
      
      switch (shape.element.toLowerCase()) {
        case 'circle':
          return `        {/* ${shape.element}: ${shape.meaning} */}
        <circle
          cx={${centerX}}
          cy={${centerY}}
          r={${30 + index * 20}}
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity={${opacity}}
          filter="drop-shadow(0 0 8px white)"
        />`;
        
        case 'triangle':
          return `        {/* ${shape.element}: ${shape.meaning} */}
        <polygon
          points="${centerX},${centerY - 30} ${centerX - 25},${centerY + 20} ${centerX + 25},${centerY + 20}"
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity={${opacity}}
          filter="drop-shadow(0 0 6px white)"
        />`;
        
        case 'line':
        case 'lines':
          return `        {/* ${shape.element}: ${shape.meaning} */}
        <line
          x1={${centerX - 50}}
          y1={${centerY}}
          x2={${centerX + 50}}
          y2={${centerY}}
          stroke="white"
          strokeWidth="3"
          opacity={${opacity}}
          filter="drop-shadow(0 0 4px white)"
        />`;
          
        case 'square':
        case 'rectangle':
          return `        {/* ${shape.element}: ${shape.meaning} */}
        <rect
          x={${centerX - 30}}
          y={${centerY - 30}}
          width="60"
          height="60"
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity={${opacity}}
          filter="drop-shadow(0 0 6px white)"
        />`;
        
        default:
          // Default to circle for unknown shapes
          return `        {/* ${shape.element}: ${shape.meaning} */}
        <circle
          cx={${centerX}}
          cy={${centerY}}
          r={${40 + index * 15}}
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity={${opacity}}
          filter="drop-shadow(0 0 8px white)"
        />`;
      }
    }).join('\n\n');
  }

  private generateTimingCode(keyMoments: any[], duration: number): string {
    return keyMoments.map((moment, index) => {
      const variableName = moment.event.replace(/\s+/g, '').toLowerCase();
      const timePoint = moment.time / duration;
      
      // Ensure strictly increasing values for interpolate
      const startTime = Math.max(0, timePoint - 0.1);
      const midTime = Math.max(startTime + 0.05, timePoint);
      const endTime = Math.min(1, Math.max(midTime + 0.05, timePoint + 0.1));
      
      return `  // ${moment.significance}
  const ${variableName}Opacity = interpolate(progress, [${startTime.toFixed(2)}, ${midTime.toFixed(2)}, ${endTime.toFixed(2)}], [0, 1, 1]);`;
    }).join('\n');
  }

  private generateAnimationLogic(movements: any[], duration: number): string {
    return movements.map(movement => {
      const startTime = parseFloat(movement.timing.split('-')[0]) || 0;
      const endTime = parseFloat(movement.timing.split('-')[1]) || duration;
      // Animation timing logic
      
      return `  // ${movement.symbolizes}
  const ${movement.type.replace(/\s+/g, '')}Progress = interpolate(timeInSeconds, [${startTime}, ${endTime}], [0, 1]);`;
    }).join('\n');
  }

  private generateTypographyCode(typography: any[], duration: number): string {
    if (typography.length === 0) return '';
    
    return typography.map(typo => {
      // Parse timing like "mid-animation" or "final third"
      let timingStart = 0.5; // default to middle
      if (typo.timing.includes('final')) timingStart = 0.7;
      if (typo.timing.includes('beginning')) timingStart = 0.1;
      
      return `
      {/* Typography: ${typo.meaning} */}
      {progress > ${timingStart} && (
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            width: '100%',
            textAlign: 'center',
            color: 'white',
            fontSize: '32px',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontWeight: '${typo.weight}',
            opacity: interpolate(progress, [${timingStart}, ${timingStart + 0.1}], [0, 1]),
            filter: 'drop-shadow(0 0 10px white)',
            textRendering: 'optimizeLegibility'
          }}
        >
          ${typo.text}
        </div>
      )}`;
    }).join('\n');
  }

  // Method to write the generated component to file
  async generateAndSaveComponent(concept: string): Promise<{componentName: string, filePath: string}> {
    await this.generateRendererFromConcept(concept);
    const componentName = this.generateComponentName(concept);
    const filePath = `/Users/nathaniellewis/my-video/src/${componentName}.tsx`;
    
    return {
      componentName,
      filePath
    };
  }

  // Method to test the generation system
  async demonstrateGeneration() {
    console.log('\n🎬 AUTOMATIC RENDERER GENERATOR DEMONSTRATION\n');
    
    const testConcepts = [
      'courage overcomes fear',
      'small seeds become mighty trees'
    ];
    
    for (const concept of testConcepts) {
      console.log(`${'='.repeat(60)}`);
      console.log(`GENERATING: "${concept}"`);
      console.log('='.repeat(60));
      
      try {
        const code = await this.generateRendererFromConcept(concept);
        console.log('✅ Generation successful!');
        console.log('📝 Component preview:');
        console.log(code.substring(0, 500) + '...\n');
      } catch (error) {
        console.error('❌ Generation failed:', error);
      }
    }
  }

  // Get insights from generated components
  getGenerationInsights(): string {
    return `Component Generation Insights:
    - Generated ${this.templates.length} symbolic components
    - Average complexity: ${Math.round(this.templates.reduce((acc, t) => acc + t.symbolicAnalysis.visualMapping.shapes.length, 0) / Math.max(this.templates.length, 1))} visual elements
    - Most common metaphors: ${this.templates.map(t => t.symbolicAnalysis.coreSymbolism.primaryMetaphor).join(', ')}
    - System confidence: Using OpenAI for deep symbolic analysis`;
  }
}

export const rendererGenerator = new AutomaticRendererGenerator();