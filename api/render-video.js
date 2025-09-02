const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

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
    const { prompt, wisdomQuote, theme, videoId } = req.body;
    
    if (!prompt || !wisdomQuote || !theme || !videoId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // For now, return success without actually rendering
    // In production, this would trigger Remotion rendering
    return res.status(200).json({
      videoId,
      status: 'rendering',
      message: 'Video rendering started',
      estimatedTime: '30 seconds',
      videoUrl: `/videos/${videoId}.mp4`
    });
    
  } catch (error) {
    console.error('Render API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to start rendering',
      message: error.message
    });
  }
};