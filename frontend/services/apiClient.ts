const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

interface VoiceResponse {
  success: boolean;
  message?: string;
  agent?: string;
  response?: string;
}

export class ApiClient {
  static async sendVoiceData(audioBlob: Blob): Promise<VoiceResponse> {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.wav');

    const response = await fetch(`${API_BASE}/api/voice/send`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Voice API error: ${response.statusText}`);
    }

    return response.json();
  }

  static async sendTextCommand(text: string): Promise<VoiceResponse> {
    const response = await fetch(`${API_BASE}/api/text/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`Text API error: ${response.statusText}`);
    }

    return response.json();
  }

  static async triggerNavigation(destination: string): Promise<any> {
    const response = await fetch(`${API_BASE}/api/navigation/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ destination }),
    });

    if (!response.ok) {
      throw new Error(`Navigation API error: ${response.statusText}`);
    }

    return response.json();
  }

  static async callTool(toolName: string, params: any = {}): Promise<any> {
    const response = await fetch(`${API_BASE}/api/tools/${toolName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Tool API error: ${response.statusText}`);
    }

    return response.json();
  }

  static async getAgentStatus(): Promise<any> {
    const response = await fetch(`${API_BASE}/api/status`);
    
    if (!response.ok) {
      throw new Error(`Status API error: ${response.statusText}`);
    }

    return response.json();
  }
}