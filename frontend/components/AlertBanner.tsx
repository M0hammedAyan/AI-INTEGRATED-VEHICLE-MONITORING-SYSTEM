'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { useAgentStore } from '@/store/agentStore';
import { useState, useEffect } from 'react';

export default function AlertBanner() {
  const { state, activeAgent, setActiveAgent } = useAgentStore();
  const [showAlert, setShowAlert] = useState(false);
  const [autoHideTimer, setAutoHideTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (state === 'drowsy') {
      setShowAlert(true);
      if (activeAgent !== 'HADI') {
        setActiveAgent('HADI');
      }
      
      if (autoHideTimer) {
        clearTimeout(autoHideTimer);
      }
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      setAutoHideTimer(timer);
    } else {
      setShowAlert(false);
      if (autoHideTimer) {
        clearTimeout(autoHideTimer);
        setAutoHideTimer(null);
      }
    }

    return () => {
      if (autoHideTimer) {
        clearTimeout(autoHideTimer);
      }
    };
  }, [state, activeAgent, setActiveAgent, autoHideTimer]);

  const handleClose = () => {
    setShowAlert(false);
    if (autoHideTimer) {
      clearTimeout(autoHideTimer);
      setAutoHideTimer(null);
    }
  };

  return (
    <AnimatePresence>
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className="bg-gradient-to-r from-[#FF3B3B] to-[#FF6B6B] border-b-2 border-[#FF3B3B] shadow-2xl">
            <div className="absolute inset-0 opacity-20">
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            
            <div className="relative px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    ease: 'easeInOut' 
                  }}
                >
                  <AlertTriangle className="w-8 h-8 text-white" />
                </motion.div>
                
                <div>
                  <h2 className="text-white font-mono font-bold text-xl tracking-wider">
                    🚨 DRIVER DROWSY • SAFETY MODE ACTIVATED
                  </h2>
                  <p className="text-white/90 font-mono text-sm">
                    HADI agent has been activated for your safety
                  </p>
                </div>
              </div>
              
              <motion.button
                onClick={handleClose}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>
            
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                x: [0, -2, 2, -2, 2, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}