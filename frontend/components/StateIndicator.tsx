'use client';

import { useAgentStore } from '@/store/agentStore';
import { motion } from 'framer-motion';
import { Eye, AlertTriangle, AlertCircle } from 'lucide-react';

export default function StateIndicator() {
  const { agentState, isConnected } = useAgentStore();

  const getStateConfig = () => {
    switch (agentState.state) {
      case 'awake':
        return {
          color: 'text-green-400',
          bgColor: 'bg-green-400/20',
          borderColor: 'border-green-400',
          icon: Eye,
          label: 'AWAKE',
          description: 'Driver alert and focused'
        };
      case 'warning':
        return {
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-400/20',
          borderColor: 'border-yellow-400',
          icon: AlertTriangle,
          label: 'WARNING',
          description: 'Reduced alertness detected'
        };
      case 'drowsy':
        return {
          color: 'text-red-400',
          bgColor: 'bg-red-400/20',
          borderColor: 'border-red-400',
          icon: AlertCircle,
          label: 'DROWSY',
          description: 'Immediate attention required'
        };
      default:
        return {
          color: 'text-gray-400',
          bgColor: 'bg-gray-400/20',
          borderColor: 'border-gray-400',
          icon: Eye,
          label: 'UNKNOWN',
          description: 'Status unavailable'
        };
    }
  };

  const config = getStateConfig();
  const Icon = config.icon;

  return (
    <div className="bg-car-dark rounded-lg p-6 border-2 border-car-gray">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Driver State</h3>
        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
      </div>

      <motion.div
        className={`${config.bgColor} ${config.borderColor} border-2 rounded-lg p-4 transition-all duration-300`}
        animate={{
          scale: agentState.state === 'drowsy' ? [1, 1.02, 1] : 1,
        }}
        transition={{
          duration: 0.5,
          repeat: agentState.state === 'drowsy' ? Infinity : 0,
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <Icon className={`w-6 h-6 ${config.color}`} />
          <span className={`text-xl font-bold ${config.color}`}>
            {config.label}
          </span>
        </div>
        
        <p className="text-gray-300 text-sm mb-4">{config.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">EAR Value</span>
            <span className="text-white font-mono">
              {agentState.ear.toFixed(3)}
            </span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${
                agentState.ear > 0.25 ? 'bg-green-400' :
                agentState.ear > 0.20 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(agentState.ear * 200, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>0.00</span>
            <span>0.50</span>
          </div>
        </div>
      </motion.div>

      <div className="mt-4 text-xs text-gray-500">
        Last updated: {typeof window !== 'undefined' ? new Date(agentState.timestamp).toLocaleTimeString() : 'Loading...'}
      </div>
    </div>
  );
}