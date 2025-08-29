import OpenAI from 'openai';

export interface AIConceptAnalysis {
  visualMetaphor: string;
  animationType: 'growth' | 'persistence' | 'focus' | 'balance' | 'transformation';
  stages: Array<{
    label: string;
    complexity: number;
    rings: number;
    description: string;
  }>;
  colorScheme: {
    primary: string;
    secondary?: string;
  };
  duration: number;
  mood: 'energetic' | 'calm' | 'powerful' | 'inspiring';
  [key: string]: unknown;
}

export const analyzeConceptWithAI = async (concept: string): Promise<AIConceptAnalysis> => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
Analyze this motivational concept: "${concept}"

Create a visual metaphor using geometric patterns and sacred geometry. Return a JSON response with:

1. visualMetaphor: A poetic description of how to represent this concept visually
2. animationType: Choose from 'growth', 'persistence', 'focus', 'balance', 'transformation'
3. stages: 3-4 progression stages, each with:
   - label: Short, powerful text (2-3 words max)
   - complexity: 1-10 scale of geometric complexity
   - rings: Number of geometric rings/circles (1-8)
   - description: Brief visual description
4. colorScheme: 
   - primary: Hex color that represents the concept's energy
   - secondary: Optional accent color
5. duration: Frame count for 30fps (60-150 frames for 2-5 seconds)
6. mood: 'energetic', 'calm', 'powerful', or 'inspiring'

Examples:
- "never give up" → persistence pattern with rebuilding cycles
- "growth mindset" → growth pattern from simple to complex
- "focus" → convergence pattern with elements coming together

Return only valid JSON.
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('No response from AI');

    return JSON.parse(content);
  } catch (error) {
    console.error('AI Analysis failed:', error);
    // Fallback to default
    return getDefaultAnalysis(concept);
  }
};

const getDefaultAnalysis = (concept: string): AIConceptAnalysis => ({
  visualMetaphor: "Geometric growth representing progress and evolution",
  animationType: 'growth',
  stages: [
    { label: "START", complexity: 1, rings: 1, description: "Simple beginning" },
    { label: "PROGRESS", complexity: 4, rings: 3, description: "Building complexity" },
    { label: "MASTERY", complexity: 8, rings: 6, description: "Full realization" }
  ],
  colorScheme: { primary: "#FFFFFF" },
  duration: 90,
  mood: 'inspiring'
});