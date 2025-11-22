import { create } from 'zustand';
import { AgentState, VoiceResponse } from '@/types';

interface Message {
  id: string;
  sender: 'user' | 'HADI' | 'HUDA';
  content: string;
  timestamp: string;
}

interface AgentStore {
  // State
  ear: number | null;
  state: 'awake' | 'warning' | 'drowsy';
  activeAgent: 'HADI' | 'HUDA' | null;
  isConnected: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  messages: Message[];
  drowsinessEnabled: boolean;
  
  // Actions
  updateState: (data: { ear?: number; state?: string; active_agent?: string }) => void;
  setConnected: (connected: boolean) => void;
  setListening: (listening: boolean) => void;
  setSpeaking: (speaking: boolean) => void;
  setActiveAgent: (agent: 'HADI' | 'HUDA') => void;
  addMessage: (message: Omit<Message, 'id'>) => void;
  toggleListening: () => void;
  setDrowsinessEnabled: (enabled: boolean) => void;
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  // Initial state
  ear: null,
  state: 'awake',
  activeAgent: 'HUDA',
  isConnected: false,
  isListening: false,
  isSpeaking: false,
  messages: [],
  drowsinessEnabled: true,
  
  // Actions
  updateState: (data) => set((state) => ({
    ear: data.ear !== undefined ? data.ear : state.ear,
    state: data.state as any || state.state,
    activeAgent: data.active_agent as any || state.activeAgent,
  })),
  
  setConnected: (connected) => set({ isConnected: connected }),
  setListening: (listening) => set({ isListening: listening }),
  setSpeaking: (speaking) => set({ isSpeaking: speaking }),
  setActiveAgent: (agent) => set({ activeAgent: agent }),
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, {
      ...message,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    }]
  })),
  
  toggleListening: () => set((state) => ({ isListening: !state.isListening })),
  setDrowsinessEnabled: (enabled) => set({ drowsinessEnabled: enabled }),
}));