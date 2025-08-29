
import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const EmbeddedSVGComponent: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / durationInFrames;
  const timePercent = progress * 100;

  // Animation values
  const scale = interpolate(progress, [0, 1], [0.8, 1.2]);
  const rotation = interpolate(frame, [0, durationInFrames], [0, 360]);
  const opacity = interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.9]);

  // SVG Contents (embedded directly)
  const svgContents = {
  "main": "<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\">\n      <circle cx=\"100\" cy=\"100\" r=\"80\" fill=\"none\" stroke=\"#6B9464\" stroke-width=\"4\" />\n      <circle cx=\"100\" cy=\"100\" r=\"40\" fill=\"#6B9464\" opacity=\"0.3\" />\n    </svg>",
  "background": "<svg viewBox=\"0 0 300 300\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"50\" y=\"50\" width=\"200\" height=\"200\" fill=\"none\" stroke=\"#6B9464\" stroke-width=\"2\" opacity=\"0.5\" />\n    </svg>",
  "accent": "<svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\">\n      <polygon points=\"50,10 90,90 10,90\" fill=\"#6B9464\" opacity=\"0.8\" />\n    </svg>"
};
  
  // Plan data
  const plan = {
  "concept": "never give up",
  "visualMetaphor": "A seed growing against all odds, breaking through a tough layer of concrete, reaching towards the nurturing sunlight above.",
  "svgPrompts": [
    {
      "prompt": "Draw a sprouting seed with a robust stem, breaking through a crack in concrete. The seed should be detailed, showing the struggle it's been through.",
      "negativePrompt": "Avoid drawing the seed too small or frail. Don't make the concrete too dark or menacing.",
      "style": "FLAT_VECTOR",
      "role": "main",
      "description": "The seed represents the relentless spirit, the concrete signifies obstacles"
    },
    {
      "prompt": "Design an environment with gloomy, cracked concrete at the bottom half and a bright sunny sky at the top half.",
      "negativePrompt": "Don't make the sky too bright or the concrete too detailed to distract from the main element",
      "style": "FLAT_VECTOR_OUTLINE",
      "role": "background",
      "description": "The gloomy concrete represents challenges and the bright sky symbolizes hope"
    },
    {
      "prompt": "Include a shining sun breaking through the clouds, casting a warm light onto the seed.",
      "negativePrompt": "Do not make the sun too large or too small. Avoid too many clouds.",
      "style": "FLAT_VECTOR_SILHOUETTE",
      "role": "accent",
      "description": "The sun symbolizes hope and positivity, motivating the seed to grow"
    }
  ],
  "animationPlan": {
    "duration": 150,
    "stages": [
      {
        "timePercent": 0,
        "description": "The seed is at rest, nestled within the concrete",
        "actions": [
          {
            "element": "main",
            "animation": "fadeIn",
            "properties": {
              "opacity": [
                0,
                1
              ],
              "scale": [
                0.8,
                1
              ]
            }
          }
        ]
      },
      {
        "timePercent": 25,
        "description": "Concrete starts to crack slightly, revealing the seed",
        "actions": [
          {
            "element": "background",
            "animation": "slideIn",
            "properties": {
              "translateX": [
                -100,
                0
              ]
            }
          }
        ]
      },
      {
        "timePercent": 50,
        "description": "Seed sprouts and pushes through the concrete, reaching towards the sunlight",
        "actions": [
          {
            "element": "accent",
            "animation": "reveal",
            "properties": {
              "scale": [
                0,
                1.2,
                1
              ]
            }
          }
        ]
      },
      {
        "timePercent": 75,
        "description": "Seed continues to grow, now a small plant, under the warmth of the sun",
        "actions": [
          {
            "element": "main",
            "animation": "transform",
            "properties": {
              "rotate": [
                0,
                360
              ]
            }
          }
        ]
      },
      {
        "timePercent": 100,
        "description": "The plant is fully grown, its leaves spread wide absorbing the sunlight, standing tall despite the harsh concrete below",
        "actions": [
          {
            "element": "main",
            "animation": "glow",
            "properties": {
              "filter": "brightness(1.5)"
            }
          }
        ]
      }
    ]
  },
  "colorScheme": {
    "primary": "#6B9464",
    "secondary": "#A0AAB5",
    "accent": "#F7FA8A"
  },
  "mood": "inspiring"
};

  // Current stage
  const currentStage = plan.animationPlan.stages.reduce((prev, curr) => {
    return timePercent >= curr.timePercent ? curr : prev;
  }, plan.animationPlan.stages[0]) || { description: 'Transforming' };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background */}
      {svgContents.background && (
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '5%',
            width: '90%',
            height: '90%',
            opacity: opacity * 0.3,
            transform: `scale(${scale * 0.9}) rotate(${rotation * 0.2}deg)`,
            zIndex: 1
          }}
          dangerouslySetInnerHTML={{ __html: svgContents.background }}
        />
      )}
      
      {/* Main */}
      {svgContents.main && (
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '15%',
            width: '70%',
            height: '70%',
            opacity: opacity,
            transform: `scale(${scale}) rotate(${rotation * 0.5}deg)`,
            filter: `drop-shadow(0 0 15px ${plan.colorScheme.primary})`,
            zIndex: 2
          }}
          dangerouslySetInnerHTML={{ __html: svgContents.main }}
        />
      )}
      
      {/* Accent */}
      {svgContents.accent && (
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '30%',
            height: '30%',
            opacity: opacity * 0.8,
            transform: `scale(${scale * 1.1}) rotate(${rotation}deg)`,
            zIndex: 3
          }}
          dangerouslySetInnerHTML={{ __html: svgContents.accent }}
        />
      )}

      {/* Text overlays */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: plan.colorScheme.primary,
        fontSize: '28px',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',
        textShadow: `0 0 15px ${plan.colorScheme.primary}`,
        opacity: opacity,
        maxWidth: '80%',
        zIndex: 10
      }}>
        {currentStage.description}
      </div>

      <div style={{
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: plan.colorScheme.secondary || plan.colorScheme.primary,
        fontSize: '18px',
        fontFamily: 'Arial, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        opacity: 0.8,
        zIndex: 10
      }}>
        {plan.concept}
      </div>
    </div>
  );
};
