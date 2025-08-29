export interface ConceptConfig {
  concept: string;
  stages: Array<{
    label: string;
    complexity: number;
    rings: number;
  }>;
  primaryColor: string;
  backgroundColor: string;
  duration: number;
}

export const mapConceptToVisual = (concept: string): ConceptConfig => {
  // This is where you'd integrate with Claude/GPT API
  // For now, here are some predefined mappings:
  
  const conceptMappings: Record<string, ConceptConfig> = {
    "never give up": {
      concept: "NEVER GIVE UP",
      stages: [
        { label: "SETBACK", complexity: 1, rings: 1 },
        { label: "REBUILD", complexity: 3, rings: 2 },
        { label: "STRENGTHEN", complexity: 6, rings: 4 },
        { label: "TRIUMPH", complexity: 10, rings: 7 }
      ],
      primaryColor: "#FFD700",
      backgroundColor: "#000000",
      duration: 90 // 3 seconds at 30fps
    },
    
    "growth mindset": {
      concept: "GROWTH MINDSET",
      stages: [
        { label: "DAY 1", complexity: 1, rings: 1 },
        { label: "WEEK 1", complexity: 2, rings: 2 },
        { label: "MONTH 1", complexity: 5, rings: 4 },
        { label: "YEAR 1", complexity: 10, rings: 8 }
      ],
      primaryColor: "#FFFFFF",
      backgroundColor: "#000000",
      duration: 120
    },
    
    "discipline persists": {
      concept: "DISCIPLINE PERSISTS",
      stages: [
        { label: "MOTIVATION", complexity: 2, rings: 2 },
        { label: "FADES", complexity: 1, rings: 1 },
        { label: "DISCIPLINE", complexity: 8, rings: 6 },
        { label: "REMAINS", complexity: 10, rings: 8 }
      ],
      primaryColor: "#00FFFF",
      backgroundColor: "#000000",
      duration: 100
    }
  };
  
  return conceptMappings[concept.toLowerCase()] || conceptMappings["growth mindset"];
};