'use client';

import { useWebSocket } from '@/hooks/useWebSocket';
import CameraFeed from '@/components/CameraFeed';
import AgentAvatarCluster from '@/components/AgentAvatarCluster';
import StateBar from '@/components/StateBar';
import VoiceWheel from '@/components/VoiceWheel';
import ConversationStrip from '@/components/ConversationStrip';
import BottomNavBar from '@/components/BottomNavBar';
import AlertBanner from '@/components/AlertBanner';
import ClientOnly from '@/components/ClientOnly';

export default function Dashboard() {
  useWebSocket();

  return (
    <ClientOnly fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#05080D] to-[#0A0F1A] flex items-center justify-center">
        <div className="text-[#00A3FF] font-mono text-xl animate-pulse tracking-wider">
          INITIALIZING COCKPIT...
        </div>
      </div>
    }>
      <div className="min-h-screen bg-gradient-to-br from-[#05080D] to-[#0A0F1A] overflow-hidden">
        {/* Alert Banner */}
        <AlertBanner />
        
        {/* Main Dashboard Layout */}
        <div className="h-screen flex flex-col p-4 gap-4">
          {/* Camera Feed (Fixed Position) */}
          <CameraFeed />
          
          {/* Top Section: Agent Avatar */}
          <div className="flex-1 flex justify-center">
            <div className="w-96">
              <AgentAvatarCluster />
            </div>
          </div>
          
          {/* EAR & Drowsiness State Bar */}
          <div className="h-16">
            <StateBar />
          </div>
          
          {/* Voice Wheel + Conversation Messages */}
          <div className="h-32 flex gap-4">
            {/* Voice Wheel (30% width) */}
            <div className="flex-[0.3]">
              <VoiceWheel />
            </div>
            
            {/* Conversation Strip (70% width) */}
            <div className="flex-[0.7]">
              <ConversationStrip />
            </div>
          </div>
          
          {/* Bottom Navigation Strip */}
          <div className="h-16">
            <BottomNavBar />
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}