import { Composition } from 'remotion';
import { GenerativeRenderer } from './GenerativeRenderer';
import { generateAnimationWithAI } from './AIAnimationGenerator';
import React from 'react';

interface GenerativeCompositionProps {
  concept: string;
}

export const GenerativeComposition: React.FC<GenerativeCompositionProps> = ({ concept }) => {
  // This will be populated by the VideoGenerator with AI-generated animation data
  const [animationData, setAnimationData] = React.useState(null);

  React.useEffect(() => {
    // This will be handled by the VideoGenerator, not here
    // Just showing the structure
  }, [concept]);

  if (!animationData) {
    return <div>Loading...</div>;
  }

  return <GenerativeRenderer animationData={animationData} />;
};

// Main composition root for Remotion
export const RemotionGenerativeRoot: React.FC = () => {
  // Default concept - this will be overridden by VideoGenerator
  const concept = "never give up";
  
  return (
    <Composition
      id="GenerativeMotivationalVideo"
      component={GenerativeComposition}
      durationInFrames={120} // Will be dynamic based on AI
      fps={30}
      width={1080}
      height={1080}
      defaultProps={{ concept }}
    />
  );
};