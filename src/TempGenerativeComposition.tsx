
import React from 'react';
import { GenerativeRenderer } from './GenerativeRenderer';

export const TempGenerativeVideo: React.FC = () => {
  const animationData = {
  "concept": "never give up",
  "visualMetaphor": "The visual story starts with a broken circle, representing hurdles or challenges. Slowly, the broken pieces start to recompose, oscillating and struggling, representing the determination to never give up. Eventually, the circle is made whole, symbolizing overcoming challenges. The whole process then repeats, symbolizing the continuous cycle of struggle and overcoming in life.",
  "svgElements": [
    {
      "type": "path",
      "attributes": {
        "id": "broken-circle",
        "d": "M50,50 m-50, 0 a50,50 0 1,0 100,0 a50,50 0 1,0 -100,0",
        "stroke": "#ff5722",
        "fill": "none",
        "strokeWidth": 2,
        "opacity": 1
      },
      "animationSteps": [
        {
          "duration": 2000,
          "properties": {
            "d": "M50,50 m-50, 0 a50,50 0 1,0 100,0 a50,50 0 1,0 -100,0",
            "rotate": "360deg",
            "opacity": [
              0,
              1
            ]
          },
          "easing": "easeInOutQuad",
          "delay": 0
        }
      ]
    }
  ],
  "globalAnimations": [
    {
      "selector": "#broken-circle",
      "timeline": [
        {
          "duration": 3000,
          "properties": {
            "rotate": "360deg"
          },
          "easing": "easeOutElastic"
        }
      ]
    }
  ],
  "colorScheme": {
    "primary": "#ff5722",
    "secondary": "#ffe0b2",
    "accent": "#ff9800"
  },
  "duration": 120,
  "storyArc": [
    {
      "timePercent": 0,
      "description": "Challenges appear",
      "visualState": "Broken circle"
    },
    {
      "timePercent": 25,
      "description": "Struggling in the face of challenges",
      "visualState": "Reassembling fragments"
    },
    {
      "timePercent": 50,
      "description": "Challenges are overcome",
      "visualState": "Whole circle"
    },
    {
      "timePercent": 75,
      "description": "New challenges appear",
      "visualState": "Circle breaks again"
    },
    {
      "timePercent": 100,
      "description": "Ready to face new challenges",
      "visualState": "Cycle repeats"
    }
  ]
};
  
  return <GenerativeRenderer animationData={animationData} />;
};
