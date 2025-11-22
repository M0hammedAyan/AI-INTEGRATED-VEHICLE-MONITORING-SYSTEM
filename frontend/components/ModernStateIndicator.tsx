'use client';

import { useAgentStore } from '@/store/agentStore';
import { motion } from 'framer-motion';
import { Eye, AlertTriangle, AlertCircle, Activity } from 'lucide-react';

export default function ModernStateIndicator() {
  const { agentState, isConnected } = useAgentStore();

  const getStateConfig = () => {
    switch (agentState.state) {
      case 'awake':
        return {
          color: 'text-neon-green',
          bgColor: 'bg-neon-green/10',
          borderColor: 'border-neon-green',
          icon: Eye,
          label: 'AWAKE',
          description: 'DRIVER ALERT AND FOCUSED',
          barColor: 'bg-neon-green'
        };
      case 'warning':
        return {
          color: 'text-neon-orange',
          bgColor: 'bg-neon-orange/10',
          borderColor: 'border-neon-orange',
          icon: AlertTriangle,
          label: 'WARNING',
          description: 'REDUCED ALERTNESS DETECTED',
          barColor: 'bg-neon-orange'
        };
      case 'drowsy':
        return {
          color: 'text-neon-red',
          bgColor: 'bg-neon-red/10',
          borderColor: 'border-neon-red',
          icon: AlertCircle,
          label: 'DROWSY',
          description: 'IMMEDIATE ATTENTION REQUIRED',
          barColor: 'bg-neon-red'
        };
      default:
        return {
          color: 'text-gray-400',
          bgColor: 'bg-gray-400/10',
          borderColor: 'border-gray-400',
          icon: Eye,
          label: 'UNKNOWN',
          description: 'STATUS UNAVAILABLE',
          barColor: 'bg-gray-400'
        };
    }
  };

  const config = getStateConfig();
  const Icon = config.icon;

  return (
    <div className="car-panel p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-neon-blue" />
          <h3 className="text-lg font-tech text-white">DRIVER STATE</h3>
        </div>
        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-neon-green animate-pulse' : 'bg-neon-red'}`} />
      </div>

      {/* Main Status Display */}
      <motion.div
        className={`${config.bgColor} ${config.borderColor} border-2 car-panel p-6 mb-6`}
        animate={{
          scale: agentState.state === 'drowsy' ? [1, 1.02, 1] : 1,
        }}
        transition={{
          duration: 0.5,
          repeat: agentState.state === 'drowsy' ? Infinity : 0,
        }}
      >
        <div className="flex items-center gap-4 mb-4">
          <Icon className={`w-8 h-8 ${config.color}`} />
          <div>
            <span className={`text-2xl font-tech font-bold ${config.color}`}>
              {config.label}
            </span>
            <p className="text-gray-300 text-sm font-mono mt-1">{config.description}</p>
          </div>
        </div>
        
        {/* EAR Value Display */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm font-tech">EAR VALUE</span>
            <span className="text-white font-mono text-lg">
              {agentState.ear.toFixed(3)}
            </span>
          </div>
          
          {/* EAR Progress Bar */}
          <div className="relative">
            <div className="w-full bg-car-border rounded-full h-3 overflow-hidden">
              <motion.div
                className={`h-3 rounded-full ${config.barColor}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(agentState.ear * 200, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1 font-mono">
              <span>0.00</span>
              <span>0.25</span>
              <span>0.50</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Info */}
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-500 font-mono">
          LAST UPDATE: {typeof window !== 'undefined' ? new Date(agentState.timestamp).toLocaleTimeString() : 'Loading...'}
        </span>
        <span className={`font-tech ${isConnected ? 'text-neon-green' : 'text-neon-red'}`}>
          {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
        </span>
      </div>
    </div>
  );
}