'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAgentStore } from '@/store/agentStore';
import { useEffect, useState } from 'react';

export default function AgentAvatarCluster() {
  const { activeAgent, isListening, isSpeaking } = useAgentStore();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const agentColor = activeAgent === 'HADI' ? '#00A3FF' : '#FF7A3D';
  const agentName = activeAgent || 'HADI';

  return (
    <div className="h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-80 h-80"
      >
        {/* Outer Rotating Gauge Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent"
          style={{
            background: `conic-gradient(from ${rotation}deg, ${agentColor}, transparent, ${agentColor})`,
            borderRadius: '50%',
          }}
          animate={{ rotate: rotation }}
          transition={{ duration: 0.05, ease: 'linear' }}
        />
        
        {/* Inner Glass Panel */}
        <div className="absolute inset-4 rounded-full bg-black/40 backdrop-blur-[15px] border border-white/20 flex items-center justify-center">
          {/* Pulse Glow Ring */}
          <motion.div
            className="absolute inset-8 rounded-full"
            style={{
              background: `radial-gradient(circle, ${agentColor}40, transparent)`,
              boxShadow: `0 0 40px ${agentColor}60`,
            }}
            animate={{
              scale: isSpeaking || isListening ? [1, 1.1, 1] : 1,
              opacity: isSpeaking || isListening ? [0.6, 1, 0.6] : 0.4,
            }}
            transition={{
              duration: 1.5,
              repeat: isSpeaking || isListening ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />
          
          {/* Avatar Content */}\n          <div className="relative z-10 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAgent}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="flex flex-col items-center"
              >
                {/* Agent Icon */}
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center mb-4 border-2"
                  style={{
                    backgroundColor: `${agentColor}20`,
                    borderColor: agentColor,
                    boxShadow: `0 0 20px ${agentColor}40`,
                  }}
                >
                  <span 
                    className="text-4xl font-bold font-mono"
                    style={{ color: agentColor }}
                  >
                    {agentName[0]}
                  </span>
                </div>
                
                {/* Agent Name */}
                <h2 
                  className="text-3xl font-bold font-mono mb-2"
                  style={{ color: agentColor }}
                >
                  {agentName}
                </h2>
                
                {/* Status */}
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: agentColor }}
                  />
                  <span className="text-white/80 text-sm font-mono">
                    {isSpeaking ? 'SPEAKING' : isListening ? 'LISTENING' : 'STANDBY'}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Speaking Animation Rings */}
          {isSpeaking && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border-2"
                  style={{
                    borderColor: `${agentColor}60`,
                    width: `${60 + i * 20}%`,
                    height: `${60 + i * 20}%`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 0.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </>
          )}
        </div>
        
        {/* Speedometer-style Ticks */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) - 90;
            return (
              <div
                key={i}
                className="absolute w-1 h-6 bg-white/30"
                style={{
                  top: '10px',
                  left: '50%',
                  transformOrigin: '50% 150px',
                  transform: `translateX(-50%) rotate(${angle}deg)`,
                }}
              />
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}