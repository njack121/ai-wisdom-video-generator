const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static('public'));

// Serve the user interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'user-interface.html'));
});

// Generate video endpoint
app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const videoId = `video_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const outputPath = `public/${videoId}.mp4`;
        
        // Render video with custom prompt using Remotion CLI
        const renderProcess = spawn('npx', [
            'remotion', 'render',
            'DynamicWisdom',
            outputPath,
            '--props', JSON.stringify({
                prompt: prompt,
                wisdomQuote: generateWisdomQuote(prompt),
                theme: detectTheme(prompt)
            })
        ], { stdio: 'inherit' });

        renderProcess.on('close', (code) => {
            if (code === 0) {
                res.json({
                    success: true,
                    videoId: videoId,
                    videoUrl: `/${videoId}.mp4`,
                    prompt: prompt
                });
            } else {
                res.status(500).json({ error: 'Video generation failed' });
            }
        });

    } catch (error) {
        console.error('Generation error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

function generateWisdomQuote(prompt) {
    const themes = {
        growth: [
            "Every seed holds the promise of a forest.",
            "Growth happens in the quiet moments between storms.",
            "What grows slowly, grows strong."
        ],
        persistence: [
            "Don't quit before the miracle happens.",
            "Persistence turns pressure into diamonds.",
            "The river cuts through rock not by power, but by persistence."
        ],
        hope: [
            "Even the darkest night will end and the sun will rise.",
            "Miracles happen to those who don't quit.",
            "Hope is the lighthouse in the storm of uncertainty."
        ]
    };
    
    const theme = detectTheme(prompt);
    const quotes = themes[theme] || themes.growth;
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function detectTheme(prompt) {
    const promptLower = prompt.toLowerCase();
    if (promptLower.includes('quit') || promptLower.includes('persist') || promptLower.includes('miracle')) {
        return 'persistence';
    } else if (promptLower.includes('hope') || promptLower.includes('future')) {
        return 'hope';
    }
    return 'growth';
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});