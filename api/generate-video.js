// Vercel serverless function to generate wisdom videos

// Simple wisdom quote generator based on themes
const generateWisdomQuote = (prompt) => {
  const themes = {
    growth: [
      "Every seed holds the promise of a forest.",
      "Growth happens in the quiet moments between storms.",
      "What grows slowly, grows strong.",
      "The tree that would grow to heaven must send its roots to hell."
    ],
    persistence: [
      "Persistence turns pressure into diamonds.",
      "The river cuts through rock not by power, but by persistence.",
      "Every drop counts in the ocean of success.",
      "Consistency is the key that unlocks potential."
    ],
    balance: [
      "Balance is not standing still, but moving gracefully.",
      "The strongest trees bend with the wind.",
      "Harmony is found in the dance between opposites.",
      "Peace comes from balancing what is with what could be."
    ],
    hope: [
      "Hope is the lighthouse in the storm of uncertainty.",
      "Even the darkest night will end and the sun will rise.",
      "Hope is not a wish, but a way forward.",
      "In every ending lies the seed of a new beginning."
    ],
    courage: [
      "Courage is not the absence of fear, but action in its presence.",
      "The brave may not live forever, but the cautious do not live at all.",
      "Mountains are climbed one step at a time.",
      "Your potential is like a mountain - it seems impossible until you start climbing."
    ]
  };

  // Determine theme based on prompt keywords
  const prompt_lower = prompt.toLowerCase();
  let selectedTheme = 'growth'; // default
  
  if (prompt_lower.includes('persist') || prompt_lower.includes('continue') || prompt_lower.includes('keep going')) {
    selectedTheme = 'persistence';
  } else if (prompt_lower.includes('balance') || prompt_lower.includes('harmony') || prompt_lower.includes('peace')) {
    selectedTheme = 'balance';
  } else if (prompt_lower.includes('hope') || prompt_lower.includes('future') || prompt_lower.includes('tomorrow')) {
    selectedTheme = 'hope';
  } else if (prompt_lower.includes('courage') || prompt_lower.includes('brave') || prompt_lower.includes('strong')) {
    selectedTheme = 'courage';
  } else if (prompt_lower.includes('grow') || prompt_lower.includes('learn') || prompt_lower.includes('develop')) {
    selectedTheme = 'growth';
  }

  const quotes = themes[selectedTheme];
  const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  return {
    theme: selectedTheme,
    quote: selectedQuote
  };
};

module.exports = async function handler(req, res) {
  try {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Simple test response first
    const { prompt } = req.body || {};
    
    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Generate wisdom content
    const wisdom = generateWisdomQuote(prompt.trim());
    const videoId = `wisdom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Return the wisdom data
    return res.status(200).json({
      videoId,
      prompt: prompt.trim(),
      theme: wisdom.theme,
      quote: wisdom.quote,
      status: 'generated',
      message: 'Video concept generated successfully'
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      stack: error.stack
    });
  }
}