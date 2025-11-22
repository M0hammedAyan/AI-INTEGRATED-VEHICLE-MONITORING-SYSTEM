'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAgentStore } from '@/store/agentStore';
import { User, Bot } from 'lucide-react';

export default function ConversationStrip() {
  const { messages } = useAgentStore();
  
  const recentMessages = messages.slice(-3);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full"
    >
      <div className="h-full bg-black/40 backdrop-blur-[15px] border border-white/20 rounded-2xl p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white/80 font-mono text-sm tracking-wider">CONVERSATION</h3>
          <div className="w-2 h-2 rounded-full bg-[#10FF88] animate-pulse" />
        </div>
        
        <div className="space-y-2 h-[calc(100%-2rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <AnimatePresence mode="popLayout">
            {recentMessages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-full"
              >
                <span className="text-white/40 font-mono text-sm">No recent messages</span>
              </motion.div>
            ) : (
              recentMessages.map((message, index) => (
                <motion.div
                  key={`${message.timestamp}-${index}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex items-start gap-2 p-2 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-white/20' 
                      : message.sender === 'HADI'
                      ? 'bg-[#00A3FF]/20 border border-[#00A3FF]/40'
                      : 'bg-[#FF7A3D]/20 border border-[#FF7A3D]/40'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-3 h-3 text-white/80" />
                    ) : (
                      <Bot className={`w-3 h-3 ${
                        message.sender === 'HADI' ? 'text-[#00A3FF]' : 'text-[#FF7A3D]'
                      }`} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-mono font-bold ${
                        message.sender === 'user'
                          ? 'text-white/80'
                          : message.sender === 'HADI'
                          ? 'text-[#00A3FF]'
                          : 'text-[#FF7A3D]'
                      }`}>
                        {message.sender === 'user' ? 'DRIVER' : message.sender}
                      </span>
                      <span className="text-white/40 text-xs font-mono">
                        {new Date(message.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <p className="text-white/90 text-sm font-mono leading-tight truncate">
                      {message.content}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}