'use client';

import { useAgentStore } from '@/store/agentStore';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export default function DrowsinessToggle() {
  const { drowsinessEnabled, setDrowsinessEnabled } = useAgentStore();

  const handleToggle = () => {
    setDrowsinessEnabled(!drowsinessEnabled);
  };

  return (
    <div className="car-panel p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {drowsinessEnabled ? (
            <Eye className="w-5 h-5 text-neon-green" />
          ) : (
            <EyeOff className="w-5 h-5 text-gray-500" />
          )}
          <div>
            <h4 className="text-sm font-tech text-white">DROWSINESS DETECTION</h4>
            <p className="text-xs text-gray-400 font-mono">
              {drowsinessEnabled ? 'MONITORING ACTIVE' : 'MONITORING DISABLED'}
            </p>
          </div>
        </div>
        
        <motion.button
          onClick={handleToggle}
          className={`relative w-14 h-7 rounded-full border-2 transition-colors ${
            drowsinessEnabled 
              ? 'bg-neon-green/20 border-neon-green' 
              : 'bg-gray-600/20 border-gray-600'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className={`absolute top-0.5 w-5 h-5 rounded-full transition-colors ${
              drowsinessEnabled ? 'bg-neon-green' : 'bg-gray-500'
            }`}
            animate={{
              x: drowsinessEnabled ? 26 : 2,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </motion.button>
      </div>
    </div>
  );
}