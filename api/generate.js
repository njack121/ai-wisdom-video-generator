const fs = require('fs');
const path = require('path');

// Simple template-based video generation
module.exports = async function handler(req, res) {
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

  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Generate wisdom content
    const wisdom = generateWisdomContent(prompt);
    const videoId = `wisdom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // For now, create a text-based video representation
    // In production, this would trigger actual video rendering
    const videoData = {
      videoId,
      prompt: prompt.trim(),
      wisdomQuote: wisdom.quote,
      theme: wisdom.theme,
      videoUrl: `/${wisdom.templateVideo}.mp4`, // Use existing video as template
      customText: wisdom.quote,
      status: 'generated'
    };
    
    // Simulate video generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return res.status(200).json({
      success: true,
      ...videoData,
      message: `Generated ${wisdom.theme} themed video with your custom text`
    });
    
  } catch (error) {
    console.error('Generation error:', error);
    return res.status(500).json({ 
      error: 'Video generation failed',
      message: error.message
    });
  }
};

function generateWisdomContent(prompt) {
  const themes = {
    growth: {
      quotes: [
        "Every seed holds the promise of a forest.",
        "Growth happens in the quiet moments between storms.",
        "What grows slowly, grows strong.",
        "The tree that would grow to heaven must send its roots to hell."
      ],
      templateVideo: 'PlantingTreesWisdom'
    },
    persistence: {
      quotes: [
        "Don't quit before the miracle happens.",
        "Persistence turns pressure into diamonds.",
        "The river cuts through rock not by power, but by persistence.",
        "Every drop counts in the ocean of success."
      ],
      templateVideo: 'WaterDropStone'
    },
    hope: {
      quotes: [
        "Even the darkest night will end and the sun will rise.",
        "Miracles happen to those who don't quit.",
        "Hope is the lighthouse in the storm of uncertainty.",
        "In every ending lies the seed of a new beginning."
      ],
      templateVideo: 'PlantingTreesWisdom'
    },
    balance: {
      quotes: [
        "Balance is not standing still, but moving gracefully.",
        "The strongest trees bend with the wind.",
        "Harmony is found in the dance between opposites.",
        "Peace comes from balancing what is with what could be."
      ],
      templateVideo: 'BambooOakWisdom'
    },
    courage: {
      quotes: [
        "Courage is not the absence of fear, but action in its presence.",
        "The brave may not live forever, but the cautious do not live at all.",
        "Mountains are climbed one step at a time.",
        "Your potential is like a mountain - it seems impossible until you start climbing."
      ],
      templateVideo: 'BambooOakWisdom'
    }
  };

  // Determine theme based on prompt keywords
  const promptLower = prompt.toLowerCase();
  let selectedTheme = 'growth'; // default
  
  if (promptLower.includes('persist') || promptLower.includes('continue') || promptLower.includes('quit') || promptLower.includes('give up')) {
    selectedTheme = 'persistence';
  } else if (promptLower.includes('balance') || promptLower.includes('harmony') || promptLower.includes('peace')) {
    selectedTheme = 'balance';
  } else if (promptLower.includes('hope') || promptLower.includes('future') || promptLower.includes('miracle') || promptLower.includes('faith')) {
    selectedTheme = 'hope';
  } else if (promptLower.includes('courage') || promptLower.includes('brave') || promptLower.includes('strong') || promptLower.includes('fear')) {
    selectedTheme = 'courage';
  } else if (promptLower.includes('grow') || promptLower.includes('learn') || promptLower.includes('develop') || promptLower.includes('improve')) {
    selectedTheme = 'growth';
  }

  const themeData = themes[selectedTheme];
  const selectedQuote = themeData.quotes[Math.floor(Math.random() * themeData.quotes.length)];
  
  return {
    theme: selectedTheme,
    quote: selectedQuote,
    templateVideo: themeData.templateVideo
  };
}