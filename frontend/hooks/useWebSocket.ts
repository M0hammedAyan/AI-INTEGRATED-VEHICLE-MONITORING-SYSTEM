'use client';

import { useEffect } from 'react';
import { useAgentStore } from '@/store/agentStore';
import { wsClient } from '@/services/wsClient';

export function useWebSocket() {
  const { updateState, setConnected, drowsinessEnabled } = useAgentStore();

  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws/state';
    
    wsClient.setOnStateUpdate((data) => {
      // Only update state if drowsiness detection is enabled or state is not drowsy
      if (drowsinessEnabled || data.state !== 'drowsy') {
        updateState(data);
      }
    });

    wsClient.setOnConnectionChange((connected) => {
      setConnected(connected);
    });

    wsClient.connect(wsUrl);

    return () => {
      wsClient.disconnect();
    };
  }, [updateState, setConnected, drowsinessEnabled]);
}