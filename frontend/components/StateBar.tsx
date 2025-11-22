'use client';

import { motion } from 'framer-motion';
import { useAgentStore } from '@/store/agentStore';

export default function StateBar() {
  const { ear, state } = useAgentStore();

  const getStateColor = () => {
    switch (state) {
      case 'awake': return '#10FF88';
      case 'warning': return '#FFD54A';
      case 'drowsy': return '#FF3B3B';
      default: return '#00A3FF';
    }
  };

  const getStateText = () => {
    switch (state) {
      case 'awake': return 'AWAKE';
      case 'warning': return 'WARNING';
      case 'drowsy': return 'DROWSY';
      default: return 'MONITORING';
    }
  };

  const earPercentage = ear ? Math.min(ear * 500, 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full relative"
    >
      {/* Glass Panel with Gloss Effect */}
      <div className="h-full bg-black/40 backdrop-blur-[15px] border border-white/20 rounded-2xl relative overflow-hidden">
        {/* Gloss Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] animate-pulse" />
        
        <div className="h-full flex items-center px-8 gap-8">
          {/* EAR Value Display */}
          <div className="flex items-center gap-4">
            <span className="text-white/60 font-mono text-lg">EAR</span>
            <span className="text-white font-mono text-2xl font-bold">
              {ear?.toFixed(3) || '0.000'}
            </span>
          </div>
          
          {/* Gauge Bar */}
          <div className="flex-1 relative">
            <div className="h-8 bg-gray-800/60 rounded-full overflow-hidden border border-white/10">
              {/* Background Segments */}
              <div className="absolute inset-0 flex">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 border-r border-gray-700/50 last:border-r-0"
                  />
                ))}
              </div>
              
              {/* Progress Fill */}
              <motion.div
                className="h-full rounded-full relative"
                style={{
                  background: `linear-gradient(90deg, ${getStateColor()}, ${getStateColor()}80)`,
                  boxShadow: `0 0 20px ${getStateColor()}40`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${earPercentage}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {/* Animated Shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform translate-x-[-100%] animate-pulse" />
              </motion.div>
            </div>
            
            {/* Gauge Labels */}
            <div className="flex justify-between mt-2 text-xs text-white/40 font-mono">
              <span>0.0</span>
              <span>0.1</span>
              <span>0.2</span>
              <span>0.3+</span>
            </div>
          </div>
          
          {/* State Display */}
          <div className="flex items-center gap-3">
            <motion.div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: getStateColor() }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <span 
              className="font-mono text-xl font-bold tracking-wider"
              style={{ color: getStateColor() }}
            >
              {getStateText()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}