import OpenAI from 'openai';
import { GenerativeAnimation } from './GenerativeAnimationSystem';

export const generateAnimationWithAI = async (concept: string): Promise<GenerativeAnimation> => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
Create a unique, generative SVG animation for the concept: "${concept}"

You are a master of visual metaphors and sacred geometry. Design a completely custom animation that tells the story of this concept through moving shapes, lines, and forms.

Return a JSON object with this structure:

{
  "concept": "${concept}",
  "visualMetaphor": "Detailed description of the visual story",
  "svgElements": [
    {
      "type": "path|circle|rect|polygon|line|polyline",
      "attributes": {
        "id": "unique-id",
        "d": "path data for paths",
        "cx/cy/r": "for circles",
        "x/y/width/height": "for rects",
        "points": "for polygons/polylines",
        "x1/y1/x2/y2": "for lines",
        "stroke": "color",
        "fill": "color or 'none'",
        "strokeWidth": number,
        "opacity": number
      },
      "animationSteps": [
        {
          "duration": 1000,
          "properties": {
            "scale": [1, 1.5],
            "rotate": "360deg",
            "opacity": [0, 1],
            "translateX": [0, 100],
            "strokeDasharray": ["0 100", "100 0"]
          },
          "easing": "easeInOutQuad",
          "delay": 0
        }
      ]
    }
  ],
  "globalAnimations": [
    {
      "selector": ".all-elements",
      "timeline": [
        {
          "duration": 2000,
          "properties": {"rotate": "180deg"},
          "easing": "easeOutElastic"
        }
      ]
    }
  ],
  "colorScheme": {
    "primary": "#hex-color",
    "secondary": "#hex-color",
    "accent": "#hex-color"
  },
  "duration": 120,
  "storyArc": [
    {"timePercent": 0, "description": "Initial state", "visualState": "Simple form"},
    {"timePercent": 25, "description": "First transformation", "visualState": "Growing complexity"},
    {"timePercent": 50, "description": "Peak complexity", "visualState": "Full realization"},
    {"timePercent": 75, "description": "Integration", "visualState": "Harmonious balance"},
    {"timePercent": 100, "description": "Completion", "visualState": "Perfected form"}
  ]
}

Guidelines:
1. Create 3-8 unique SVG elements that work together
2. Use mathematical relationships (fibonacci, golden ratio, etc)
3. Tell a clear visual story with beginning, middle, end
4. Use diverse shapes: paths for organic forms, circles for cycles, lines for connections
5. Animate properties like scale, rotate, translate, opacity, stroke-dasharray
6. Choose colors that emotionally match the concept
7. Create layered complexity - simple shapes that become complex through animation
8. Use different easing functions for organic feel: easeInOutQuad, easeOutElastic, easeInBack

Examples of what to create:
- "never give up": Start with broken fragments that slowly reassemble and strengthen
- "growth": Seed-like dot expands into tree-like branching paths  
- "focus": Scattered elements spiral inward to single point
- "balance": See-saw line with moving weights finding equilibrium
- "transformation": Shape morphs through different geometric forms

Be creative and unique! Create something that has never been seen before.

Return ONLY valid JSON.
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8, // Higher creativity
      max_tokens: 4000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('No response from AI');

    // Clean up any markdown formatting
    const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
    
    return JSON.parse(cleanedContent);
  } catch (error) {
    console.error('AI Animation Generation failed:', error);
    return getDefaultGenerativeAnimation(concept);
  }
};

const getDefaultGenerativeAnimation = (concept: string): GenerativeAnimation => ({
  concept,
  visualMetaphor: "A simple geometric form evolving into complex beauty",
  svgElements: [
    {
      type: 'circle',
      attributes: {
        id: 'central-circle',
        cx: 540,
        cy: 540,
        r: 20,
        fill: 'none',
        stroke: '#ffffff',
        strokeWidth: 2,
        opacity: 0.8
      },
      animationSteps: [
        {
          duration: 2000,
          properties: { r: [20, 100], opacity: [0.8, 1] },
          easing: 'easeOutElastic'
        }
      ]
    }
  ],
  globalAnimations: [],
  colorScheme: { primary: '#ffffff', secondary: '#888888' },
  duration: 120,
  storyArc: [
    { timePercent: 0, description: 'Beginning', visualState: 'Simple form' },
    { timePercent: 100, description: 'Growth', visualState: 'Expanded form' }
  ]
});