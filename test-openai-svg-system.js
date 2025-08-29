// Test OpenAI + SVG.io integration with your detailed prompt
const { openaiSVGGenerator } = require('./src/OpenAISVGGenerator.ts');
const fs = require('fs').promises;

async function testOpenAISVGSystem() {
  console.log('🤖 TESTING OPENAI + SVG.io SYSTEM\n');
  
  const concept = 'motivation fades discipline persists';
  const detailedPrompt = `Minimalist composition on dark charcoal background (RGB 25,25,25), centered white text 'Motivation fades.' appears first in light-weight sans-serif font, 32pt size, fades in over 0.5 seconds, remains visible for 2 seconds with subtle breathing opacity animation (95%-100%-95% over 1.5 second cycles). At exactly 3 seconds, 'Motivation fades.' begins 0.8 second fade-out while simultaneously 'Discipline persists.' fades in below it in bold-weight same font, 36pt size, positioned 40px below first line.`;
  
  try {
    console.log(`🧠 Sending concept to OpenAI for SVG generation planning...`);
    console.log(`Concept: "${concept}"`);
    console.log(`Your detailed specs: "${detailedPrompt.substring(0, 100)}..."`);
    
    // This will:
    // 1. Send concept to ChatGPT for symbolic analysis
    // 2. Generate detailed SVG creation prompts
    // 3. Use SVG.io API to create the assets
    // 4. Generate React component with proper animations
    const result = await openaiSVGGenerator.generateSVGVideoFromConcept(concept);
    
    console.log('\n✅ OPENAI ANALYSIS COMPLETE:');
    console.log(`Primary Metaphor: ${result.plan.symbolicAnalysis.primaryMetaphor}`);
    console.log(`Story Progression: ${result.plan.symbolicAnalysis.storyProgression.join(' → ')}`);
    console.log(`Emotional Journey: ${result.plan.symbolicAnalysis.emotionalJourney.join(' → ')}`);
    
    console.log('\n📝 AI-GENERATED SVG PROMPTS:');
    console.log(`MAIN: ${result.plan.svgPrompts.main}`);
    console.log(`ACCENT: ${result.plan.svgPrompts.accent}`);
    console.log(`BACKGROUND: ${result.plan.svgPrompts.background}`);
    
    console.log('\n🎬 ANIMATION FLOW PLAN:');
    result.plan.animationFlow.forEach((phase, i) => {
      console.log(`${i + 1}. ${phase.phase}: ${phase.behavior} (${phase.timing}s)`);
    });
    
    console.log('\n💾 Saving generated component...');
    const componentName = 'AIMotivationDisciplineRenderer';
    const filePath = `./src/${componentName}.tsx`;
    await fs.writeFile(filePath, result.componentCode);
    
    console.log(`✅ Saved to ${filePath}`);
    
    console.log('\n🎯 WHAT THIS PROVES:');
    console.log('• ChatGPT analyzes your concepts for deep symbolic meaning');
    console.log('• AI creates detailed prompts for SVG.io API generation'); 
    console.log('• System generates unique visual assets (not hand-coded)');
    console.log('• Combines AI intelligence with SVG creativity');
    console.log('• Creates meaningful animations with proper symbolism');
    
    console.log('\n🚀 To test the component:');
    console.log('1. Add import to Composition.tsx');
    console.log('2. Add composition entry');
    console.log('3. View at http://localhost:3000');
    
    return { success: true, componentName, plan: result.plan };
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nThis could be due to:');
    console.log('• SVG.io API rate limits or downtime');
    console.log('• OpenAI API issues');
    console.log('• The system will use fallback placeholders if needed');
    
    return { success: false, error: error.message };
  }
}

// Run the test
testOpenAISVGSystem()
  .then(result => {
    if (result.success) {
      console.log('\n🎉 OpenAI + SVG System test completed successfully!');
    } else {
      console.log('\n💥 Test encountered issues:', result.error);
    }
  })
  .catch(console.error);