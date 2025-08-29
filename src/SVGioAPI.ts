import axios from 'axios';
import fs from 'fs';
import path from 'path';

export interface SVGGenerationRequest {
  prompt: string;
  negativePrompt: string;
  style: 'FLAT_VECTOR' | 'FLAT_VECTOR_OUTLINE' | 'FLAT_VECTOR_SILHOUETTE' | 'FLAT_VECTOR_ONE_LINE_ART' | 'FLAT_VECTOR_LINE_ART';
}

export interface SVGResponse {
  success: boolean;
  data: Array<{
    id: string;
    description: string;
    svgUrl: string;
    pngUrl: string;
    prompt: string;
    style: string;
    width: number;
    height: number;
  }>;
}

export class SVGioClient {
  private apiKey: string;
  private baseUrl = 'https://api.svg.io';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateSVG(request: SVGGenerationRequest): Promise<SVGResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/v1/generate-image`,
        {
          prompt: request.prompt,
          negativePrompt: request.negativePrompt,
          style: request.style
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('SVG.io API Error:', error);
      throw new Error(`Failed to generate SVG: ${error}`);
    }
  }

  async downloadSVG(svgUrl: string, filename: string): Promise<string> {
    try {
      const response = await axios.get(svgUrl, { responseType: 'text' });
      
      // Ensure assets directory exists
      const assetsDir = path.join(process.cwd(), 'src', 'assets');
      if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
      }

      const filePath = path.join(assetsDir, `${filename}.svg`);
      fs.writeFileSync(filePath, response.data);
      
      console.log(`✅ Downloaded SVG: ${filePath}`);
      return filePath;
    } catch (error) {
      console.error('SVG Download Error:', error);
      throw new Error(`Failed to download SVG: ${error}`);
    }
  }

  // Simplified method for OpenAI system
  async generateSVGFromPrompt(prompt: string, concept: string): Promise<string> {
    try {
      const request: SVGGenerationRequest = {
        prompt,
        negativePrompt: 'low quality, blurry, text, letters, words',
        style: 'FLAT_VECTOR'
      };

      const response = await this.generateSVG(request);
      
      if (response.success && response.data.length > 0) {
        // Download and return SVG content
        const svgUrl = response.data[0].svgUrl;
        const svgResponse = await axios.get(svgUrl, { responseType: 'text' });
        return svgResponse.data;
      } else {
        throw new Error('No SVG generated');
      }
    } catch (error) {
      console.error('SVG generation failed, using fallback:', error);
      // Return fallback SVG
      return this.createFallbackSVG(prompt, concept);
    }
  }

  private createFallbackSVG(prompt: string, concept: string): string {
    // Create a simple geometric SVG based on the prompt
    return `<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="black"/>
      <circle cx="200" cy="200" r="100" fill="none" stroke="white" stroke-width="3" opacity="0.8"/>
      <circle cx="200" cy="200" r="60" fill="none" stroke="white" stroke-width="2" opacity="0.6"/>
      <circle cx="200" cy="200" r="30" fill="white" opacity="0.4"/>
      <text x="200" y="350" text-anchor="middle" fill="white" font-size="16" opacity="0.7">${concept}</text>
    </svg>`;
  }

  async getRemainingCredits(): Promise<number> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/v1/get-remaining-credits`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.data.numMembershipCreditsRemaining;
    } catch (error) {
      console.error('Credits Check Error:', error);
      return -1;
    }
  }
}

// Exports are now inline above