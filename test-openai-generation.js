// Test the OpenAI-powered symbolic analysis and automatic component generation
const { symbolicAnalyzer } = require('./src/SymbolicConceptAnalyzer.ts');
const { rendererGenerator } = require('./src/AutomaticRendererGenerator.ts');

async function testOpenAIIntegration() {
  console.log('🤖 TESTING OPENAI-POWERED SYMBOLIC ANALYSIS\n');
  
  const testConcept = 'courage conquers fear';
  
  try {
    console.log(`Analyzing: "${testConcept}"`);
    console.log('🧠 Sending to OpenAI for deep symbolic analysis...\n');
    
    // Test symbolic analysis
    const analysis = await symbolicAnalyzer.analyzeConceptSymbolism(testConcept);
    
    console.log('✨ SYMBOLIC ANALYSIS RESULTS:');
    console.log(`Primary Metaphor: ${analysis.coreSymbolism.primaryMetaphor}`);
    console.log(`Story Arc: ${analysis.coreSymbolism.storyArc}`);
    console.log(`Emotional Journey: ${analysis.coreSymbolism.emotionalJourney.join(' → ')}`);
    console.log(`Visual Elements: ${analysis.visualMapping.shapes.map(s => s.element + ' (' + s.meaning + ')').join(', ')}`);
    console.log(`Duration: ${analysis.technicalSpecs.duration} seconds`);
    console.log(`Confidence: ${Math.round(analysis.confidence * 100)}%`);
    
    console.log('\n' + '='.repeat(60));
    console.log('🎬 GENERATING DETAILED PROMPT FROM ANALYSIS...');
    console.log('='.repeat(60));
    
    // Test prompt generation
    const detailedPrompt = await symbolicAnalyzer.generateDetailedPrompt(testConcept);
    console.log(detailedPrompt);
    
    console.log('\n' + '='.repeat(60));
    console.log('⚛️  GENERATING REACT COMPONENT FROM ANALYSIS...');
    console.log('='.repeat(60));
    
    // Test automatic component generation
    const reactCode = await rendererGenerator.generateRendererFromConcept(testConcept);
    console.log('✅ React component generated successfully!');
    console.log('📝 Component preview (first 800 chars):');
    console.log(reactCode.substring(0, 800) + '...');
    
    console.log('\n🎯 SYSTEM NOW USES:');
    console.log('• OpenAI GPT-4 for symbolic concept analysis');
    console.log('• Deep metaphorical understanding, not random shapes');
    console.log('• Automatic translation of your prompts into meaningful visuals');
    console.log('• Learning from successful patterns while adding AI intelligence');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('API key')) {
      console.log('\n💡 Make sure your OpenAI API key is set in environment variables.');
      console.log('   The system will use fallback symbolic analysis if needed.');
    }
  }
}

// Run the test
testOpenAIIntegration().catch(console.error);