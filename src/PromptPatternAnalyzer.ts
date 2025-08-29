interface PromptPattern {
  id: string;
  concept: string;
  userRating: 'excellent' | 'good' | 'poor';
  promptStructure: {
    visualStyle: string[];
    timingSpecs: string[];
    typography: string[];
    colors: string[];
    animations: string[];
    geometry: string[];
    emotions: string[];
  };
  technicalElements: {
    duration: number;
    transitionTypes: string[];
    mathConcepts: string[];
    preciseTiming: boolean;
  };
  successFactors: string[];
  originalPrompt: string;
  generatedCode: string;
}

export class PromptPatternAnalyzer {
  private patterns: PromptPattern[] = [];

  constructor() {
    this.initializeKnownPatterns();
  }

  private initializeKnownPatterns() {
    // Load successful patterns from our conversation
    this.patterns = [
      {
        id: 'sacred_geometry_evolution',
        concept: 'growth_through_stages',
        userRating: 'excellent',
        promptStructure: {
          visualStyle: ['minimalist', 'white_on_black', 'sacred_geometry'],
          timingSpecs: ['4_stages', 'day_week_month_year', 'progressive_revelation'],
          typography: ['clean_labels', 'stage_indicators'],
          colors: ['pure_white_lines', 'black_background'],
          animations: ['geometric_evolution', 'seed_of_life', 'flower_of_life'],
          geometry: ['circles', 'triangles', 'hexagons', 'mathematical_precision'],
          emotions: ['spiritual_growth', 'patience', 'evolution']
        },
        technicalElements: {
          duration: 7,
          transitionTypes: ['gradual_revelation', 'additive_geometry'],
          mathConcepts: ['sacred_geometry', 'fibonacci', 'golden_ratio'],
          preciseTiming: true
        },
        successFactors: [
          'extremely_detailed_prompt',
          'mathematical_precision',
          'clear_stage_progression',
          'spiritual_metaphor'
        ],
        originalPrompt: 'Minimalist sacred geometry evolution sequence, four stages...',
        generatedCode: 'SacredGeometryRenderer.tsx'
      },
      {
        id: 'motivation_vs_discipline',
        concept: 'contrasting_concepts',
        userRating: 'good',
        promptStructure: {
          visualStyle: ['minimalist', 'dark_charcoal_background', 'typography_focused'],
          timingSpecs: ['precise_fade_timing', '3_second_transition', 'breathing_animation'],
          typography: ['32pt_light_vs_36pt_bold', 'font_weight_contrast', 'vertical_spacing'],
          colors: ['RGB_25_25_25', 'pure_white_text'],
          animations: ['breathing_opacity', 'simultaneous_fade_transition'],
          geometry: ['temporary_circles', 'permanent_triangles', 'supporting_elements'],
          emotions: ['temporality_vs_permanence', 'motivation_fading', 'discipline_persisting']
        },
        technicalElements: {
          duration: 8,
          transitionTypes: ['simultaneous_fade', 'breathing_animation'],
          mathConcepts: ['sine_wave_breathing', 'interpolation'],
          preciseTiming: true
        },
        successFactors: [
          'ultra_precise_timing_specs',
          'typography_as_primary_element',
          'conceptual_visual_reinforcement',
          'RGB_color_specification'
        ],
        originalPrompt: 'Minimalist composition on dark charcoal background (RGB 25,25,25)...',
        generatedCode: 'MotivationDisciplineRenderer.tsx'
      }
    ];
  }

  analyzePrompt(prompt: string): PromptPattern {
    // Extract key elements from a new prompt
    const analysis: Partial<PromptPattern> = {
      id: this.generateId(),
      originalPrompt: prompt,
      promptStructure: {
        visualStyle: this.extractVisualStyle(prompt),
        timingSpecs: this.extractTimingSpecs(prompt),
        typography: this.extractTypography(prompt),
        colors: this.extractColors(prompt),
        animations: this.extractAnimations(prompt),
        geometry: this.extractGeometry(prompt),
        emotions: this.extractEmotions(prompt)
      },
      technicalElements: {
        duration: this.extractDuration(prompt),
        transitionTypes: this.extractTransitions(prompt),
        mathConcepts: this.extractMathConcepts(prompt),
        preciseTiming: this.hasPreciseTiming(prompt)
      }
    };

    return analysis as PromptPattern;
  }

  generateEnhancedPrompt(basicConcept: string): string {
    // Find similar successful patterns
    const similarPatterns = this.findSimilarPatterns(basicConcept);
    
    if (similarPatterns.length === 0) {
      return this.createBaselinePrompt(basicConcept);
    }

    // Combine successful elements from similar patterns
    const enhancedPrompt = this.synthesizePrompt(basicConcept, similarPatterns);
    return enhancedPrompt;
  }

  private findSimilarPatterns(concept: string): PromptPattern[] {
    // Find patterns with similar concepts or high success ratings
    return this.patterns.filter(pattern => 
      pattern.userRating === 'excellent' || 
      pattern.concept.includes(concept) ||
      this.conceptSimilarity(pattern.concept, concept) > 0.3
    );
  }

