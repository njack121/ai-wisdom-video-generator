import { promptAnalyzer } from './PromptPatternAnalyzer';

interface EnhancedPromptResult {
  enhancedPrompt: string;
  suggestedSpecs: {
    duration: number;
    backgroundColor: string;
    primaryColor: string;
    fontSize: string;
    animationStyle: string;
    timingDetails: string[];
  };
  confidence: number;
  basedOnPatterns: string[];
}

export class IntelligentPromptGenerator {
  
  generateEnhancedPrompt(basicConcept: string): EnhancedPromptResult {
    console.log(`🧠 Analyzing concept: "${basicConcept}"`);
    
    // Analyze the concept and generate enhanced prompt
    const enhancedPrompt = promptAnalyzer.generateEnhancedPrompt(basicConcept);
    const analysis = promptAnalyzer.analyzePrompt(enhancedPrompt);
    
    // Extract specific recommendations based on learned patterns
    const specs = this.generateSpecs(basicConcept, analysis);
    const confidence = this.calculateConfidence(basicConcept);
    
    const result: EnhancedPromptResult = {
      enhancedPrompt: this.refinePrompt(basicConcept, specs),
      suggestedSpecs: specs,
      confidence,
      basedOnPatterns: this.getRelevantPatterns(basicConcept)
    };

    console.log(`✨ Generated enhanced prompt with ${Math.round(confidence * 100)}% confidence`);
    
    return result;
  }

  private generateSpecs(concept: string, analysis: any) {
    // Based on successful patterns, generate specific technical specs
    const conceptType = this.categorizeContent(concept);
    
    return {
      duration: this.suggestDuration(conceptType),
      backgroundColor: this.suggestBackgroundColor(conceptType),
      primaryColor: this.suggestPrimaryColor(conceptType),
      fontSize: this.suggestFontSize(conceptType),
      animationStyle: this.suggestAnimationStyle(conceptType),
      timingDetails: this.suggestTimingDetails(conceptType)
    };
  }

  private categorizeContent(concept: string): string {
    const lowerConcept = concept.toLowerCase();
    
    if (lowerConcept.includes('vs') || lowerConcept.includes('contrast')) {
      return 'contrasting_concepts';
    }
    if (lowerConcept.includes('grow') || lowerConcept.includes('evolve') || lowerConcept.includes('progress')) {
      return 'growth_evolution';
    }
    if (lowerConcept.includes('infinite') || lowerConcept.includes('loop') || lowerConcept.includes('cycle')) {
      return 'infinity_cycles';
    }
    if (lowerConcept.includes('spiritual') || lowerConcept.includes('sacred') || lowerConcept.includes('meditation')) {
      return 'spiritual_concepts';
    }
    
    return 'general_motivational';
  }

  private suggestDuration(conceptType: string): number {
    const durations: Record<string, number> = {
      'contrasting_concepts': 8,
      'growth_evolution': 7,
      'infinity_cycles': 3,
      'spiritual_concepts': 10,
      'general_motivational': 5
    };
    
    return durations[conceptType] || 5;
  }

  private suggestBackgroundColor(conceptType: string): string {
    const backgrounds: Record<string, string> = {
      'contrasting_concepts': 'rgb(25,25,25)', // Dark charcoal
      'growth_evolution': 'rgb(0,0,0)',       // Pure black
      'infinity_cycles': 'rgb(0,0,0)',        // Pure black
      'spiritual_concepts': 'rgb(0,0,0)',     // Pure black
      'general_motivational': 'rgb(15,15,15)' // Very dark gray
    };
    
    return backgrounds[conceptType] || 'rgb(0,0,0)';
  }

  private suggestPrimaryColor(conceptType: string): string {
    // All successful patterns used white, so stick with that
    return 'rgb(255,255,255)';
  }

  private suggestFontSize(conceptType: string): string {
    const sizes: Record<string, string> = {
      'contrasting_concepts': '32pt and 36pt (contrasting weights)',
      'growth_evolution': '24pt clean sans-serif',
      'infinity_cycles': '32pt medium weight',
      'spiritual_concepts': '20pt light weight',
      'general_motivational': '28pt'
    };
    
    return sizes[conceptType] || '28pt';
  }

  private suggestAnimationStyle(conceptType: string): string {
    const styles: Record<string, string> = {
      'contrasting_concepts': 'simultaneous_fade_transition_with_breathing',
      'growth_evolution': 'gradual_revelation_additive_animation',
      'infinity_cycles': 'continuous_loop_with_strokeDasharray',
      'spiritual_concepts': 'sacred_geometry_evolution',
      'general_motivational': 'smooth_fade_with_glow_effects'
    };
    
    return styles[conceptType] || 'smooth_fade_transitions';
  }

