export interface AgentState {
  ear: number;
  state: 'awake' | 'warning' | 'drowsy';
  active_agent: 'HADI' | 'HUDA';
  timestamp: string;
}

export interface VoiceResponse {
  transcription: string;
  response: string;
  agent: 'HADI' | 'HUDA';
}

export interface CameraFrame {
  frame: string; // base64 encoded
  timestamp: string;
}