  private synthesizePrompt(concept: string, patterns: PromptPattern[]): string {
    // Get the most successful elements from similar patterns
    const bestElements = this.extractBestElements(patterns);
    
    return `Minimalist composition on ${bestElements.background}, ${bestElements.visualStyle}. 
    ${concept} visualization with ${bestElements.animations.join(', ')}. 
    Typography: ${bestElements.typography.join(', ')}. 
    Timing: ${bestElements.timingSpecs.join(', ')}. 
    Colors: ${bestElements.colors.join(', ')}. 
    Duration: ${bestElements.duration} seconds with ${bestElements.transitionTypes.join(' and ')} transitions.
    Geometric elements: ${bestElements.geometry.join(', ')} for visual reinforcement.
    Emotional tone: ${bestElements.emotions.join(', ')}.`;
  }

  private extractBestElements(patterns: PromptPattern[]) {
    // Aggregate the most common successful elements
    const aggregated = {
      background: 'black background',
      visualStyle: 'white line art',
      animations: ['fade transitions', 'breathing effects'],
      typography: ['clean sans-serif', 'weight contrast'],
      timingSpecs: ['precise timing', '0.5s fade in'],
      colors: ['pure white', 'RGB specified'],
      duration: 5,
      transitionTypes: ['gradual revelation'],
      geometry: ['mathematical precision'],
      emotions: ['spiritual growth']
    };

    patterns.forEach(pattern => {
      if (pattern.userRating === 'excellent') {
        // Weight excellent patterns more heavily
        aggregated.animations.push(...pattern.promptStructure.animations);
        aggregated.typography.push(...pattern.promptStructure.typography);
      }
    });

    return aggregated;
  }

  // Helper methods for pattern extraction
  private extractVisualStyle(prompt: string): string[] {
    const indicators = ['minimalist', 'sacred geometry', 'line art', 'typography focused'];
    return indicators.filter(indicator => 
      prompt.toLowerCase().includes(indicator.replace('_', ' '))
    );
  }

  private extractTimingSpecs(prompt: string): string[] {
    const timingPatterns = /(\d+\.?\d*)\s*(second|sec|s)\b/gi;
    const matches = prompt.match(timingPatterns) || [];
    return matches.map(match => match.toLowerCase());
  }

  private extractColors(prompt: string): string[] {
    const colorPatterns = /rgb\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|#[0-9a-f]{6}|black|white|charcoal/gi;
    return prompt.match(colorPatterns) || [];
  }

  private hasPreciseTiming(prompt: string): boolean {
    return /\d+\.?\d*\s*(second|sec|s|ms)\b/i.test(prompt);
  }

  private conceptSimilarity(concept1: string, concept2: string): number {
    // Simple similarity check - could be enhanced with NLP
    const words1 = concept1.split('_');
    const words2 = concept2.split('_');
    const intersection = words1.filter(word => words2.includes(word));
    return intersection.length / Math.max(words1.length, words2.length);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private extractDuration(prompt: string): number {
    const durationMatch = prompt.match(/(\d+)[\s-]*(second|sec|s)\b/i);
    return durationMatch ? parseInt(durationMatch[1]) : 5;
  }

  private extractTransitions(prompt: string): string[] {
    const transitions = ['fade', 'breathing', 'gradual', 'simultaneous'];
    return transitions.filter(t => prompt.toLowerCase().includes(t));
  }

  private extractMathConcepts(prompt: string): string[] {
    const mathTerms = ['geometry', 'infinity', 'sine', 'interpolation', 'fibonacci'];
    return mathTerms.filter(t => prompt.toLowerCase().includes(t));
  }

  private extractTypography(prompt: string): string[] {
    const typoTerms = /(\d+pt|bold|light|sans-serif|weight)/gi;
    return prompt.match(typoTerms) || [];
  }

  private extractAnimations(prompt: string): string[] {
    const animTerms = ['breathing', 'fade', 'evolution', 'revelation', 'transition'];
    return animTerms.filter(t => prompt.toLowerCase().includes(t));
  }

  private extractGeometry(prompt: string): string[] {
    const geoTerms = ['circle', 'triangle', 'hexagon', 'line', 'sacred', 'infinity'];
    return geoTerms.filter(t => prompt.toLowerCase().includes(t));
  }

  private extractEmotions(prompt: string): string[] {
    const emotions = ['growth', 'discipline', 'motivation', 'spiritual', 'permanence'];
    return emotions.filter(e => prompt.toLowerCase().includes(e));
  }

  private createBaselinePrompt(concept: string): string {
    // Fallback prompt structure based on successful patterns
    return `Minimalist composition on pure black background. 
    White line art visualization of ${concept} with gradual revelation animation. 
    Clean sans-serif typography with precise timing. 
    5-second duration with smooth fade transitions. 
    Mathematical precision with supporting geometric elements.`;
  }

  // Method to learn from new successful patterns
  addSuccessfulPattern(pattern: PromptPattern) {
    this.patterns.push(pattern);
  }

  getPatternInsights(): string {
    const excellentPatterns = this.patterns.filter(p => p.userRating === 'excellent');
    
    return `Pattern Analysis Insights:
    - Successful prompts average ${excellentPatterns.length > 0 ? excellentPatterns.reduce((acc, p) => acc + p.technicalElements.duration, 0) / excellentPatterns.length : 5} seconds
    - Most effective visual style: ${this.getMostCommon(excellentPatterns.flatMap(p => p.promptStructure.visualStyle))}
    - Key success factor: Precise technical specifications
    - Best performing concepts: ${excellentPatterns.map(p => p.concept).join(', ')}`;
  }

  private getMostCommon(array: string[]): string {
    const counts = array.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(counts).reduce((a, b) => counts[a[0]] > counts[b[0]] ? a : b)[0];
  }
}

export const promptAnalyzer = new PromptPatternAnalyzer();