  private suggestTimingDetails(conceptType: string): string[] {
    const timings: Record<string, string[]> = {
      'contrasting_concepts': [
        '0.5s fade in for first element',
        '2s visible with breathing animation',
        '0.8s simultaneous fade transition at exact midpoint',
        'Breathing opacity: 95%-100%-95% sine wave'
      ],
      'growth_evolution': [
        '4 distinct stages with labels',
        'Progressive revelation over time',
        'Each stage builds on previous',
        'Smooth mathematical transitions'
      ],
      'infinity_cycles': [
        'Perfect 3-second loop',
        'Text appears at exact center crossing',
        '0.3s fade in/out for text',
        'strokeDasharray drawing animation'
      ],
      'spiritual_concepts': [
        'Meditative pacing',
        'Gradual geometric revelation',
        'Sacred proportions and timing',
        'Ethereal glow effects building over time'
      ],
      'general_motivational': [
        '5-second total duration',
        'Smooth entry and exit',
        'Clear visual metaphor timing',
        'Professional fade transitions'
      ]
    };
    
    return timings[conceptType] || ['5-second duration with smooth transitions'];
  }

  private calculateConfidence(concept: string): number {
    // Higher confidence for concepts similar to successful patterns
    const conceptType = this.categorizeContent(concept);
    const successfulTypes = ['contrasting_concepts', 'growth_evolution'];
    
    if (successfulTypes.includes(conceptType)) {
      return 0.95;
    }
    
    // Medium confidence for related concepts
    if (['infinity_cycles', 'spiritual_concepts'].includes(conceptType)) {
      return 0.75;
    }
    
    // Lower confidence for new concept types
    return 0.60;
  }

  private getRelevantPatterns(concept: string): string[] {
    const conceptType = this.categorizeContent(concept);
    
    const patterns: Record<string, string[]> = {
      'contrasting_concepts': ['motivation_vs_discipline'],
      'growth_evolution': ['sacred_geometry_evolution'],
      'infinity_cycles': ['precise_infinity_loop'],
      'spiritual_concepts': ['sacred_geometry_evolution', 'motivational_geometry'],
      'general_motivational': ['simple_growth_animation']
    };
    
    return patterns[conceptType] || [];
  }

  private refinePrompt(concept: string, specs: any): string {
    const conceptType = this.categorizeContent(concept);
    
    return `Minimalist composition on ${specs.backgroundColor} background. 
    Clean white line art visualization of "${concept}" with ${specs.animationStyle.replace(/_/g, ' ')} animation. 
    Typography: ${specs.fontSize} clean sans-serif font family (Arial, Helvetica, sans-serif) with precise weight specifications.
    Duration: ${specs.duration} seconds with professional fade transitions.
    Timing specifications: ${specs.timingDetails.join('; ')}.
    Colors: Pure white (rgb(255,255,255)) on specified background for maximum contrast.
    Visual elements: Mathematical precision with supporting geometric elements for conceptual reinforcement.
    Emotional tone: ${this.getEmotionalTone(conceptType)}.
    Technical requirements: Use interpolate() for smooth transitions, precise frame timing, optimized for 30fps render.`;
  }

  private getEmotionalTone(conceptType: string): string {
    const tones: Record<string, string> = {
      'contrasting_concepts': 'philosophical contrast between temporary and permanent',
      'growth_evolution': 'inspiring progression and spiritual development',
      'infinity_cycles': 'meditative and calming repetition',
      'spiritual_concepts': 'ethereal and transcendent',
      'general_motivational': 'uplifting and empowering'
    };
    
    return tones[conceptType] || 'motivational and inspiring';
  }

  // Method to test the system
  demonstrateCapabilities() {
    const testConcepts = [
      'courage vs fear',
      'seed becomes tree',
      'infinite potential',
      'discipline builds character',
      'breakthrough moment'
    ];

    console.log('\n🧠 INTELLIGENT PROMPT GENERATOR DEMONSTRATION\n');
    console.log(promptAnalyzer.getPatternInsights());
    console.log('\n' + '='.repeat(60) + '\n');

    testConcepts.forEach((concept, index) => {
      console.log(`${index + 1}. Testing: "${concept}"`);
      const result = this.generateEnhancedPrompt(concept);
      console.log(`   Confidence: ${Math.round(result.confidence * 100)}%`);
      console.log(`   Based on patterns: ${result.basedOnPatterns.join(', ')}`);
      console.log(`   Duration: ${result.suggestedSpecs.duration}s`);
      console.log(`   Animation: ${result.suggestedSpecs.animationStyle}`);
      console.log('   Enhanced prompt preview:');
      console.log(`   "${result.enhancedPrompt.substring(0, 100)}..."`);
      console.log('');
    });
  }
}

export const intelligentPromptGenerator = new IntelligentPromptGenerator();