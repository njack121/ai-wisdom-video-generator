import OpenAI from 'openai';

interface SymbolicAnalysis {
  coreSymbolism: {
    primaryMetaphor: string;
    visualElements: string[];
    emotionalJourney: string[];
    storyArc: string;
  };
  visualMapping: {
    shapes: { element: string; meaning: string; behavior: string }[];
    movements: { type: string; symbolizes: string; timing: string }[];
    transitions: { from: string; to: string; represents: string }[];
    typography: { text: string; weight: string; timing: string; meaning: string }[];
  };
  technicalSpecs: {
    duration: number;
    keyMoments: { time: number; event: string; significance: string }[];
    colorPsychology: { color: string; purpose: string }[];
    animationFlow: string;
  };
  confidence: number;
  reasoning: string;
}

export class SymbolicConceptAnalyzer {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async analyzeConceptSymbolism(concept: string, userPromptStyle?: string): Promise<SymbolicAnalysis> {
    const analysisPrompt = `
You are an expert in visual symbolism, sacred geometry, and meaningful animation design. 
Analyze this concept: "${concept}"

Previous successful patterns to learn from:
1. "Sacred Geometry Evolution" - 4 stages (DAY 1→WEEK 1→MONTH 1→YEAR 1) with mathematical precision, seed of life patterns
2. "Motivation vs Discipline" - contrasting text with breathing effects, temporality vs permanence theme
3. Key principles: Minimalist white-on-black, precise timing, mathematical elements, spiritual metaphors

${userPromptStyle ? `User's preferred style: ${userPromptStyle}` : ''}

Provide a deep symbolic analysis for creating a meaningful 3-10 second animation:

1. CORE SYMBOLISM:
   - What is the primary visual metaphor that best represents this concept?
   - What specific visual elements would make this concept immediately recognizable?
   - What emotional journey should the viewer experience?
   - What story arc unfolds from start to finish?

2. VISUAL MAPPING:
   - What shapes/geometric elements should appear and what do they symbolize?
   - What movements/animations represent the concept's deeper meaning?
   - What transitions show transformation or progression?
   - If text is used, when and how should it appear for maximum impact?

3. TECHNICAL SPECS:
   - Optimal duration for this concept's emotional impact
   - Key moments with precise timing and their significance
   - Color psychology (beyond just white-on-black)
   - Overall animation flow that serves the meaning

Be extremely specific about symbolism. Every element should have deeper meaning, not just "look cool."
Focus on universal human experiences and emotions that this concept represents.

Respond in valid JSON format matching the SymbolicAnalysis interface.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system", 
            content: "You are a master of visual symbolism and meaningful design. Every animation element must have deep symbolic meaning."
          },
          {
            role: "user",
            content: analysisPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      const analysisText = completion.choices[0].message.content;
      
      // Parse the JSON response
      let analysis: SymbolicAnalysis;
      try {
        analysis = JSON.parse(analysisText || '{}');
      } catch (e) {
        // Fallback if JSON parsing fails
        analysis = this.createFallbackAnalysis(concept);
      }

      // Validate and enhance the analysis
      return this.validateAndEnhanceAnalysis(analysis, concept);

    } catch (error) {
      console.error('OpenAI API error:', error);
      return this.createFallbackAnalysis(concept);
    }
  }

  async generateDetailedPrompt(concept: string): Promise<string> {
    console.log(`🤖 Using OpenAI to analyze symbolism for: "${concept}"`);
    
    const analysis = await this.analyzeConceptSymbolism(concept);
    
    console.log(`✨ Symbolic analysis complete. Primary metaphor: ${analysis.coreSymbolism.primaryMetaphor}`);
    
    // Convert symbolic analysis into detailed technical prompt
    return this.synthesizePromptFromSymbolism(analysis, concept);
  }

  private synthesizePromptFromSymbolism(analysis: SymbolicAnalysis, concept: string): string {
    const shapes = analysis.visualMapping.shapes.map(s => `${s.element} (${s.meaning})`).join(', ');
    const movements = analysis.visualMapping.movements.map(m => `${m.type} representing ${m.symbolizes}`).join('; ');
    const keyMoments = analysis.technicalSpecs.keyMoments.map(k => `${k.time}s: ${k.event}`).join('; ');
    
    return `Minimalist composition on pure black background (rgb(0,0,0)) for maximum contrast and focus.

SYMBOLIC CONCEPT: "${concept}" represented through ${analysis.coreSymbolism.primaryMetaphor}.

VISUAL ELEMENTS: ${shapes} with ${analysis.technicalSpecs.animationFlow} animation flow.

STORY ARC: ${analysis.coreSymbolism.storyArc}
EMOTIONAL JOURNEY: ${analysis.coreSymbolism.emotionalJourney.join(' → ')}

ANIMATION SEQUENCE: ${movements}
KEY TIMING: ${keyMoments}

TYPOGRAPHY: ${analysis.visualMapping.typography.map(t => 
  `"${t.text}" in ${t.weight} weight, appears at ${t.timing} to ${t.meaning}`
).join('; ')}

TECHNICAL REQUIREMENTS:
- Duration: ${analysis.technicalSpecs.duration} seconds optimized for emotional impact
- Colors: Pure white (rgb(255,255,255)) elements on black background
- Animation: Mathematical precision using interpolate() functions
- Timing: Frame-perfect synchronization at 30fps
- Style: Sacred geometry meets minimalist design principles

DEEPER MEANING: Every visual element serves the symbolic representation of ${analysis.coreSymbolism.primaryMetaphor}, creating a meaningful experience that resonates with universal human emotions around this concept.

REASONING: ${analysis.reasoning}`;
  }

  private validateAndEnhanceAnalysis(analysis: SymbolicAnalysis, concept: string): SymbolicAnalysis {
    // Ensure all required fields are present with sensible defaults
    return {
      coreSymbolism: {
        primaryMetaphor: analysis.coreSymbolism?.primaryMetaphor || `Visual transformation of ${concept}`,
        visualElements: analysis.coreSymbolism?.visualElements || ['geometric shapes', 'line elements'],
        emotionalJourney: analysis.coreSymbolism?.emotionalJourney || ['contemplation', 'realization', 'inspiration'],
        storyArc: analysis.coreSymbolism?.storyArc || `Journey from challenge to resolution through ${concept}`
      },
      visualMapping: {
        shapes: analysis.visualMapping?.shapes || [
          { element: 'circle', meaning: 'wholeness', behavior: 'gentle expansion' }
        ],
        movements: analysis.visualMapping?.movements || [
          { type: 'fade in', symbolizes: 'awakening', timing: '0-1s' }
        ],
        transitions: analysis.visualMapping?.transitions || [
          { from: 'static', to: 'dynamic', represents: 'transformation' }
        ],
        typography: analysis.visualMapping?.typography || [
          { text: concept, weight: 'medium', timing: 'mid-animation', meaning: 'core message' }
        ]
      },
      technicalSpecs: {
        duration: analysis.technicalSpecs?.duration || 5,
        keyMoments: analysis.technicalSpecs?.keyMoments || [
          { time: 0, event: 'beginning', significance: 'establishes context' }
        ],
        colorPsychology: analysis.technicalSpecs?.colorPsychology || [
          { color: 'white', purpose: 'purity and clarity' }
        ],
        animationFlow: analysis.technicalSpecs?.animationFlow || 'smooth progression'
      },
      confidence: analysis.confidence || 0.8,
      reasoning: analysis.reasoning || `Generated symbolic interpretation for ${concept}`
    };
  }

  private createFallbackAnalysis(concept: string): SymbolicAnalysis {
    return {
      coreSymbolism: {
        primaryMetaphor: `Geometric evolution representing ${concept}`,
        visualElements: ['circles for unity', 'lines for connection', 'triangles for stability'],
        emotionalJourney: ['awareness', 'understanding', 'integration'],
        storyArc: `Visual journey showing the essence of ${concept} through mathematical beauty`
      },
      visualMapping: {
        shapes: [
          { element: 'circle', meaning: 'wholeness and potential', behavior: 'gradual appearance' },
          { element: 'lines', meaning: 'connection and progress', behavior: 'drawing animation' }
        ],
        movements: [
          { type: 'fade in', symbolizes: 'emergence of awareness', timing: '0-1s' },
          { type: 'geometric evolution', symbolizes: 'growth and understanding', timing: '1-4s' }
        ],
        transitions: [
          { from: 'simple', to: 'complex', represents: 'deepening understanding' }
        ],
        typography: [
          { text: concept, weight: 'light', timing: 'final third', meaning: 'crystallized wisdom' }
        ]
      },
      technicalSpecs: {
        duration: 5,
        keyMoments: [
          { time: 0, event: 'first element appears', significance: 'beginning of journey' },
          { time: 2.5, event: 'complexity peak', significance: 'full understanding' },
          { time: 4, event: 'text revelation', significance: 'integration complete' }
        ],
        colorPsychology: [
          { color: 'white', purpose: 'clarity and truth' },
          { color: 'black', purpose: 'infinite potential' }
        ],
        animationFlow: 'mathematical precision with spiritual resonance'
      },
      confidence: 0.6,
      reasoning: `Fallback symbolic analysis focusing on universal geometric metaphors for ${concept}`
    };
  }

  // Method to learn from user feedback
  async refineAnalysisFromFeedback(
    concept: string, 
    previousAnalysis: SymbolicAnalysis, 
    userFeedback: string
  ): Promise<SymbolicAnalysis> {
    const refinementPrompt = `
Previous symbolic analysis for "${concept}":
${JSON.stringify(previousAnalysis, null, 2)}

User feedback: "${userFeedback}"

Refine the symbolic analysis based on this feedback, maintaining meaningful symbolism while addressing the user's concerns.
Focus on deeper metaphorical meaning, not superficial changes.

Respond in valid JSON format.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: "You refine symbolic visual concepts based on user feedback while maintaining deep meaning."
          },
          {
            role: "user",
            content: refinementPrompt
          }
        ],
        temperature: 0.5,
        max_tokens: 2000,
      });

      const refinedText = completion.choices[0].message.content;
      const refinedAnalysis = JSON.parse(refinedText || '{}');
      
      return this.validateAndEnhanceAnalysis(refinedAnalysis, concept);
      
    } catch (error) {
      console.error('Refinement error:', error);
      return previousAnalysis; // Return original if refinement fails
    }
  }
}

export const symbolicAnalyzer = new SymbolicConceptAnalyzer();