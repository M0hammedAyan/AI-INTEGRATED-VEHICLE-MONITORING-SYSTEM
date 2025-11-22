'use client';

import { useAgentStore } from '@/store/agentStore';
import { motion } from 'framer-motion';
import { Bot, Heart, Zap } from 'lucide-react';

interface AgentAvatarProps {
  isSpeaking?: boolean;
}

export default function AgentAvatar({ isSpeaking = false }: AgentAvatarProps) {
  const { agentState } = useAgentStore();
  const isHadi = agentState.active_agent === 'HADI';

  const avatarConfig = {
    HADI: {
      name: 'HADI',
      color: 'hadi-blue',
      bgGradient: 'from-neon-blue via-hadi-blue to-blue-900',
      icon: Zap,
      description: 'TECHNICAL ASSISTANT',
      personality: 'ANALYTICAL • PRECISE • SAFETY-FOCUSED'
    },
    HUDA: {
      name: 'HUDA',
      color: 'huda-warm',
      bgGradient: 'from-neon-orange via-huda-warm to-red-900',
      icon: Heart,
      description: 'EMPATHETIC COMPANION',
      personality: 'WARM • SUPPORTIVE • UNDERSTANDING'
    }
  };

  const config = avatarConfig[agentState.active_agent];
  const Icon = config.icon;

  return (
    <div className="car-panel p-6 h-full flex flex-col">
      <div className="text-center flex-1 flex flex-col justify-center">
        {/* Avatar Circle */}
        <motion.div
          className={`relative mx-auto w-40 h-40 rounded-full bg-gradient-to-br ${config.bgGradient} flex items-center justify-center mb-6 border-4 border-car-border`}
          animate={{
            scale: isSpeaking ? [1, 1.05, 1] : 1,
            boxShadow: isSpeaking 
              ? ['0 0 0 0 rgba(59, 130, 246, 0.7)', '0 0 0 20px rgba(59, 130, 246, 0)', '0 0 0 0 rgba(59, 130, 246, 0)']
              : '0 0 0 0 rgba(59, 130, 246, 0)'
          }}
          transition={{
            duration: isSpeaking ? 1.5 : 0.3,
            repeat: isSpeaking ? Infinity : 0,
          }}
        >
          <Icon className="w-20 h-20 text-white drop-shadow-lg" />
          
          {/* Speaking indicator */}
          {isSpeaking && (
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-white/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.3, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          )}
        </motion.div>

        {/* Agent Info */}
        <motion.div
          key={agentState.active_agent}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-3xl font-tech font-black text-white mb-2">
            {config.name}
          </h2>
          <p className={`text-sm font-tech mb-3 ${isHadi ? 'text-neon-blue' : 'text-neon-orange'}`}>
            {config.description}
          </p>
          <p className="text-gray-400 text-xs font-mono">
            {config.personality}
          </p>
        </motion.div>

        {/* Status Indicator */}
        <div className="mt-6 car-panel px-4 py-2 flex items-center justify-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-neon-green animate-pulse' : 'bg-gray-500'}`} />
          <span className="text-sm font-tech text-white">
            {isSpeaking ? 'SPEAKING' : 'LISTENING'}
          </span>
        </div>

        {/* Mode Switch Animation */}
        <motion.div
          className="mt-4 text-xs font-mono text-gray-500"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          ACTIVE AGENT MODE
        </motion.div>
      </div>
    </div>
  );
}