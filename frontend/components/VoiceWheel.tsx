'use client';

import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';
import { useAgentStore } from '@/store/agentStore';
import { useState, useEffect } from 'react';

export default function VoiceWheel() {
  const { isListening, isSpeaking, setListening } = useAgentStore();
  const [waveform, setWaveform] = useState<number[]>([]);
  
  const handleMicClick = async () => {
    if (!isListening) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setListening(true);
      } catch (error) {
        console.error('Microphone access denied:', error);
        alert('Please allow microphone access to use voice features');
      }
    } else {
      setListening(false);
    }
  };

  useEffect(() => {
    if (isSpeaking) {
      const interval = setInterval(() => {
        setWaveform(Array.from({ length: 32 }, () => Math.random() * 100));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setWaveform([]);
    }
  }, [isSpeaking]);

  return (
    <div className="h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        {isListening && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-[#00A3FF]/40"
                style={{
                  width: `${120 + i * 30}px`,
                  height: `${120 + i * 30}px`,
                  left: `${-15 * i}px`,
                  top: `${-15 * i}px`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 0.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </>
        )}
        
        {isListening && (
          <motion.div
            className="absolute inset-[-10px] rounded-full border-4 border-transparent"
            style={{
              background: 'conic-gradient(from 0deg, #00A3FF, transparent, #00A3FF)',
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}
        
        <motion.button
          onClick={handleMicClick}
          className="relative w-24 h-24 rounded-full bg-black/60 backdrop-blur-[15px] border-2 border-white/20 flex items-center justify-center"
          style={{
            boxShadow: isListening 
              ? '0 0 40px #00A3FF60, inset 0 0 20px #00A3FF20'
              : '0 0 20px rgba(0,0,0,0.5)',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            borderColor: isListening ? '#00A3FF' : 'rgba(255,255,255,0.2)',
          }}
        >
          {isListening ? (
            <Mic className="w-8 h-8 text-[#00A3FF]" />
          ) : (
            <MicOff className="w-8 h-8 text-white/60" />
          )}
        </motion.button>
        
        {isSpeaking && waveform.length > 0 && (
          <div className="absolute inset-[-20px]">
            {waveform.map((amplitude, i) => {
              const angle = (i / waveform.length) * 360;
              return (
                <motion.div
                  key={i}
                  className="absolute w-1 bg-[#00A3FF] rounded-full"
                  style={{
                    height: `${4 + amplitude * 0.2}px`,
                    left: '50%',
                    top: '50%',
                    transformOrigin: '50% 60px',
                    transform: `translateX(-50%) translateY(-50%) rotate(${angle}deg) translateY(-60px)`,
                  }}
                  animate={{
                    scaleY: [0.5, 1, 0.5],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              );
            })}
          </div>
        )}
        
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <span className="text-white/60 text-sm font-mono">
            {isSpeaking ? 'SPEAKING' : isListening ? 'LISTENING' : 'VOICE'}
          </span>
        </div>
      </motion.div>
    </div>
  );
}