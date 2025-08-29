// Quick test of the learning system
const { intelligentPromptGenerator } = require('./src/IntelligentPromptGenerator.ts');

console.log('🧠 TESTING LEARNING SYSTEM - from basic concepts to detailed prompts\n');

// Test basic concepts
const testConcepts = [
  'courage vs fear',
  'focus over distraction', 
  'consistency beats perfection',
  'small steps big journey'
];

testConcepts.forEach(concept => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`INPUT: "${concept}"`);
  console.log('='.repeat(60));
  
  const result = intelligentPromptGenerator.generateEnhancedPrompt(concept);
  
  console.log(`\nCONFIDENCE LEVEL: ${Math.round(result.confidence * 100)}%`);
  console.log(`LEARNED FROM: ${result.basedOnPatterns.join(', ')}`);
  
  console.log('\nAUTO-GENERATED SPECS:');
  console.log(`• Duration: ${result.suggestedSpecs.duration} seconds`);
  console.log(`• Background: ${result.suggestedSpecs.backgroundColor}`);
  console.log(`• Typography: ${result.suggestedSpecs.fontSize}`);
  console.log(`• Animation: ${result.suggestedSpecs.animationStyle.replace(/_/g, ' ')}`);
  
  console.log('\nDETAILED PROMPT:');
  console.log(`"${result.enhancedPrompt}"`);
});

console.log('\n\n🎯 NEXT: This system could automatically generate React components from these enhanced prompts!');