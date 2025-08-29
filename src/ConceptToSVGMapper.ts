import OpenAI from 'openai';

export interface ConceptSVGPlan {
  concept: string;
  visualMetaphor: string;
  svgPrompts: Array<{
    prompt: string;
    negativePrompt: string;
    style: 'FLAT_VECTOR' | 'FLAT_VECTOR_OUTLINE' | 'FLAT_VECTOR_SILHOUETTE' | 'FLAT_VECTOR_ONE_LINE_ART' | 'FLAT_VECTOR_LINE_ART';
    role: 'main' | 'background' | 'accent' | 'progression';
    description: string;
  }>;
  animationPlan: {
    duration: number;
    stages: Array<{
      timePercent: number;
      description: string;
      actions: Array<{
        element: 'main' | 'background' | 'accent' | 'progression';
        animation: string;
        properties: Record<string, any>;
      }>;
    }>;
  };
  colorScheme: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  mood: 'energetic' | 'calm' | 'powerful' | 'inspiring' | 'mysterious';
}

export const createSVGPlan = async (concept: string): Promise<ConceptSVGPlan> => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
Create a comprehensive plan to generate SVGs and animations for the motivational concept: "${concept}"

You are designing a visual story using multiple SVG elements. Think of this like creating a short animated film with symbolic meaning.

Return a JSON object with this exact structure:

{
  "concept": "${concept}",
  "visualMetaphor": "A poetic description of the complete visual story (2-3 sentences)",
  "svgPrompts": [
    {
      "prompt": "Detailed SVG prompt for the main visual element",
      "negativePrompt": "What to avoid in this SVG",
      "style": "FLAT_VECTOR",
      "role": "main",
      "description": "What this element represents"
    },
    {
      "prompt": "Detailed SVG prompt for background/environment",
      "negativePrompt": "What to avoid",
      "style": "FLAT_VECTOR_OUTLINE", 
      "role": "background",
      "description": "Environmental context"
    },
    {
      "prompt": "Detailed SVG prompt for accent/symbolic element",
      "negativePrompt": "What to avoid",
      "style": "FLAT_VECTOR_SILHOUETTE",
      "role": "accent", 
      "description": "Additional symbolic meaning"
    }
  ],
  "animationPlan": {
    "duration": 150,
    "stages": [
      {
        "timePercent": 0,
        "description": "Initial state description",
        "actions": [
          {
            "element": "main",
            "animation": "fadeIn",
            "properties": {"opacity": [0, 1], "scale": [0.8, 1]}
          }
        ]
      },
      {
        "timePercent": 25,
        "description": "First transformation",
        "actions": [
          {
            "element": "background", 
            "animation": "slideIn",
            "properties": {"translateX": [-100, 0]}
          }
        ]
      },
      {
        "timePercent": 50,
        "description": "Peak moment",
        "actions": [
          {
            "element": "accent",
            "animation": "reveal",
            "properties": {"scale": [0, 1.2, 1]}
          }
        ]
      },
      {
        "timePercent": 75,
        "description": "Integration phase", 
        "actions": [
          {
            "element": "main",
            "animation": "transform",
            "properties": {"rotate": [0, 360]}
          }
        ]
      },
      {
        "timePercent": 100,
        "description": "Final state",
        "actions": [
          {
            "element": "main",
            "animation": "glow",
            "properties": {"filter": "brightness(1.5)"}
          }
        ]
      }
    ]
  },
  "colorScheme": {
    "primary": "#hex-color",
    "secondary": "#hex-color", 
    "accent": "#hex-color"
  },
  "mood": "inspiring"
}

Guidelines for SVG Prompts:
1. Be very specific about visual elements
2. Use symbolic and metaphorical language
3. Consider sacred geometry, nature patterns, architectural forms
4. Each SVG should have a clear symbolic purpose
5. Think about layering - main subject, environment, accents
6. Use different styles to create visual hierarchy

Example concepts and their visual approaches:
- "never give up": Broken chain that reforms stronger, phoenix rising, seed growing through concrete
- "inner strength": Mountain silhouette with inner light, tree roots and branches, geometric crystal formation
- "transformation": Butterfly metamorphosis, geometric morph sequence, flowing water to vapor
- "balance": Scales, yin-yang organic forms, dancer in equilibrium pose
- "focus": Lens focusing light, archer with target, maze with clear path

Be creative and symbolic! Create something that tells a story through pure visual metaphor.

Return ONLY valid JSON.
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 4000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('No response from AI');

    const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanedContent);
  } catch (error) {
    console.error('SVG Plan Generation failed:', error);
    return getDefaultSVGPlan(concept);
  }
};

const getDefaultSVGPlan = (concept: string): ConceptSVGPlan => ({
  concept,
  visualMetaphor: "A simple but powerful visual representation of growth and transformation",
  svgPrompts: [
    {
      prompt: "Simple geometric circle growing and expanding, minimalist design",
      negativePrompt: "complex details, text, realistic elements",
      style: 'FLAT_VECTOR',
      role: 'main',
      description: 'Core symbol of the concept'
    }
  ],
  animationPlan: {
    duration: 120,
    stages: [
      {
        timePercent: 0,
        description: 'Beginning',
        actions: [
          {
            element: 'main',
            animation: 'appear',
            properties: { opacity: [0, 1] }
          }
        ]
      },
      {
        timePercent: 100,
        description: 'Growth',
        actions: [
          {
            element: 'main', 
            animation: 'expand',
            properties: { scale: [1, 1.5] }
          }
        ]
      }
    ]
  },
  colorScheme: {
    primary: '#ffffff',
    secondary: '#888888'
  },
  mood: 'inspiring'
});