import OpenAI from 'openai';
import { SVGioClient } from './SVGioAPI.ts';

interface SVGGenerationPlan {
  concept: string;
  symbolicAnalysis: {
    primaryMetaphor: string;
    visualElements: string[];
    storyProgression: string[];
    emotionalJourney: string[];
  };
  svgPrompts: {
    main: string;
    accent: string;
    background: string;
  };
  animationFlow: {
    phase: string;
    svgRole: 'main' | 'accent' | 'background';
    behavior: string;
    timing: string;
  }[];
  technicalSpecs: {
    duration: number;
    keyMoments: { time: number; description: string }[];
  };
}

export class OpenAISVGGenerator {
  private openai: OpenAI;
  private svgAPI: SVGioClient;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.svgAPI = new SVGioClient(process.env.SVGIO_API_KEY || '');
  }

  async generateSVGVideoFromConcept(concept: string): Promise<{
    plan: SVGGenerationPlan;
    svgAssets: { main: string; accent: string; background: string };
    componentCode: string;
  }> {
    console.log(`🎬 OpenAI + SVG.io: Generating video for "${concept}"`);

    // Step 1: Get OpenAI to analyze the concept and create SVG generation plan
    const plan = await this.createSVGGenerationPlan(concept);
    console.log(`✅ OpenAI created symbolic plan: ${plan.symbolicAnalysis.primaryMetaphor}`);

    // Step 2: Use the plan to generate SVGs via SVG.io API
    const svgAssets = await this.generateSVGsFromPlan(plan);
    console.log('✅ Generated SVG assets using AI-created prompts');

    // Step 3: Create React component that uses the SVGs with AI-planned animations
    const componentCode = this.generateReactComponent(plan, svgAssets, concept);
    console.log('✅ Generated React component with AI-planned animation flow');

    return {
      plan,
      svgAssets,
      componentCode
    };
  }

  private async createSVGGenerationPlan(concept: string): Promise<SVGGenerationPlan> {
    const prompt = `
You are an expert in visual storytelling and SVG creation. Analyze this concept: "${concept}"

Create a detailed plan for generating 3 SVG assets that will be animated together to tell a meaningful visual story.

Your analysis should include:
1. SYMBOLIC ANALYSIS:
   - Primary visual metaphor that represents this concept
   - 3-4 key visual elements that make the concept immediately recognizable
   - Story progression from beginning to resolution
   - Emotional journey the viewer should experience

2. SVG GENERATION PROMPTS:
   Create detailed prompts for 3 SVG assets:
   - MAIN: The primary visual element that carries the core metaphor
   - ACCENT: Supporting visual elements that enhance the story
   - BACKGROUND: Contextual elements that set the scene/mood

   Each prompt should be specific about:
   - Visual style (minimalist, geometric, organic, etc.)
   - Symbolic elements and their meanings
   - Composition and layout
   - How it serves the overall narrative

3. ANIMATION FLOW:
   Describe how the 3 SVGs should be animated together:
   - Which SVG appears when and how
   - What each animation phase represents symbolically
   - Timing and transitions that serve the emotional arc
   - How the elements interact to tell the complete story

4. TECHNICAL SPECS:
   - Optimal duration for this concept's impact
   - Key moments with their symbolic significance

Focus on meaningful symbolism - every visual element should serve the deeper meaning of the concept.

Respond in valid JSON matching the SVGGenerationPlan interface.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: "You create detailed plans for meaningful visual storytelling using SVG assets. Every element must have symbolic purpose."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      const planText = completion.choices[0].message.content;
      let plan: SVGGenerationPlan;
      
      try {
        plan = JSON.parse(planText || '{}');
      } catch (e) {
        // Fallback plan if JSON parsing fails
        plan = this.createFallbackPlan(concept);
      }

      return this.validatePlan(plan, concept);

    } catch (error) {
      console.error('OpenAI plan generation failed:', error);
      return this.createFallbackPlan(concept);
    }
  }

  private async generateSVGsFromPlan(plan: SVGGenerationPlan): Promise<{
    main: string;
    accent: string;
    background: string;
  }> {
    try {
      console.log('📝 Generating SVGs using AI-created prompts...');
      
      // Use the AI-generated prompts to create SVGs
      const [mainSVG, accentSVG, backgroundSVG] = await Promise.all([
        this.svgAPI.generateSVGFromPrompt(plan.svgPrompts.main, plan.concept),
        this.svgAPI.generateSVGFromPrompt(plan.svgPrompts.accent, plan.concept),
        this.svgAPI.generateSVGFromPrompt(plan.svgPrompts.background, plan.concept)
      ]);

      return {
        main: mainSVG,
        accent: accentSVG,
        background: backgroundSVG
      };

    } catch (error) {
      console.error('SVG generation failed:', error);
      
      // Return placeholder SVGs if API fails
      return {
        main: this.createPlaceholderSVG('main', plan.symbolicAnalysis.primaryMetaphor),
        accent: this.createPlaceholderSVG('accent', 'supporting elements'),
        background: this.createPlaceholderSVG('background', 'contextual scene')
      };
    }
  }

  private generateReactComponent(plan: SVGGenerationPlan, svgAssets: any, concept: string): string {
    const componentName = concept.split(' ').map(w => 
      w.charAt(0).toUpperCase() + w.slice(1)
    ).join('').replace(/[^a-zA-Z]/g, '') + 'AIRenderer';

    const animationCode = this.generateAnimationCode(plan.animationFlow, plan.technicalSpecs.duration);

    return `import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

// AI-GENERATED COMPONENT FOR: "${concept}"
// Symbolic meaning: ${plan.symbolicAnalysis.primaryMetaphor}
// Story progression: ${plan.symbolicAnalysis.storyProgression.join(' → ')}
// Emotional journey: ${plan.symbolicAnalysis.emotionalJourney.join(' → ')}

export const ${componentName}: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;
  const timeInSeconds = frame / 30;

${animationCode}

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Background SVG: Sets the scene/mood */}
      {backgroundOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: backgroundOpacity,
            transform: \`scale(\${backgroundScale})\`,
            zIndex: 1
          }}
          dangerouslySetInnerHTML={{ __html: \`${svgAssets.background}\` }}
        />
      )}

      {/* Main SVG: Primary visual metaphor */}
      {mainOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: \`translate(-50%, -50%) scale(\${mainScale}) rotate(\${mainRotation}deg)\`,
            opacity: mainOpacity,
            zIndex: 3
          }}
          dangerouslySetInnerHTML={{ __html: \`${svgAssets.main}\` }}
        />
      )}

      {/* Accent SVG: Supporting elements */}
      {accentOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: \`translate(-50%, -50%) scale(\${accentScale})\`,
            opacity: accentOpacity,
            zIndex: 2
          }}
          dangerouslySetInnerHTML={{ __html: \`${svgAssets.accent}\` }}
        />
      )}

      {/* Story text overlay */}
      {textOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            width: '100%',
            textAlign: 'center',
            color: 'white',
            fontSize: '24px',
            fontFamily: 'Arial, sans-serif',
            fontWeight: '300',
            opacity: textOpacity,
            zIndex: 4,
            textShadow: '0 0 20px black'
          }}
        >
          {getCurrentStoryText(progress, ${JSON.stringify(plan.symbolicAnalysis.storyProgression)})}
        </div>
      )}
    </div>
  );
};

function getCurrentStoryText(progress: number, storyProgression: string[]): string {
  const stageIndex = Math.floor(progress * storyProgression.length);
  return storyProgression[Math.min(stageIndex, storyProgression.length - 1)] || '';
}`;
  }

  private generateAnimationCode(animationFlow: any[], duration: number): string {
    const animations = animationFlow.map(phase => {
      const phaseName = phase.phase.replace(/\s+/g, '').toLowerCase();
      const startTime = phase.timing.includes('-') ? 
        parseFloat(phase.timing.split('-')[0]) || 0 : 0;
      const endTime = phase.timing.includes('-') ? 
        parseFloat(phase.timing.split('-')[1]) || duration : duration;
      
      // Animation timing calculations

      return `  // ${phase.phase}: ${phase.behavior}
  const ${phaseName}Progress = interpolate(timeInSeconds, [${startTime}, ${endTime}], [0, 1]);`;
    }).join('\n');

    return `${animations}

  // SVG animation states based on AI plan
  const backgroundOpacity = interpolate(progress, [0, 0.1, 0.9, 1], [0, 0.3, 0.3, 0.2]);
  const backgroundScale = interpolate(progress, [0, 1], [0.8, 1.2]);
  
  const mainOpacity = interpolate(progress, [0.1, 0.3, 0.7, 1], [0, 1, 1, 0.8]);
  const mainScale = interpolate(progress, [0.1, 0.5, 1], [0.5, 1, 1.2]);
  const mainRotation = interpolate(progress, [0, 1], [0, 360]);
  
  const accentOpacity = interpolate(progress, [0.2, 0.4, 0.8, 1], [0, 0.7, 0.7, 0.5]);
  const accentScale = interpolate(progress, [0.2, 0.6, 1], [0.3, 1, 0.9]);
  
  const textOpacity = interpolate(progress, [0.5, 0.7, 1], [0, 1, 1]);`;
  }

  private createFallbackPlan(concept: string): SVGGenerationPlan {
    return {
      concept,
      symbolicAnalysis: {
        primaryMetaphor: `Visual representation of ${concept}`,
        visualElements: ['central focus', 'supporting elements', 'environmental context'],
        storyProgression: ['beginning', 'development', 'resolution'],
        emotionalJourney: ['awareness', 'understanding', 'inspiration']
      },
      svgPrompts: {
        main: `Minimalist geometric representation of ${concept}, clean lines, symbolic design`,
        accent: `Supporting visual elements that enhance the ${concept} theme`,
        background: `Subtle contextual elements for ${concept} visualization`
      },
      animationFlow: [
        { phase: 'Introduction', svgRole: 'background', behavior: 'fade in', timing: '0-1' },
        { phase: 'Development', svgRole: 'main', behavior: 'reveal and animate', timing: '1-3' },
        { phase: 'Resolution', svgRole: 'accent', behavior: 'enhance and complete', timing: '3-5' }
      ],
      technicalSpecs: {
        duration: 5,
        keyMoments: [
          { time: 1, description: 'concept introduction' },
          { time: 3, description: 'full development' },
          { time: 5, description: 'resolution complete' }
        ]
      }
    };
  }

  private validatePlan(plan: SVGGenerationPlan, concept: string): SVGGenerationPlan {
    // Ensure all required fields exist
    if (!plan.concept) plan.concept = concept;
    if (!plan.symbolicAnalysis) plan.symbolicAnalysis = this.createFallbackPlan(concept).symbolicAnalysis;
    if (!plan.svgPrompts) plan.svgPrompts = this.createFallbackPlan(concept).svgPrompts;
    if (!plan.animationFlow) plan.animationFlow = this.createFallbackPlan(concept).animationFlow;
    if (!plan.technicalSpecs) plan.technicalSpecs = this.createFallbackPlan(concept).technicalSpecs;

    return plan;
  }

  private createPlaceholderSVG(type: string, meaning: string): string {
    const colors = {
      main: '#FFFFFF',
      accent: '#CCCCCC',
      background: '#333333'
    };

    return `<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="200" r="100" fill="none" stroke="${(colors as Record<string, string>)[type] || '#FFFFFF'}" stroke-width="2" opacity="0.8"/>
      <text x="200" y="210" text-anchor="middle" fill="${(colors as Record<string, string>)[type] || '#FFFFFF'}" font-size="12" opacity="0.5">${meaning}</text>
    </svg>`;
  }
}

export const openaiSVGGenerator = new OpenAISVGGenerator();